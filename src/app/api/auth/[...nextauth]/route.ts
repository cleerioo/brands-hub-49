import NextAuth, { DefaultSession, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/lib/db";
import User from "@/models/User";



declare module "next-auth" {
    interface Session {
        user: {
            role?: string;
        } & DefaultSession["user"];
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID || "",
            clientSecret: process.env.GOOGLE_SECRET || "",
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" },
                mobile: { label: "Mobile", type: "text" },
                otp: { label: "OTP", type: "text" }
            },
            async authorize(credentials, req) {
                // Admin Credentials
                if (credentials?.username === "admin@brandshub.com" && credentials?.password === "admin123") {
                    return { id: "0", name: "Admin User", email: "admin@brandshub.com", role: "admin" };
                }

                // Email/Password Logic
                if (credentials?.username === "user@example.com" && credentials?.password === "password") {
                    return { id: "1", name: "Demo User", email: "user@example.com", role: "user" };
                }

                return null;
            }
        })
    ],
    pages: {
        signIn: "/auth/signin",
    },
    secret: process.env.NEXTAUTH_SECRET || "secret",
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }: any) {
            if (session?.user) {
                session.user.role = token.role;
            }
            return session;
        }
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
