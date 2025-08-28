import OrderFormUpdate from "../components/OrderFormUpdate";

const OrderProductFetch = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    const fetchProduct = async () => {
        try {
            const res = await fetch(`${baseUrl}/api/order/${id}`);
            if (!res.ok) {
                throw new Error("Failed to fetch product details.");
            }
            const data = await res.json();
            return data;
        } catch (error) {
            console.error("Error fetching vehicles:", error);
        }
    };

    const orderProduct = await fetchProduct();

    return (
        <div>
            <OrderFormUpdate order={orderProduct} />
        </div>
    );
};

export default OrderProductFetch;