import { loginUser } from "@/app/actions/auth/loginUser";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import type { Account, User } from "next-auth";
import { collectionNameObj, dbConnect } from "./dbConnect";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "jhon123@gmail.com" },
                password: { label: "Password", type: "password" }
            },
            // authorize
            async authorize(credentials, req): Promise<User | null> {
                if (!credentials) return null;
                const userData = await loginUser({
                    email: credentials.email,
                    password: credentials.password,
                });

                if (userData) {
                    return userData as unknown as User;
                } else {
                    return null;
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!
        })
    ],
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async signIn({ user, account }: {
            user: User;
            account: Account | null;
        }): Promise<boolean> {
            if (account) {
                const { providerAccountId, provider } = account;
                const { email: user_email, image, name } = user;
                const userCollection = dbConnect(collectionNameObj.userCollection);
                const isExist = await userCollection.findOne({ email: user?.email });
                if (!isExist) {
                    const payload = { providerAccountId, provider, email: user_email, image, name }
                    await userCollection.insertOne({ ...payload, role: 'user' });
                }
            }
            return true;
        }
    }
}