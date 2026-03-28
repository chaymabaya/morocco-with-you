import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcryptjs'
import { PrismaService } from '../prisma/prisma.service'

type ServiceFilters = {
  page?: number
  limit?: number
  search?: string
  type?: string
}

type ProviderPayload = {
  name: string
  email: string
  phone?: string
  serviceType?: string
  commissionRate?: number
  status?: string
}

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getOverview() {
    const [services, bookings, commissions, recentBookings] = await Promise.all([
      this.prisma.service.count(),
      this.prisma.booking.count(),
      this.prisma.commission.aggregate({ _sum: { amount: true } }),
      this.prisma.booking.findMany({
        take: 5,
        orderBy: { bookedAt: 'desc' },
        include: {
          user: { select: { id: true, name: true, email: true } },
          service: {
            select: {
              id: true,
              title: true,
              provider: { select: { companyName: true } },
            },
          },
        },
      }),
    ])

    return {
      metrics: {
        services,
        bookings,
        commissionsAmount: commissions._sum.amount || 0,
      },
      recentBookings,
    }
  }

  async listServices(filters: ServiceFilters) {
    const page = filters.page || 1
    const limit = filters.limit || 20
    const skip = (page - 1) * limit

    const where: any = {}
    if (filters.type) {
      where.type = filters.type
    }
    if (filters.search) {
      where.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { type: { contains: filters.search, mode: 'insensitive' } },
        {
          provider: {
            companyName: { contains: filters.search, mode: 'insensitive' },
          },
        },
      ]
    }

    const [data, total] = await Promise.all([
      this.prisma.service.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          provider: {
            select: { id: true, companyName: true, slug: true },
          },
        },
      }),
      this.prisma.service.count({ where }),
    ])

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    }
  }

  async createService(payload: {
    providerId: string
    title: string
    type: string
    price: number
    currency?: string
    metadata?: any
    isActive?: boolean
  }) {
    return this.prisma.service.create({
      data: {
        providerId: payload.providerId,
        title: payload.title,
        type: payload.type,
        price: payload.price,
        currency: payload.currency || 'MAD',
        metadata: payload.metadata,
        isActive: payload.isActive ?? true,
      },
    })
  }

  async updateService(
    id: string,
    payload: {
      title?: string
      type?: string
      price?: number
      currency?: string
      metadata?: any
      isActive?: boolean
    },
  ) {
    return this.prisma.service.update({
      where: { id },
      data: payload,
    })
  }

  async disableService(id: string) {
    return this.prisma.service.update({
      where: { id },
      data: { isActive: false },
    })
  }

  async listBookings() {
    return this.prisma.booking.findMany({
      orderBy: { bookedAt: 'desc' },
      include: {
        user: { select: { id: true, name: true, email: true } },
        service: {
          include: {
            provider: { select: { id: true, companyName: true } },
          },
        },
      },
    })
  }

  async updateBookingStatus(id: string, status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'REFUNDED') {
    return this.prisma.booking.update({
      where: { id },
      data: { status },
    })
  }

  async listCommissions() {
    const [rows, totals] = await Promise.all([
      this.prisma.commission.findMany({
        orderBy: [{ period: 'desc' }, { amount: 'desc' }],
        include: {
          provider: { select: { companyName: true, slug: true } },
          booking: {
            select: {
              id: true,
              amountPaid: true,
              status: true,
              service: { select: { title: true } },
            },
          },
        },
      }),
      this.prisma.commission.aggregate({ _sum: { amount: true } }),
    ])

    return {
      data: rows,
      summary: {
        totalAmount: totals._sum.amount || 0,
      },
    }
  }

  async listProviders() {
    const providers = await this.prisma.provider.findMany({
      orderBy: { companyName: 'asc' },
      include: {
        user: { select: { email: true, phone: true, name: true } },
      },
    })

    return providers
  }

  async createProvider(payload: ProviderPayload) {
    const existing = await this.prisma.user.findUnique({ where: { email: payload.email } })
    if (existing) {
      throw new Error('Un utilisateur existe deja avec cet email')
    }

    const randomPassword = Math.random().toString(36).slice(-10)

    const hashed = await bcrypt.hash(randomPassword, 12)

    const user = await this.prisma.user.create({
      data: {
        email: payload.email,
        password: hashed,
        role: 'PROVIDER',
        name: payload.name,
        phone: payload.phone,
      },
    })

    const baseSlug = payload.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
    const slug = `${baseSlug || 'provider'}-${user.id.slice(0, 6)}`

    const provider = await this.prisma.provider.create({
      data: {
        userId: user.id,
        companyName: payload.name,
        slug,
        commissionRate: payload.commissionRate ?? 10,
        status: payload.status ?? 'active',
        serviceType: payload.serviceType ?? null,
      } as any,
    })

    return { provider, tempPassword: randomPassword }
  }

  async updateProvider(id: string, payload: Partial<ProviderPayload>) {
    const provider = await this.prisma.provider.findUnique({ where: { id }, include: { user: true } })
    if (!provider) {
      throw new Error('Prestataire introuvable')
    }

    if (payload.email && payload.email !== provider.user.email) {
      await this.prisma.user.update({ where: { id: provider.userId }, data: { email: payload.email } })
    }

    if (payload.phone !== undefined || payload.name) {
      await this.prisma.user.update({
        where: { id: provider.userId },
        data: {
          phone: payload.phone ?? provider.user.phone,
          name: payload.name ?? provider.user.name,
        },
      })
    }

    const updated = await this.prisma.provider.update({
      where: { id },
      data: {
        companyName: payload.name ?? provider.companyName,
        commissionRate: payload.commissionRate ?? provider.commissionRate,
        status: payload.status ?? provider.status,
        serviceType: payload.serviceType ?? (provider as any).serviceType ?? null,
      } as any,
      include: { user: { select: { email: true, phone: true, name: true } } },
    })

    return updated
  }

  async deleteProvider(id: string) {
    const provider = await this.prisma.provider.findUnique({ where: { id } })
    if (!provider) return

    await this.prisma.provider.delete({ where: { id } })
    await this.prisma.user.delete({ where: { id: provider.userId } })

    return { success: true }
  }
}
