"use client";
import { FaGithub } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

// type ProviderName = 'google' | 'github';
const SocialLogin = () => {
    const router = useRouter();
    const session = useSession();

    const handleSocialLogin = async (providerName: string) => {
        signIn(providerName);
    };

    useEffect(() => {
        if (session?.status == "authenticated") {
            router.push("/");
            toast.success("Successfully Logged In");
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session?.status]);

    return (
        <div className="flex justify-center gap-8 py-1">
            <p
                onClick={() => handleSocialLogin("google")}
                className="bg-slate-200 rounded-full p-3"
            >
                <FaGoogle type="button" className="text-red-400" />
                
            </p>
            <p
                onClick={() => handleSocialLogin("github")}
                className="bg-slate-200 rounded-full p-3"
            >
                <FaGithub type="button" className="text-red-400" />
            </p>
        </div>
    );
};

export default SocialLogin;