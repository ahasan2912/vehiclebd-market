"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

export interface Orders {
    _id: string;
    buyerName: string;
    buyerEmail: string;
    buyerPhone: string;
    buyerAddress: string;
    orderDate: string;
    productName: string;
    productImage: string;
    productPrice: number;
    productQuantity: number;
    productSize: string;
    sellerName: string;
    sellerEmail: string;
}

const OrderList = ({ orders }: { orders: Orders[] }) => {
    const router = useRouter();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

    //handleCancleOrder
    const handleCancleOrder = async (id: string) => {
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
                const res = await fetch(`${baseUrl}/api/order/${id}`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" }
                });
                const data = await res.json();
                if (res.ok && data.deletedCount > 0) {
                    Swal.fire("Deleted!", data.message, "success");
                    router.refresh();
                } else {
                    Swal.fire("Error!", data.message || "Order could not be deleted", "error");
                }
            }
        } catch (error) {
            toast.error(`Network or unexpected error: ${error}`);
        }
    }

    return (
        <div className="p-8 rounded-lg shadow-2xl">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-6 border-b-2 border-blue-500 pb-4">My Orders</h2>
            <div className="rounded-xl border border-gray-200 overflow-x-auto">
                <table className="min-w-full overflow-x-auto">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Order ID</th>
                            <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Product Name</th>

                            <th className="py-4 px-6 text-sm text-left font-semibold text-gray-700 uppercase tracking-wider">Product Size</th>
                            <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Quantity</th>
                            <th className="py-4 px-6 text-sm font-semibold text-gray-700 uppercase tracking-wider text-left">Total Amount</th>
                            <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                            <th className="py-4 px-6 text-sm font-semibold text-gray-700 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {orders.length > 0 ? (
                            orders.map((order, index) => (
                                <tr key={order._id} className={`transition-colors duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-indigo-50`}>
                                    <td className="py-4 px-6 whitespace-nowrap text-gray-900 font-medium text-sm text-left">ORD00{index + 1}</td>
                                    <td className="py-4 px-6 whitespace-nowrap text-sm text-left  text-gray-900 font-medium">{order.productName}</td>
                                    <td className="py-4 px-6 whitespace-nowrap text-gray-900 font-medium text-sm text-left">{order.productSize}</td>
                                    <td className="py-4 px-6 whitespace-nowrap text-gray-900 font-medium text-sm">0{order.productQuantity}</td>
                                    <td className="py-4 px-6 whitespace-nowrap text-gray-900 font-medium text-sm">
                                        <span className='text-sm font-extrabold'>৳</span>{order.productPrice * order.productQuantity}</td>
                                    <td className="py-4 text-sm font-semibold px-6 whitespace-nowrap text-gray-900">{new Date(order.orderDate).toLocaleDateString()}</td>
                                    <td className="py-4 px-6 whitespace-nowrap space-x-5 text-center">
                                        <button onClick={() => handleCancleOrder(order?._id)} className='btn bg-red-200 rounded-sm'>
                                            Cancle
                                        </button>
                                        <Link href={`/user-dashboard/user-updateform/${order?._id}`}>  <button className='btn bg-green-200 rounded-sm'>Edit</button>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : <tr>
                            <td
                                colSpan={2}
                                className="py-10 text-center text-gray-500 text-lg"
                            >
                                No orders found
                            </td>
                        </tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default OrderList;