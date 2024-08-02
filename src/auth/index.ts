import { PrismaClient, Role } from "@prisma/client";
import NextAuth, { User, NextAuthConfig, Session, CredentialsSignin } from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
export const BASE_PATH = "/api/auth"
// import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

type Credentials = {
    email: string;
    password: string;
};
class CustomError extends CredentialsSignin {
    constructor(message: string) {
        super(message);
        this.code = message
    }
}
const authOptions: NextAuthConfig = {
    session: {
        strategy: 'jwt'
    },
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: {},
                pass: {},
            },
            async authorize(credentials, req): Promise<User | null> {
                if (!credentials || !credentials.email || !credentials.pass) {
                    return null;
                }
                const dbUser = await prisma.admin.findFirst({
                    where: {
                        username: credentials.email,
                        password:credentials.pass
                    }
                })
                if (!dbUser) {
                    throw new CustomError("Invalid Email or password")
                }

                return { id: dbUser.id, email: dbUser.username }

            },
        })
    ],
    callbacks: {
        async session({ session, token }: { session: Session, token: JWT }) {
            // console.log("SESS TOKEN", token)
            if (token) {
                session.user.id = token.id
                session.user.email = token.email
            }
            return session
        },
        async jwt({ token, user }: { token: JWT, user: User }) {
            // console.log("USR ", user)
            if (user) {
                token.id = user.id
                token.email = user.email
            }
            return token;
        },

    },
    secret: process.env.NEXTAUTH_SECRET
}
export const { handlers, signIn, signOut, auth } = NextAuth(authOptions)