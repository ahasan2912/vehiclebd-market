import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import ProductDetailsPage from "./components/ProductDetailsPage";

const SingleDataFatch = async ({ params }: { params: Promise<{ id: string }> }) => {
    const session = await getServerSession(authOptions);
    const { id } = await params;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    // Single Product Fetch
    const fetchProduct = async () => {
        try {
            const res = await fetch(`${baseUrl}/api/product/${id}`);
            if (!res.ok) {
                throw new Error("Failed to fetch product details.");
            }
            const data = await res.json();
            return data
        } catch (error) {
            console.error("Error fetching vehicles:", error);
        }
    };

    // User Data Fetch
    const fetchUserData = async () => {
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
    const singleProduct = await fetchProduct();
    return (
        <div>
            <ProductDetailsPage
                product={singleProduct}
                user={userData} />
        </div>
    );
};

export default SingleDataFatch;
