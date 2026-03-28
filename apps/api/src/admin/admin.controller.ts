import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common'
import { AdminService } from './admin.service'
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard'
import { RolesGuard } from '../common/guards/roles.guard'
import { Roles } from '../common/decorators/roles.decorator'

@Controller('api/v1/admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class AdminController {
  constructor(private admin: AdminService) {}

  @Get('overview')
  overview() {
    return this.admin.getOverview()
  }

  @Get('services')
  services(@Query() query: any) {
    return this.admin.listServices({
      page: query.page ? parseInt(query.page, 10) : 1,
      limit: query.limit ? parseInt(query.limit, 10) : 20,
      search: query.search,
      type: query.type,
    })
  }

  @Post('services')
  createService(@Body() body: any) {
    return this.admin.createService(body)
  }

  @Put('services/:id')
  updateService(@Param('id') id: string, @Body() body: any) {
    return this.admin.updateService(id, body)
  }

  @Delete('services/:id')
  disableService(@Param('id') id: string) {
    return this.admin.disableService(id)
  }

  @Get('bookings')
  bookings() {
    return this.admin.listBookings()
  }

  @Patch('bookings/:id/status')
  updateBookingStatus(@Param('id') id: string, @Body() body: { status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'REFUNDED' }) {
    return this.admin.updateBookingStatus(id, body.status)
  }

  @Get('commissions')
  commissions() {
    return this.admin.listCommissions()
  }

  @Get('providers')
  providers() {
    return this.admin.listProviders()
  }

  @Post('providers')
  createProvider(@Body() body: any) {
    return this.admin.createProvider(body)
  }

  @Put('providers/:id')
  updateProvider(@Param('id') id: string, @Body() body: any) {
    return this.admin.updateProvider(id, body)
  }

  @Delete('providers/:id')
  deleteProvider(@Param('id') id: string) {
    return this.admin.deleteProvider(id)
  }
}
