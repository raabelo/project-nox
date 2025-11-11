import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get("email");

        if (email) {
            const user = await prisma.user.findUnique({ where: { email } });
            if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
            return NextResponse.json(user);
        }

        const users = await prisma.user.findMany();
        return NextResponse.json(users);
    } catch (err) {
        console.error("GET /users error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { nickname, email, password } = await req.json();

        if (!nickname || !email || !password) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            return NextResponse.json({ error: "User already exists" }, { status: 409 });
        }

        const hashed = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { nickname, email, password: hashed },
        });

        return NextResponse.json(user);
    } catch (err) {
        console.error("POST /users error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
