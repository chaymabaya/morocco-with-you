import { Injectable, OnModuleInit } from '@nestjs/common'
import * as Prisma from '@prisma/client'

// Support both default and named exports from @prisma/client.
// Some bundlers/types currently do not expose PrismaClient as a named export
// in type definitions, which breaks `import { PrismaClient }`. Using the
// namespace import keeps runtime behavior while relaxing type requirements.
const PrismaClient =
  (Prisma as any).PrismaClient ?? (Prisma as any).default ?? Prisma

@Injectable()
export class PrismaService
  extends (PrismaClient as { new (): any })
  implements OnModuleInit
{
  // Allow dynamic model properties like `this.service`, `this.booking`, etc.
  [key: string]: any

  async onModuleInit() {
    await this.$connect()
  }
}