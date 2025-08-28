import LoadingSpiner from "@/components/LoadingSpiner";
import { authOptions } from "@/lib/authOptions";
import { ShoppingCart, TruckIcon} from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";

const UserHome = async() => {
    const session = await getServerSession(authOptions);
    if (!session) {
        return <LoadingSpiner />
    }
    return (
        <div className="bg-white p-10 rounded-lg shadow-2xl text-center  border border-gray-100 h-screen">
            <div className="flex justify-center items-center border-red-400 border-2 w-28 h-28 rounded-full mx-auto">
                <Image
                    src={session?.user?.image || "/default.png"}
                    alt="User profile"
                    width={100}
                    height={100}
                    className="rounded-full"
                    unoptimized
                    referrerPolicy='no-referrer'
                />
            </div>
            <h2 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">Welcome <span className="text-indigo-600">{session?.user?.name}!</span></h2>
            <p className="text-lg text-gray-700 mb-10 max-w-prose mx-auto">
                Welcome to your Vehicles dashboard. From here, you can effortlessly manage and track your orders. Stay updated on your purchases with ease.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out text-white">
                    <ShoppingCart size={48} className="mx-auto mb-4 opacity-80" />
                    <p className="text-2xl font-bold mb-1">Total Orders</p>
                    <p className="text-5xl font-extrabold">05</p>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-700 p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out text-white">
                    <TruckIcon size={48} className="mx-auto mb-4 opacity-80" />
                    <p className="text-2xl font-bold mb-1">Delivered</p>
                    <p className="text-5xl font-extrabold">03</p>
                </div>
            </div>
        </div>
    );
};

export default UserHome;