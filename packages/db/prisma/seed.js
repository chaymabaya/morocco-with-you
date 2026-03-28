const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding...')

  const providers = [
    { name: 'Riad Marrakech', slug: 'riad-marrakech', type: 'Hebergement', prices: [450, 650, 280] },
    { name: 'Atlas Adventures', slug: 'atlas-adventures', type: 'Activite', prices: [120, 350, 85] },
    { name: 'Dar Zitoun', slug: 'dar-zitoun', type: 'Restaurant', prices: [200, 150, 320] },
  ]

  for (const p of providers) {
    const user = await prisma.user.upsert({
      where: { email: p.slug + '@mwy.com' },
      update: {},
      create: {
        email: p.slug + '@mwy.com',
        password: await bcrypt.hash('Provider123!', 12),
        name: p.name,
        role: 'PROVIDER',
      },
    })

    const provider = await prisma.provider.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        companyName: p.name,
        slug: p.slug,
        commissionRate: 10,
        status: 'active',
      },
    })

    const services = [
      { title: p.name + ' - Experience Premium', price: p.prices[0] },
      { title: p.name + ' - Formule Decouverte', price: p.prices[1] },
      { title: p.name + ' - Offre Essentielle', price: p.prices[2] },
    ]

    for (const s of services) {
      await prisma.service.create({
        data: {
          providerId: provider.id,
          title: s.title,
          type: p.type,
          price: s.price,
          currency: 'MAD',
          isActive: true,
        },
      })
    }

    console.log('Provider cree : ' + p.name)
  }

  console.log('Seed termine — 3 prestataires + 9 services crees !')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())