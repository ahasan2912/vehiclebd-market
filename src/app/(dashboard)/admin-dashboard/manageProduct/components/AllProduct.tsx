"use client"
import { Product } from '@/app/product/components/ProductSection';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const AllProduct = ({ products }: { products: Product[] }) => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const router = useRouter();
    const handleProductDelete = async (id: string) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            });
            if (result.isConfirmed) {
                // Backend DELETE request
                const res = await fetch(`${baseUrl}/api/product/${id}`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" }
                });

                const data = await res.json();

                if (res.ok && data.deletedCount > 0) {
                    Swal.fire("User deleted successfully!");
                    router.refresh(); //for refresh
                } else {
                    Swal.fire("Error!", data.message || "User could not be deleted", "error");
                }
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(`Network or unexpected error: ${error.message}`);
            } else {
                toast.error(`Network or unexpected error: ${String(error)}`);
            }
        }
    }
    return (
        <div className="p-8 rounded-lg shadow-2xl">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-6 border-b-2 border-blue-500 pb-4">All Product</h2>
            <div className="rounded-xl border border-gray-200 overflow-x-auto">
                <table className="min-w-full overflow-x-auto">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Product ID</th>
                            <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Product Name</th>
                            <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Material</th>
                            <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Size</th>
                            <th className="py-4 px-6 text-sm font-semibold text-gray-700 uppercase tracking-wider text-left">Price</th>
                            <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Discount</th>
                            <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Year</th>
                            <th className="py-4 px-6 text-sm font-semibold text-gray-700 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {products.length > 0 ? (
                            products.map((product, index) => (
                                <tr key={product._id} className={`transition-colors duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-indigo-50`}>
                                    <td className="py-4 px-6 whitespace-nowrap text-gray-900 font-medium text-sm text-left">PR00{index + 1}</td>
                                    <td className="py-4 px-6 whitespace-nowrap text-sm text-left  text-gray-900 font-medium">{product.name}</td>
                                    <td className="py-4 px-6 whitespace-nowrap text-sm text-left  text-gray-900 font-medium">{product.material}</td>
                                    <td className="py-4 px-6 whitespace-nowrap text-gray-900 font-medium text-sm">{product.size}</td>
                                    <td className="py-4 px-6 whitespace-nowrap text-gray-900 font-medium text-sm">
                                        <span className='text-sm font-extrabold'>৳</span>{product.price}</td>
                                    <td className="py-4 px-6 whitespace-nowrap text-gray-900 font-medium text-sm text-left">{product.discount}%</td>
                                    <td className="py-4 text-sm px-6 whitespace-nowrap text-gray-900 font-semibold">{product.year}</td>
                                    <td className="py-4 px-6 whitespace-nowrap space-x-5 text-center">
                                        <button onClick={() => handleProductDelete(product?._id)} className='btn bg-red-200 rounded-sm'>
                                            Cancle
                                        </button>
                                        <Link href={`/admin-dashboard/product-update/${product?._id}`} className='btn bg-green-200 rounded-sm'>
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="py-10 text-center text-gray-500 text-lg">
                                    No customer has ordered yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllProduct;