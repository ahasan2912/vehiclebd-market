import React from 'react';
import UpadateForm from '../components/UpadateForm';

const ProductUpdateFetch = async ({ params }: { params: Promise<{ id: string }> }) => {
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
            return data;
        } catch (error) {
            console.log("Error fetching vehicles:", error);
        }
    }
    const singleProduct = await fetchProduct();
    return (
        <UpadateForm singleProduct={singleProduct} />
    );
};

export default ProductUpdateFetch;