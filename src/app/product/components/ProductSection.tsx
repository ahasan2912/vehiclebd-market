"use client"
import Headline from '@/components/shared/Headline';
import ProductCard from './ProductCard';

export interface Product {
    _id: string;
    name: string;
    material: string;
    price: number;
    discount: number;
    year: number;
    size: string;
    image: string;
    email: string;
    sellername: string;
}

const ProductSection = ({ products }: { products: Product[] }) => {
    return (
        <section className="container mx-auto px-4 flex flex-col justify-center items-center">
            <Headline
                subtitle=''
                title='Our All Product'
                description="On our platform, you can easily exchange and sell Bicycles, Bikes, and Cars without any hassle.
                We provide a safe, fast, and reliable service to ensure a smooth transaction for every customer."
            />

            {/* Service Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {products?.map((item) => (
                    <ProductCard
                        key={item._id}
                        item={item} />
                ))}
            </div>
        </section>
    );
};

export default ProductSection;