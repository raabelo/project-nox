import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { PUBLIC_ROUTES } from "@/config/public-routes";

export default async function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;

    const isPublic = PUBLIC_ROUTES.some(
        (r) => r.path.test(pathname) && (!r.methods || r.methods.includes(req.method))
    );

    if (isPublic) return NextResponse.next();

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
        const url = req.nextUrl.clone();
        url.pathname = "/auth";
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/inn/:path*", "/api/:path*"],
};
