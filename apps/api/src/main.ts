import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  })

  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
  })

  const port = parseInt(process.env.PORT || '3002', 10)
  await app.listen(port)
  console.log(`API running on http://localhost:${port}`)
}

bootstrap()