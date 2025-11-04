import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const users = await prisma.user.findMany({
            include: { characters: true },
        });

        const totalCount = users.reduce((acc, user) => {
            const hasCharacters = user.characters.length > 0;
            return acc + (hasCharacters ? user.characters.length : 1);
        }, 0);

        return NextResponse.json({ count: totalCount });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao contar usuários" }, { status: 500 });
    }
}
