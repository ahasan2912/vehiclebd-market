import { Heart, Plus } from "lucide-react";
import { Product } from "./ProductSection";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
    item: Product;
}
const ProductCard = ({ item }: ProductCardProps) => {
    const { _id, name, material, price, discount, year, size, image } = item || {};
    const currentPrice = price  - (price * (discount/100));
    return (
        <Link href={`/product/${_id}`} className="relative w-full max-w-sm rounded-xl overflow-hidden shadow-lg  border border-gray-400 group bg-[#f9f5f5]">
            {/* Discount and Year badges */}
            <div className="absolute top-4 left-4 flex gap-2 z-10">
                {discount > 0 && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        -{discount}%
                    </span>
                )}
                <span className="bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {year}
                </span>
            </div>

            {/* Wishlist Icon */}
            <div className="absolute top-4 right-4 z-10">
                <button className="text-gray-500 hover:text-red-500 transition-colors">
                    <Heart size={24} />
                </button>
            </div>

            {/* Product Image */}
            <div className="relative w-full h-72 flex items-center justify-center p-4 bg-white">
                <Image
                    src={image}
                    alt={name}
                    objectFit="contain"
                    className="group-hover:scale-105 transition-transform duration-300 rounded-md w-full h-full object-fill"
                    width={500}
                    height={250}
                />
            </div>
            <div className="p-6">
                <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 rounded-full bg-green-600 border border-gray-400"></div>
                        <span className="text-gray-500 text-sm">{material}</span>
                    </div>
                    <button className="flex items-center text-gray-600 hover:text-red-600 transition-colors">
                        <Plus size={16} />
                        <span className="ml-1 text-sm">Compare</span>
                    </button>
                </div>

                <h3 className="text-xl font-bold text-gray-800">{name}</h3>
                <div className="flex justify-between items-center my-2">
                    <p className="text-gray-800 text-base font-semibold rounded-sm bg-gray-300 px-2 py-1">{material}</p>
                    <p className="text-gray-800 text-base font-semibold rounded-sm bg-gray-300 px-2 py-1">{size}</p>
                </div>
                <div className="flex justify-between items-center mt-3">
                    <span className="text-gray-800 text-xl font-bold line-through ">
                        ৳{price.toFixed(2)}
                    </span>
                    <span className="text-red-500 text-xl font-bold">
                        ৳{currentPrice.toFixed(2)}
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;