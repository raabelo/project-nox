import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET(_: Request, { params }: { params: { id: string } }) {
    try {
        const user = await prisma.user.findUnique({ where: { id: params.id } });
        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
        return NextResponse.json(user);
    } catch (err) {
        console.error("GET /users/:id error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const body = await req.json();
        const data: any = { ...body };

        if (body.password) {
            data.password = await bcrypt.hash(body.password, 10);
        }

        const user = await prisma.user.update({
            where: { id: params.id },
            data,
        });

        return NextResponse.json(user);
    } catch (err) {
        console.error("PUT /users/:id error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    try {
        await prisma.user.delete({ where: { id: params.id } });
        return NextResponse.json({ message: "User deleted" });
    } catch (err) {
        console.error("DELETE /users/:id error:", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
