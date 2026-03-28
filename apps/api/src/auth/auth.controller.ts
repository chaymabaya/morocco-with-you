import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterSchema } from './dto/register.dto'
import { LoginSchema } from './dto/login.dto'

@Controller('api/v1/auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register')
  register(@Body() body: unknown) {
    const dto = RegisterSchema.parse(body)
    return this.auth.register(dto)
  }

  @Post('login')
  login(@Body() body: unknown) {
    const dto = LoginSchema.parse(body)
    return this.auth.login(dto)
  }
}
