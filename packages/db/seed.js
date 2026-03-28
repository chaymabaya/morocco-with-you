"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('Seeding...');
    const providers = [
        { name: 'Riad Marrakech', slug: 'riad-marrakech', type: 'Hébergement', prices: [450, 650, 280] },
        { name: 'Atlas Adventures', slug: 'atlas-adventures', type: 'Activité', prices: [120, 350, 85] },
        { name: 'Dar Zitoun', slug: 'dar-zitoun', type: 'Restaurant', prices: [200, 150, 320] },
    ];
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
        });
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
        });
        const services = [
            { title: `${p.name} — Expérience Premium`, price: p.prices[0] },
            { title: `${p.name} — Formule Découverte`, price: p.prices[1] },
            { title: `${p.name} — Offre Essentielle`, price: p.prices[2] },
        ];
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
            });
        }
    }
    console.log('Seed terminé — 3 prestataires + 9 services créés !');
}
main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
