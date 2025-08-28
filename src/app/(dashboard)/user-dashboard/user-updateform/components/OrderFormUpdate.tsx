"use client"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { Orders } from '../../orderlist/components/OrderList';

export interface OrderFormData {
    quantity: number;
    address: string;
    phone: string;
}

const OrderFormUpdate = ({ order }: { order: Orders }) => {
    const router = useRouter();
    const { _id, productImage, productName, productSize, } = order || {};
    const [selectedSize, setSelectedSize] = useState<string | undefined>(productSize);
    const [formData, setFormData] = useState<OrderFormData>({
        quantity: 1,
        address: "",
        phone: "",
    });

    // when order is loaded, update state
    useEffect(() => {
        if (order) {
            setSelectedSize(order.productSize);
            setFormData({
                quantity: order.productQuantity,
                address: order.buyerAddress,
                phone: order.buyerPhone,
            });
        }
    }, [order]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "quantity" ? Number(value) : value,
        });
    };

    const handleUpdateOrder = async (e: FormEvent<HTMLFormElement>) => {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
        e.preventDefault();
        const updateOrder = {
            productQuantity: formData.quantity,
            productSize: selectedSize,
            buyerAddress: formData.address,
            buyerPhone: formData.phone,
        }
        try {
            const res = await fetch(`${baseUrl}/api/order/${_id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updateOrder),
            });

            const postedResponse = await res.json();
            if (res.ok && postedResponse.modifiedCount > 0) {
                Swal.fire({
                    title: postedResponse.message,
                    icon: "success",
                    draggable: true
                });
                router.push("/user-dashboard/orderlist");
            } else {
                toast.error(`API Error: ${postedResponse.message || postedResponse.error}`);
            }
        } catch (error) {
            toast.error(`Network or unexpected error: ${error}`);
        }
    }

    return (
        <div className='bg-white h-screen'>
            <div className="container mx-auto flex flex-col lg:flex-row justify-between py-16 px-6">
                <div className="flex-1 flex flex-col items-center justify-center">
                    <Image
                        src={productImage || "/default-image.png"}
                        alt="My Image"
                        width={1000}
                        height={200}
                    />
                </div>

                {/* Right: Product Info */}
                <div className="flex-1 lg:pl-16 mt-10 lg:mt-0">
                    <p className="text-sm text-gray-500">CANNONDALE</p>
                    <h1 className="text-3xl font-bold mt-1">
                        {productName}
                    </h1>
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
                    </div>
                    {/* order from */}
                    <form onSubmit={handleUpdateOrder} className="mt-4 max-w-xl">
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
                            className="w-full bg-black text-white py-4 rounded-xl mt-3 hover:bg-gray-800 transition"
                        >
                            Order Now →
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default OrderFormUpdate;