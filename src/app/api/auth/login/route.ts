import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

const JWT_DURATION = "7d"; // 7 dias

export async function POST(req: Request) {
    try {
        const { email, nickname, password } = await req.json();

        if ((!email && !nickname) || !password) {
            return NextResponse.json(
                { error: "Email or nickname and password are required" },
                { status: 400 }
            );
        }

        const user = await prisma.user.findFirst({
            where: { OR: [{ email }, { nickname }] },
        });

        if (!user) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
            expiresIn: JWT_DURATION,
        });

        return NextResponse.json({
            token,
            user: {
                id: user.id,
                nickname: user.nickname,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
