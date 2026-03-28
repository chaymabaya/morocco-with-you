import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class CatalogService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: {
    page?: number
    limit?: number
    type?: string
    search?: string
    minPrice?: number
    maxPrice?: number
  }) {
    const page = query.page || 1
    const limit = query.limit || 12
    const skip = (page - 1) * limit

    const where: any = { isActive: true }
    if (query.type) where.type = query.type
    if (query.minPrice || query.maxPrice) {
      where.price = {}
      if (query.minPrice) where.price.gte = query.minPrice
      if (query.maxPrice) where.price.lte = query.maxPrice
    }
    if (query.search) {
      where.OR = [
        { title: { contains: query.search, mode: 'insensitive' } },
        { type: { contains: query.search, mode: 'insensitive' } },
      ]
    }

    const [data, total] = await Promise.all([
      this.prisma.service.findMany({
        where,
        skip,
        take: limit,
        include: { provider: { select: { companyName: true, slug: true } } },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.service.count({ where }),
    ])

    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    }
  }

  async findOne(id: string) {
    return this.prisma.service.findUniqueOrThrow({
      where: { id },
      include: { provider: true },
    })
  }

  async create(data: any, providerId: string) {
    return this.prisma.service.create({
      data: { ...data, providerId },
    })
  }

  async update(id: string, data: any) {
    return this.prisma.service.update({ where: { id }, data })
  }

  async remove(id: string) {
    return this.prisma.service.update({
      where: { id },
      data: { isActive: false },
    })
  }
}