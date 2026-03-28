import { Controller, Post, Get, Patch, Body, Param,
  UseGuards, Request, Headers, RawBodyRequest,
  Req } from '@nestjs/common'
import { BookingsService } from './bookings.service'
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard'

@Controller('api/v1/bookings')
export class BookingsController {
  constructor(private bookings: BookingsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() body: any, @Request() req: any) {
    return this.bookings.create(req.user.id, body)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@Request() req: any) {
    return this.bookings.findAllByUser(req.user.id)
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string, @Request() req: any) {
    return this.bookings.findOne(id, req.user.id)
  }

  @Patch(':id/cancel')
  @UseGuards(JwtAuthGuard)
  cancel(@Param('id') id: string, @Request() req: any) {
    return this.bookings.cancel(id, req.user.id)
  }

  @Post('webhook')
  webhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers('stripe-signature') sig: string,
  ) {
    return this.bookings.handleWebhook(req.rawBody as Buffer, sig)
  }
}