import NextAuth, { type NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    providers: [
        GitHub({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
        }),
        Google({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                identifier: { label: "Email or Nickname", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const { identifier, password } = credentials!;

                const user = await prisma.user.findFirst({
                    where: {
                        OR: [{ email: identifier }, { nickname: identifier }],
                    },
                });

                if (!user) throw new Error("User not found");

                const isValid = await compare(password, user.password);
                if (!isValid) throw new Error("Invalid password");

                return user;
            },
        }),
    ],
    callbacks: {
        async jwt({ token }) {
            const dbUser = await prisma.user.findUnique({ where: { email: token.email! } });
            if (!dbUser) return {};

            token.id = dbUser.id;
            token.nickname = dbUser.nickname;
            return token;
        },
    },
    pages: {
        signIn: "/auth",
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
