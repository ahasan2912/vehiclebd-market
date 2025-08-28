"use client"
import { UserData } from "@/components/navbar/Header";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Product } from "../../components/ProductSection";

export interface OrderFormData {
    quantity: number;
    address: string;
    phone: string;
}

export interface ProductDetails {
    product: Product;
    user: UserData;
}

const ProductDetailsPage = ({ product, user }: ProductDetails) => {
    const { data: session } = useSession()
    const [selectedSize, setSelectedSize] = useState<string>("S");
    const router = useRouter();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    const { name, price, discount, image, sellername, email } = product;
    const currentPrice = (price ?? 0) - ((price ?? 0) * ((discount ?? 0) / 100));

    const [formData, setFormData] = useState<OrderFormData>({
        quantity: 1,
        address: "",
        phone: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "quantity" ? Number(value) : value,
        });
    };

    const handleOrder = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormData({ quantity: 1, address: "", phone: "" });

        const orderFrom = {
            productName: name,
            productPrice: currentPrice,
            productImage: image,
            productQuantity: formData?.quantity,
            sellerName: sellername,
            sellerEmail: email,
            productSize: selectedSize,
            buyerName: session?.user?.name,
            buyerEmail: session?.user?.email,
            buyerPhone: formData?.phone,
            buyerAddress: formData?.address,
            orderDate: new Date().toISOString(),
        }

        try {
            const res = await fetch(`${baseUrl}/api/order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderFrom),
            });

            const postedResponse = await res.json();
            if (res.ok && postedResponse?.insertedId) {
                Swal.fire({
                    title: "Product Order Successfully!",
                    icon: "success",
                    draggable: true
                });
                router.push("/user-dashboard/orderlist")
            } else {
                const errorMessage = postedResponse.message || "Failed to order product.";
                toast.error("API Error:", errorMessage);
            }

        } catch (error) {
            toast.error(`Network or unexpected error: ${error}`);
        }
    };

    return (
        <div className="container mx-auto flex flex-col lg:flex-row justify-between pt-32 pb-20 px-6 bg-white">
            <div className="flex-1 flex flex-col items-center justify-center">
                <Image
                    src={image || "/default-image.png"}
                    alt="My Image"
                    width={1000}
                    height={200}
                />
            </div>

            {/* Right: Product Info */}
            <div className="flex-1 lg:pl-16 mt-10 lg:mt-0">
                <p className="text-sm text-gray-500">CANNONDALE</p>
                <h1 className="text-3xl font-bold mt-1">
                    {name}
                </h1>
                {/* Price Section */}
                <div className="mt-4 flex items-center gap-3">
                    <p className="text-red-600 text-2xl font-bold">
                        ৳ {currentPrice}
                    </p>
                    <p className="line-through text-gray-600 font-bold text-xl">{price}</p>
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm">
                        {discount}%
                    </span>
                </div>
                <p className="text-gray-400 text-sm my-2">
                    Excl. taxes and shipping
                </p>
                {/* Size Selector */}
                <div className="mt-3">
                    <h3 className="font-semibold mb-2">Sizes</h3>
                    <div className="flex gap-2">
                        {["S", "M", "L"].map((size) => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`px-4 py-2 border rounded ${selectedSize === size
                                    ? "border-black font-bold"
                                    : "border-gray-300"
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                        Unsure about your size?{" "}
                        <span className="underline cursor-pointer">Size guide</span>
                    </p>
                </div>

                {/* Stock Info */}
                <div className="my-4">
                    <span className="mt-6 text-sm bg-pink-100 text-pink-600 px-4 py-2 rounded">
                        In Stock - Low Inventory
                    </span>
                </div>
                {/* order from */}
                <form onSubmit={handleOrder} className="mt-4 max-w-xl">
                    <div className="form-control mb-2">
                        <label className="text-gray-700 flex items-center gap-1">
                            <span>Product Quantity</span>
                            <span className="text-red-500 text-base font-semibold"> *</span>
                        </label>
                        <input
                            type="number"
                            name="quantity"
                            placeholder="How many order quantity?"
                            className="input input-bordered w-full mt-2 bg-white"
                            value={formData.quantity}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-control mb-4">
                        <label className="text-gray-700 flex items-center gap-1">
                            <span>Address</span>
                            <span className="text-red-500 text-base font-semibold"> *</span>
                        </label>
                        <input
                            type="text"
                            name="address"
                            placeholder="Type your address"
                            className="input input-bordered w-full mt-2 bg-white"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-control mb-4">
                        <label className="text-gray-700 flex items-center gap-1">
                            <span>Phone Number</span>
                            <span className="text-red-500 text-base font-semibold"> *</span>
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Type active phone number"
                            className="input input-bordered w-full mt-2 bg-white"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={user?.role === 'admin'}
                        className="w-full bg-black text-white py-4 rounded-xl mt-3 hover:bg-gray-800 transition"
                    >
                        {user?.role === 'admin' ? <span>Admin can&apos;t place orders.</span> : <span>Order Now →</span>}

                    </button>
                </form>

                {/* Seller Info */}
                <div className="mt-8 border-t pt-6">
                    <h3 className="font-semibold">About the Seller</h3>
                    <p className="font-medium">{sellername} Vehicle STR ✅</p>
                    <p className="text-gray-500 text-sm">
                        Contact: {email}
                    </p>
                    <p className="text-gray-500 text-sm">
                        Location: Dhaka, Bangladesh
                    </p>
                    <p className="text-gray-500 text-sm">
                        Estimated shipping time: 2 - 4 days
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;
