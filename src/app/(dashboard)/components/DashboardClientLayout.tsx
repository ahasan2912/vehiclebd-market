"use client";
import { ReactNode, useState } from "react";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";

export interface UserData {
    name: string;
    email: string;
    image: string;
    role: "admin" | "user";
}

interface DashboardClientLayoutProps {
    children: ReactNode;
    user?: UserData;
}

const DashboardClientLayout = ({ children, user }: DashboardClientLayoutProps) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    return (
        <div className="min-h-screen bg-gray-100 font-sans antialiased flex">
            {/* DahsboadHeder */}
            <DashboardHeader
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen} />
            {/* Sidebar */}
            <Sidebar
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
                user={user} />

            {/* Overlay for mobile sidebar (to close when clicking outside) */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-opacity-50 z-30 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}>
                </div>
            )}
            <main className="flex-1 lg:ml-64 pt-12 lg:pt-0 flex flex-col min-h-screen overflow-y-auto">
                <div className="px-6 py-2 flex-grow">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default DashboardClientLayout;