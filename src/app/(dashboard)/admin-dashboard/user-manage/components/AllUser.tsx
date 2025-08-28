"use client"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

export interface UserData {
    _id: string;
    name: string;
    email: string;
    image: string;
    role: "admin" | "user";
}

const AllUser = ({ users }: { users: UserData[] }) => {
    const router = useRouter();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    const handleDeleteUser = async (id: string) => {
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
                const res = await fetch(`${baseUrl}/api/alluser/${id}`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" }
                });

                const data = await res.json();

                if (res.ok && data.deletedCount > 0) {
                    Swal.fire("User deleted successfully!");
                    router.refresh(); // Refresh the page to show updated data
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
    };
    return (
        <div className="p-8 rounded-lg shadow-2xl">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-6 border-b-2 border-blue-500 pb-4">All Users</h2>
            <div className="rounded-xl border border-gray-200 overflow-x-auto">
                <table className="min-w-full overflow-x-auto">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Serial</th>
                            <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">User Name</th>
                            <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">User Image</th>
                            <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">User email</th>
                            <th className="py-4 px-6 text-sm font-semibold text-gray-700 uppercase tracking-wider text-left">User Role</th>
                            <th className="py-4 px-6 text-sm font-semibold text-gray-700 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <tr key={user?._id} className={`transition-colors duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-indigo-50`}>
                                    <td className="py-4 px-6 whitespace-nowrap text-gray-900 font-medium text-sm text-left">0US{index + 1}</td>
                                    <td className="py-4 px-6 whitespace-nowrap text-sm text-left  text-gray-900 font-medium">{user?.name}</td>
                                    <td className="py-4 px-6 text-left whitespace-nowrap text-gray-900 ">
                                        <Image
                                            src={user?.image}
                                            alt={user?.name}
                                            objectFit="contain"
                                            className="group-hover:scale-105 transition-transform duration-300 rounded-full w-[45px] h-[45px] object-fill hover:border-2 hover:border-red-400 hover:p-.5 "
                                            width={120}
                                            height={120}
                                            referrerPolicy='no-referrer'
                                        />
                                    </td>
                                    <td className="py-4 px-6 whitespace-nowrap text-gray-900 font-medium text-sm">{user?.email}</td>
                                    <td className="py-4 px-6 whitespace-nowrap font-medium text-sm "><span className='bg-yellow-100 text-yellow-800 px-2 py-1 rounded-2xl'>{user?.role
                                        ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
                                        : ""}</span></td>
                                    <td className="py-4 px-6 whitespace-nowrap space-x-5 text-center">
                                        <button onClick={() => handleDeleteUser(user?._id)} className='btn bg-red-200 rounded-sm'>
                                            Delete
                                        </button>
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

export default AllUser;