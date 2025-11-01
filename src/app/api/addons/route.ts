
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const addons = await prisma.addon.findMany();
    return NextResponse.json(addons);
}

export async function POST(req: Request) {
    const data = await req.json();
    const addon = await prisma.addon.create({ data });
    return NextResponse.json(addon);
}
