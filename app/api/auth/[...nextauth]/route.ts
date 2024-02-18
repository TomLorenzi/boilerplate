import NextAuth from "next-auth"
import EmailProvider from 'next-auth/providers/email'
import { PrismaClient } from "@prisma/client"
import { PrismaAdapter } from "@next-auth/prisma-adapter"

const prisma = new PrismaClient()

const handler = NextAuth({
    providers: [
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM,
            maxAge: 24 * 60 * 60, // 24h
        }),

    ],
    adapter: PrismaAdapter(prisma),
})


export { handler as GET, handler as POST }