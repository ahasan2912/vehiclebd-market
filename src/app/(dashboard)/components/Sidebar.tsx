import { ArrowRightFromLine, File, HomeIcon, LayoutDashboard, ListOrderedIcon, LogOut, User, } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface UserData {       
  name: string;          
  email: string;             
  image?: string;         
  role: "admin" | "user";
}

type SidebarProps = {
    isOpen: boolean;
    toggleSidebar: () => void;
    user?: UserData;
};

const Sidebar = ({ isOpen, toggleSidebar, user }: SidebarProps) => {
    const pathname = usePathname();
    const isActive = (href: string) => pathname === href;
    const handleLogOut = async () => {
        await signOut({ callbackUrl: '/' });
    };
    return (
        <div
            className={`fixed inset-y-0 mt-2 rounded-lg left-0 bg-white border text-white w-64 p-4 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'
                } lg:translate-x-0 transition-transform duration-300 ease-in-out z-40`}
        >
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                    <Link href="/user-dashboard/userhome">
                        <Image src='/assets/logo.svg' alt="Car Doctor" width={130} height={80} />
                    </Link>
                </div>
                <button onClick={toggleSidebar} className="lg:hidden p-2 rounded-full hover:bg-gray-700">
                    <ArrowRightFromLine size={24} />
                </button>
            </div>
            <nav>
                {
                    user?.role === 'user' ?
                        <ul className="text-black space-y-2">
                            <Link
                                href="/user-dashboard/userhome"
                                className={`flex items-center p-3 rounded-lg font-bold hover:bg-blue-600 hover:text-white f transition-colors duration-200 
                        ${isActive('/user-dashboard/userhome') ? 'bg-blue-500 text-white' : ''}`}
                            >
                                <LayoutDashboard size={23} className="mr-3" />
                                Customer Home
                            </Link>
                            <Link
                                href="/user-dashboard/orderlist"
                                className={`flex items-center p-3 rounded-lg  hover:bg-blue-600 hover:text-white transition-colors duration-200 font-bold ${isActive('/user-dashboard/orderlist') ? 'bg-blue-500 text-white' : ''}`}
                            >
                                <ListOrderedIcon size={25} className="mr-3" />
                                My Order List
                            </Link>
                            <div className="my-4 divider">OR</div>
                            <Link
                                href="/"
                                className={`flex items-center p-3 rounded-lg  hover:bg-blue-600 hover:text-white transition-colors duration-200 font-bold`}
                            >
                                <HomeIcon size={23} className="mr-3" />
                                Back To Homes
                            </Link>
                        </ul> :
                        <ul className="text-black space-y-2">
                            <Link
                                href="/admin-dashboard/admin-home"
                                className={`flex items-center p-3 rounded-lg font-bold hover:bg-blue-600 hover:text-white f transition-colors duration-200 
                        ${isActive('/admin-dashboard/admin-home') ? 'bg-blue-500 text-white' : ''}`}
                            >
                                <LayoutDashboard size={23} className="mr-3" />
                                Admin Home
                            </Link>
                            <Link
                                href="/admin-dashboard/addProduct"
                                className={`flex items-center p-3 rounded-lg font-bold hover:bg-blue-600 hover:text-white f transition-colors duration-200 
                        ${isActive('/admin-dashboard/addProduct') ? 'bg-blue-500 text-white' : ''}`}
                            >
                                <File size={23} className="mr-3" />
                                Product Add
                            </Link>
                            <Link
                                href="/admin-dashboard/manageProduct"
                                className={`flex items-center p-3 rounded-lg font-bold hover:bg-blue-600 hover:text-white f transition-colors duration-200 
                        ${isActive('/admin-dashboard/manageProduct') ? 'bg-blue-500 text-white' : ''}`}
                            >
                                <File size={23} className="mr-3" />
                                Product Manage
                            </Link>
                            <Link
                                href="/admin-dashboard/user-orders"
                                className={`flex items-center p-3 rounded-lg  hover:bg-blue-600 hover:text-white transition-colors duration-200 font-bold ${isActive('/admin-dashboard/user-orders') ? 'bg-blue-500 text-white' : ''}`}
                            >
                                <ListOrderedIcon size={25} className="mr-3" />
                                All Order List
                            </Link>
                            <Link
                                href="/admin-dashboard/user-manage"
                                className={`flex items-center p-3 rounded-lg  hover:bg-blue-600 hover:text-white transition-colors duration-200 font-bold ${isActive('/admin-dashboard/user-manage') ? 'bg-blue-500 text-white' : ''}`}
                            >
                                <User size={25} className="mr-3" />
                                User Manage
                            </Link>
                            <div className="my-4 divider">OR</div>
                            <Link
                                href="/"
                                className={`flex items-center p-3 rounded-lg  hover:bg-blue-600 hover:text-white transition-colors duration-200 font-bold`}
                            >
                                <HomeIcon size={23} className="mr-3" />
                                Back To Home
                            </Link>
                        </ul>}
                <div
                    onClick={handleLogOut}
                    className={`flex items-center rounded-lg text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-200 font-bold fixed bottom-2 w-[87%] p-3 cursor-pointer`}
                >
                    <LogOut size={23} className="mr-2" />
                    <span>LogOut</span>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;