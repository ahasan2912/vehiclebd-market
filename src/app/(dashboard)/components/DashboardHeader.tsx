"use client"
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { FaBars } from 'react-icons/fa6';

interface Headertogglebar {
    isSidebarOpen: boolean;
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashboardHeader = ({ isSidebarOpen, setIsSidebarOpen }: Headertogglebar) => {
    return (
        <div className="lg:hidden fixed top-0 left-0 right-0 p-4 bg-white shadow-md flex justify-between items-center z-30">
            <div className="flex items-center">
                <div className="flex items-center">
                    <Link href="/user-dashboard/userhome">
                        <Image src={'/assets/logo.svg'} alt="Car Doctor" width={130} height={80} />
                    </Link>
                </div>
            </div>
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-700 focus:outline-none">
                {isSidebarOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
        </div>
    );
};

export default DashboardHeader;