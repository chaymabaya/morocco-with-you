import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common'
import { CatalogService } from './catalog.service'
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard'
import { Roles } from '../common/decorators/roles.decorator'
import { RolesGuard } from '../common/guards/roles.guard'

@Controller('api/v1/services')
export class CatalogController {
  constructor(private catalog: CatalogService) {}

  @Get()
  findAll(@Query() query: any) {
    return this.catalog.findAll({
      page: query.page ? parseInt(query.page) : 1,
      limit: query.limit ? parseInt(query.limit) : 12,
      type: query.type,
      search: query.search,
      minPrice: query.minPrice ? parseFloat(query.minPrice) : undefined,
      maxPrice: query.maxPrice ? parseFloat(query.maxPrice) : undefined,
    })
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catalog.findOne(id)
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PROVIDER', 'ADMIN')
  create(@Body() body: any, @Request() req: any) {
    const providerId = req.user.role === 'ADMIN' ? body.providerId : req.user.providerId
    return this.catalog.create(body, providerId)
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PROVIDER', 'ADMIN')
  update(@Param('id') id: string, @Body() body: any) {
    return this.catalog.update(id, body)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PROVIDER', 'ADMIN')
  remove(@Param('id') id: string) {
    return this.catalog.remove(id)
  }
}