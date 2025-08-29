"use client";
import { Menu, X } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export interface UserData {
    _id: string;
    name: string;
    email: string;
    image: string;
    role: "admin" | "user";
}

const Header = ({ userInfo }: { userInfo: UserData }) => {
    const { data: session } = useSession();
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };
    // Helper function to check active link
    const isActive = (href: string) => pathname === href;

    if (!pathname.includes('dashboard')) {
        return (
            <nav className="flex justify-between items-center py-3 px-4 bg-white fixed w-full z-50 shadow-md">
                <div className="flex items-center gap-2">
                    <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                        <Image
                            src={'/assets/logo.svg'}
                            alt="Car Doctor"
                            width={130}
                            height={80} />
                    </Link>
                </div>

                {/* Nav Links - Desktop */}
                <div className="hidden md:flex gap-6 font-medium">
                    <Link href="/" className={isActive('/') ? 'text-red-500' : 'text-gray-700'}>Home</Link>
                    <Link href="/product" className={isActive('/product') ? 'text-red-500' : 'text-gray-700'}>Product</Link>

                    {
                        userInfo?.role === 'user' ? <Link href="/user-dashboard/userhome" className={isActive('/user-dashboard/userhome') ? 'text-red-500' : 'text-gray-700'}>Dashboard</Link> : ''
                    }
                    {
                        userInfo?.role === 'admin' ? <Link href="/admin-dashboard/admin-home" className={isActive('/admin-dashboard/admin-home') ? 'text-red-500' : 'text-gray-700'}>Dashboard</Link> : ''
                    }
                    <Link href="/blogs" className={isActive('/blogs') ? 'text-red-500' : 'text-gray-700'}>Blog</Link>
                    <Link href="/about" className={isActive('/about') ? 'text-red-500' : 'text-gray-700'}>About</Link>
                    <Link href="/contact" className={isActive('/contact') ? 'text-red-500' : 'text-gray-700'}>Contact</Link>
                </div>
                {/* Icons + Appointment Button - Desktop */}
                <div className="hidden md:flex items-center gap-4">
                    {
                        session?.user ? <div className='flex gap-2'>
                            <Image
                                src={userInfo?.image || "/default.png"}
                                alt="User profile"
                                width={40}
                                height={40}
                                className="w-12 h-12 rounded-full object-fill border-2 border-red-400"
                                unoptimized
                                referrerPolicy='no-referrer'
                            />
                            <button onClick={() => signOut()} className={`border px-4 py-2 rounded transition font-semibold sm:text-lg border-red-500 text-red-600 hover:bg-red-50`}>SignOut</button>
                        </div> : <div className='space-x-2'>
                            <Link href='/login' className={`border px-4 py-2 rounded transition font-semibold sm:text-lg border-red-500 text-red-600 hover:bg-red-50`}>LogIn</Link>
                            <Link href='/register' className={`border px-4 py-2 rounded transition font-semibold sm:text-lg border-red-500 text-red-600 hover:bg-red-50`}>Register</Link>
                        </div>
                    }
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden flex items-center gap-4">
                    {
                        session?.user ? <div>
                            <Image
                                src={session?.user?.image || "/default.png"}
                                alt="User profile"
                                width={40}
                                height={40}
                                className="w-10 h-10 rounded-full object-fill border-2 border-red-400"
                                unoptimized
                                referrerPolicy='no-referrer'
                            />
                        </div> : <Link href='/login' className={`border px-4 py-1.5 rounded transition font-semibold sm:text-lg border-red-500 text-red-600 hover:bg-red-50 text-center`}>LogIn</Link>
                    }

                    <button onClick={toggleMobileMenu} className="focus:outline-none">
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 md:hidden
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
                >
                    <div className="flex justify-end p-4">
                        <button onClick={toggleMobileMenu} className="focus:outline-none">
                            <X className="w-6 h-6 text-gray-700" />
                        </button>
                    </div>
                    <div className="flex flex-col gap-4 p-4 font-medium">
                        <Link href="/" className={`py-2 rounded hover:bg-gray-100 ${isActive('/') ? 'text-red-500' : 'text-gray-700'}`} onClick={toggleMobileMenu}>Home</Link>

                        <Link href="/about" className={`py-2 rounded hover:bg-gray-100 ${isActive('/about') ? 'text-red-500' : 'text-gray-700'}`} onClick={toggleMobileMenu}>About</Link>
                        <Link href="/product" className={`py-2 rounded hover:bg-gray-100 ${isActive('/product') ? 'text-red-500' : 'text-gray-700'}`} onClick={toggleMobileMenu}>Product</Link>
                        {
                            userInfo?.role === 'user' ? <Link href="/user-dashboard/userhome" className={isActive('/user-dashboard/userhome') ? 'text-red-500' : 'text-gray-700'}>Dashboard</Link> : ''
                        }
                        {
                            userInfo?.role === 'admin' ? <Link href="/admin-dashboard/admin-home" className={isActive('/admin-dashboard/admin-home') ? 'text-red-500' : 'text-gray-700'}>Dashboard</Link> : ''
                        }
                        <Link href="/blogs" className={`py-2 rounded hover:bg-gray-100 ${isActive('/blogs') ? 'text-red-500' : 'text-gray-700'}`} onClick={toggleMobileMenu}>Blog</Link>
                        <Link href="/contact" className={`py-2 rounded hover:bg-gray-100 ${isActive('/contact') ? 'text-red-500' : 'text-gray-700'}`} onClick={toggleMobileMenu}>Contact</Link>
                        {
                            session?.user ? <button onClick={() => signOut()} className={`border px-4 py-2 rounded transition font-semibold sm:text-lg border-red-500 text-red-600 hover:bg-red-50`}>SignOut</button> :
                                <div className='flex flex-col gap-2 text-center'>
                                    <Link href='/login' className={`border px-4 py-2 rounded transition font-semibold sm:text-lg border-red-500 text-red-600 hover:bg-red-50 text-center`}>LogIn</Link>
                                    <Link href='/register' className={`border px-4 py-2 rounded transition font-semibold sm:text-lg border-red-500 text-red-600 hover:bg-red-50 text-center`}>Register</Link>
                                </div>
                        }
                    </div>
                </div>
            </nav>
        );
    } else {
        return <></>
    }
};

export default Header;







