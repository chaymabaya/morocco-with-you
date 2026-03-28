import { defineConfig } from 'prisma/config'

export default defineConfig({
  earlyAccess: true,
  schema: './prisma/schema.prisma',
  seed: {
    run: 'ts-node prisma/seed.ts',
  },
})
