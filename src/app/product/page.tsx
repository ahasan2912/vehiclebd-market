import ProductSection from './components/ProductSection';

const ProductsPage = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    const fetchProducts = async () => {
        try {
            const res = await fetch(`${baseUrl}/api/product`, { cache: 'no-store' });
            if (!res.ok) throw new Error('Failed to fetch products');
            const data = await res.json();
            return data.vehicles || [];
        } catch (error) {
            console.error("Error fetching vehicles:", error);
            return [];
        }
    };
    const products = await fetchProducts();
    return (
        <div className='pt-24 md:py-28'>
            <ProductSection products={products} />
        </div>
    );
};

export default ProductsPage;