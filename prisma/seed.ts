import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seed() {
    // await prisma.addon.create({
    //     data: {
    //         name: "D&D 5e Core",
    //         slug: "dnd5e",
    //         version: "1.0.0",
    //         description: "Core rules for D&D 5e",
    //         enabled: true,
    //     },
    // });
}

seed()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
        process.exit(1);
    });
