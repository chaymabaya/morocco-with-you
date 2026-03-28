import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding...')

  // Admin user
  const adminEmail = 'baya.chaymae123@gmail.com'
  const adminPassword = 'Btsse@2020'

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      password: await bcrypt.hash(adminPassword, 12),
      role: 'ADMIN',
      name: 'Admin Morocco With You',
    },
    create: {
      email: adminEmail,
      password: await bcrypt.hash(adminPassword, 12),
      name: 'Admin Morocco With You',
      role: 'ADMIN',
    },
  })

  const providers = [
    { name: 'Riad Marrakech', slug: 'riad-marrakech', type: 'Hébergement', prices: [450, 650, 280] },
    { name: 'Atlas Adventures', slug: 'atlas-adventures', type: 'Activité', prices: [120, 350, 85] },
    { name: 'Dar Zitoun', slug: 'dar-zitoun', type: 'Restaurant', prices: [200, 150, 320] },
  ]

  for (const p of providers) {
    const user = await prisma.user.upsert({
      where: { email: `${p.slug}@mwy.com` },
      update: {},
      create: {
        email: `${p.slug}@mwy.com`,
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

    let services: any[] = []
    
    if (p.type === 'Hébergement') {
      services = [
        {
          title: `${p.name} — Expérience Premium`,
          price: p.prices[0],
          metadata: {
            images: ['/images/hebergements/Riad Marrakech.png', '/images/hebergements/Riad Marrakech2.png'],
            bedrooms: 3,
            bathrooms: 2,
            amenities: ['WiFi gratuit', 'Balcon', 'Climatisation', 'TV Smart', 'Mini-bar', 'Piscine'],
            capacity: '6 personnes',
            description: 'Riad luxueux avec piscine privée en plein cœur de la médina',
          }
        },
        {
          title: `${p.name} — Formule Découverte`,
          price: p.prices[1],
          metadata: {
            images: ['/images/hebergements/Riad Marrakech.png', '/images/hebergements/Riad Marrakech2.png'],
            bedrooms: 2,
            bathrooms: 1,
            amenities: ['WiFi gratuit', 'Balcon', 'Climatisation', 'Petit-déjeuner inclus'],
            capacity: '4 personnes',
            description: 'Chambre confortable avec vue sur la médina',
          }
        },
        {
          title: `${p.name} — Offre Essentielle`,
          price: p.prices[2],
          metadata: {
            images: ['/images/hebergements/Riad Marrakech.png', '/images/hebergements/Riad Marrakech2.png'],
            bedrooms: 1,
            bathrooms: 1,
            amenities: ['WiFi gratuit', 'Climatisation', 'Douche', 'Accès au patio'],
            capacity: '2 personnes',
            description: 'Studio cosy idéal pour un séjour court',
          }
        },
      ]
    } else if (p.type === 'Restaurant') {
      services = [
        {
          title: `${p.name} — Menu Déluxe`,
          price: p.prices[0],
          metadata: {
            images: ['/images/restaurants/Dar Zitoun — Menu Découverte.png'],
            menu: [
              { name: 'Tagine d\'agneau', price: 95, description: 'Traditionnel avec pruneaux et amandes' },
              { name: 'Couscous royal', price: 120, description: '7 légumes, viandes variées' },
              { name: 'Pastilla au poulet', price: 85, description: 'Crispy phyllo et cannelle' },
              { name: 'Tajine de poisson', price: 110, description: 'Poisson frais avec preserved lemons' },
            ],
            cuisine: 'Marocaine',
            capacity: '50 personnes',
            averageRating: 4.8,
          }
        },
        {
          title: `${p.name} — Menu Gastronomique`,
          price: p.prices[1],
          metadata: {
            images: ['/images/restaurants/Dar Zitoun — Menu Découverte.png'],
            menu: [
              { name: 'Harira', price: 35, description: 'Soupe traditionnelle avec pois chiches' },
              { name: 'Brochettes de kefta', price: 65, description: 'Viande épicée grillée' },
              { name: 'Salades variées', price: 45, description: 'Betteraves, carottes, tomates' },
            ],
            cuisine: 'Marocaine Fusion',
            capacity: '30 personnes',
            averageRating: 4.6,
          }
        },
        {
          title: `${p.name} — Menu Découverte`,
          price: p.prices[2],
          metadata: {
            images: ['/images/restaurants/Dar Zitoun — Menu Découverte.png'],
            menu: [
              { name: 'Mezze traditionnel', price: 50, description: 'Assortiment de petits plats' },
              { name: 'Briwats', price: 40, description: 'Pâtes feuillées fourrées à la viande' },
              { name: 'Thé à la menthe', price: 15, description: 'Thé marocain traditionnel' },
            ],
            cuisine: 'Marocaine',
            capacity: '20 personnes',
            averageRating: 4.5,
          }
        },
      ]
    } else {
      services = [
        { title: `${p.name} — Expérience Premium`, price: p.prices[0] },
        { title: `${p.name} — Formule Découverte`, price: p.prices[1] },
        { title: `${p.name} — Offre Essentielle`, price: p.prices[2] },
      ]
    }

    for (const s of services) {
      await prisma.service.create({
        data: {
          providerId: provider.id,
          title: s.title,
          type: p.type,
          price: s.price,
          currency: 'MAD',
          metadata: s.metadata || {},
          isActive: true,
        },
      })
    }
  }

  console.log('Seed terminé — 3 prestataires + 9 services créés !')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())