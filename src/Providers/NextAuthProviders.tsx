"use client"
import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react";

interface NextAuthProviderProps {
    children: ReactNode;
}

const NextAuthProviders = ({ children }: NextAuthProviderProps) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
};

export default NextAuthProviders;