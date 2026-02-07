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
                // Email/Password Logic
                if (credentials?.username === "user@example.com" && credentials?.password === "password") {
                    return { id: "1", name: "Demo User", email: "user@example.com" };
                }

                // OTP Logic 
                // Any mobile number is accepted, OTP must be 123456
                if (credentials?.mobile && credentials?.otp === "123456") {
                    return { id: "2", name: "Mobile User", email: "mobile-user@brands.com", image: null };
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
        async signIn({ user, account, profile }) {
            if (account?.provider === "google") {
                try {
                    await connectDB();
                    // Check if user exists
                    const existingUser = await User.findOne({ email: user.email });
                    if (!existingUser) {
                        await User.create({
                            name: user.name || "Unknown",
                            email: user.email!, // Email is required by Google
                            image: user.image || "",
                            role: "user"
                        });
                    }
                } catch (error) {
                    // Log error but allow sign-in to proceed
                    // This prevents OAuthCallback errors when database is unavailable
                    console.error("Error saving user to DB (non-blocking):", error);
                }
                // Always return true for Google sign-in
                return true;
            }
            return true; // Allow other providers (Credentials) to pass
        },
        async session({ session, token }) {
            // You can add user ID from DB here if needed
            return session;
        }
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
