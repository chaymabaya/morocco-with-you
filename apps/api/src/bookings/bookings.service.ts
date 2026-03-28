import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import Stripe from 'stripe'

@Injectable()
export class BookingsService {
  private stripe: Stripe

  constructor(private prisma: PrismaService) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2026-02-25.clover',
    })
  }

  async create(userId: string, data: { serviceId: string }) {
    const service = await this.prisma.service.findUniqueOrThrow({
      where: { id: data.serviceId },
    })

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: Math.round(service.price * 100),
      currency: 'mad',
      metadata: { userId, serviceId: data.serviceId },
    })

    const booking = await this.prisma.booking.create({
      data: {
        userId,
        serviceId: data.serviceId,
        amountPaid: service.price,
        currency: 'MAD',
        stripeIntentId: paymentIntent.id,
        status: 'PENDING',
      },
      include: { service: true },
    })

    return {
      booking,
      clientSecret: paymentIntent.client_secret,
    }
  }

  async findAllByUser(userId: string) {
    return this.prisma.booking.findMany({
      where: { userId },
      include: { service: { include: { provider: true } } },
      orderBy: { bookedAt: 'desc' },
    })
  }

  async findOne(id: string, userId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: { service: { include: { provider: true } } },
    })
    if (!booking || booking.userId !== userId) {
      throw new NotFoundException('Booking not found')
    }
    return booking
  }

  async cancel(id: string, userId: string) {
    const booking = await this.findOne(id, userId)
    if (booking.stripeIntentId) {
      await this.stripe.paymentIntents.cancel(booking.stripeIntentId)
    }
    return this.prisma.booking.update({
      where: { id },
      data: { status: 'CANCELLED' },
    })
  }

  async handleWebhook(payload: Buffer, signature: string) {
    const event = this.stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || '',
    )

    if (event.type === 'payment_intent.succeeded') {
      const intent = event.data.object as Stripe.PaymentIntent
      await this.prisma.booking.updateMany({
        where: { stripeIntentId: intent.id },
        data: { status: 'CONFIRMED' },
      })

      const booking = await this.prisma.booking.findFirst({
        where: { stripeIntentId: intent.id },
        include: { service: { include: { provider: true } } },
      })

      if (booking) {
        const rate = booking.service.provider.commissionRate / 100
        const period = new Date().toISOString().slice(0, 7)

        await this.prisma.commission.create({
          data: {
            providerId: booking.service.providerId,
            bookingId: booking.id,
            amount: booking.amountPaid * rate,
            rate: booking.service.provider.commissionRate,
            period,
            paidStatus: 'unpaid',
          },
        })
      }
    }
    

    

    return { received: true }
  }
}