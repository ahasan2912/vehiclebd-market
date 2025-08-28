"use client"
import React, {useState } from 'react';
import SocialLogin from './components/SocialLogin';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface LogInFormData {
    email: string;
    password: string;
}

const LogInPage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState<LogInFormData>({
        email: '',
        password: '',
    });

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await signIn("credentials", {
                email: formData?.email,
                password: formData?.password,
                callbackUrl: "/",
                redirect: false,
            });
            if (response?.ok) {
                router.push("/");
                toast.success("Login successfully!");
            } else {
                toast.error("Authentication Faild");
            }
        } catch (err) {
            console.log(err);
            toast.error("Authentication Faild");
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-200">
                <h2 className="text-gray-800 text-4xl font-bold text-center mb-8">Login Form</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className='space-y-5'>
                        <label className='ml-1' htmlFor="">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#FF3811]"
                            required
                        />
                    </div>
                    <div className='space-y-5'>
                        <label className='ml-1' htmlFor="">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#FF3811]"
                            required
                        />
                    </div>
                    <SocialLogin />
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-full bg-[#FF3811] text-white font-bold py-3 px-6 rounded-md shadow-lg transform transition duration-300 ease-in-out hover:scale-101 focus:outline-none focus:ring-4"
                        >
                            Login
                        </button>
                    </div>
                    <div className="text-center">
                        Don&apos;t Have an account?{" "}
                        <Link href="/register" className="text-[#FF3811] font-bold">
                            Register
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LogInPage;