import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const gameId = url.searchParams.get("gameId");
  if (!gameId) return NextResponse.json({ error: "gameId required" }, { status: 400 });

  const messages = await prisma.dialogMessage.findMany({
    where: { gameId },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json(messages);
}

export async function POST(req: Request) {
  const { gameId, characterId, message, role } = await req.json();

  if (!gameId || !characterId || !message || !role) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const record = await prisma.dialogMessage.create({
    data: { gameId, characterId, message, role },
  });

  return NextResponse.json(record);
}
