import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import DashboardClientLayout from "./components/DashboardClientLayout";
const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
    const session = await getServerSession(authOptions);
    const fetchUserData = async () => {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
        try {
            const res = await fetch(`${baseUrl}/api/role?email=${session?.user?.email}`);

            if (!res.ok) {
                throw new Error(`Failed to fetch, status: ${res.status}`);
            }
            const data = await res.json();
            return data?.role;
        } catch (error) {
            console.log("Failed to fetch product details", error);
        }
    }
    const userData = await fetchUserData();
    return (
        <DashboardClientLayout user={userData}>
            {children}
        </DashboardClientLayout>
    );
};

export default DashboardLayout;