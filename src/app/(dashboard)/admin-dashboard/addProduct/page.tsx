"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export interface Vehicles {
    name: string;
    material: string;
    price: number;
    discount: number;
    year: number;
    size: string;
    image: string;
    email?: string;
    sellername?: string;
}

const ProductAddForm = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [vehicles, setVehicles] = useState<Vehicles>({
        name: "",
        material: "",
        price: 0,
        discount: 0,
        year: new Date().getFullYear(),
        size: "",
        image: "",
        email: "",
        sellername: "",
    });
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    useEffect(() => {
        if (session?.user) {
            setVehicles((prev) => ({
                ...prev,
                email: session?.user?.email || "",
                sellername: session?.user?.name || "",
            }));
        }
    }, [session]);

    const validateForm = () => {
        const errors: Record<string, string> = {};
        if (!vehicles.name) errors.name = "Bike Name is required.";
        if (!vehicles.material) errors.material = "Material is required.";
        if (vehicles.price <= 0) errors.price = "Price must be a positive number.";
        if (vehicles.discount < 0 || vehicles.discount > 100)
            errors.discount = "Discount must be between 0 and 100.";
        if (!vehicles.year || vehicles.year < 1900 || vehicles.year > new Date().getFullYear() + 5)
            errors.year = "Please enter a valid year.";
        if (!vehicles.size) errors.size = "Size is required.";
        if (!vehicles.image) errors.image = "Image URL is required.";
        else if (!/^https?:\/\/.+\.(png|jpg|jpeg|gif|webp)$/i.test(vehicles.image)) {
            errors.image = "Please enter a valid image URL (png, jpg, jpeg, gif, webp).";
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setVehicles((prev) => ({
            ...prev,
            [name]:
                name === "price" || name === "discount" || name === "year"
                    ? parseFloat(value) || 0
                    : value,
        }));
        setFormErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        try {
            const res = await fetch(`${baseUrl}/api/product`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(vehicles),
            });

            const postedResponse = await res.json();
            if (res.ok && postedResponse?.insertedId) {
                Swal.fire({
                    title: "Product Added Successfully!",
                    icon: "success",
                    draggable: true
                });
                setVehicles({
                    name: "",
                    material: "",
                    price: 0,
                    discount: 0,
                    year: new Date().getFullYear(),
                    size: "",
                    image: "",
                    email: session?.user?.email || "",
                    sellername: session?.user?.name || "",
                });
                router.push("/admin-dashboard/manageProduct")
            } else {
                const errorMessage = postedResponse.message || "Failed to add product.";
                toast.error("API Error:", errorMessage);
            }
        } catch (error) {
            toast.error(`Network or unexpected error: ${error}`);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className=" p-8 rounded-xl shadow-lg w-full max-w-2xl border border-red-700">
                <h2 className="text-red-500 text-4xl font-bold text-center mb-6">
                    Add New Product
                </h2>
                <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
                    {/* Bike Name */}
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-gray-800 text-sm font-bold mb-2"
                        >
                            Vehicles Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter vehicle name"
                            value={vehicles.name}
                            onChange={handleChange}
                            className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-800 leading-tight focus:outline-none ${formErrors.name ? "border-red-500" : "border-gray-700"
                                }`}
                        />
                        {formErrors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {formErrors.name}
                            </p>
                        )}
                    </div>

                    {/* Material */}
                    <div>
                        <label
                            htmlFor="material"
                            className="block text-gray-800 text-sm font-bold mb-2"
                        >
                            Material (e.g., Carbon)
                        </label>
                        <input
                            type="text"
                            id="material"
                            name="material"
                            placeholder="Enter frame material"
                            value={vehicles.material}
                            onChange={handleChange}
                            className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-800 leading-tight focus:outline-none ${formErrors.material ? "border-red-500" : "border-gray-700"
                                }`}
                        />
                        {formErrors.material && (
                            <p className="text-red-500 text-sm mt-1">
                                {formErrors.material}
                            </p>
                        )}
                    </div>

                    {/* Price & Discount */}
                    <div className="flex gap-2">
                        <div className="w-1/2">
                            <label
                                htmlFor="price"
                                className="block text-gray-800 text-sm font-bold mb-2"
                            >
                                Price
                            </label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                placeholder="Enter price"
                                value={vehicles.price === 0 ? "" : vehicles.price} // Display empty string for 0
                                onChange={handleChange}
                                className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-800 leading-tight focus:outline-none ${formErrors.price ? "border-red-500" : "border-gray-700"
                                    }`}
                            />
                            {formErrors.price && (
                                <p className="text-red-500 text-sm mt-1">
                                    {formErrors.price}
                                </p>
                            )}
                        </div>
                        <div className="w-1/2">
                            <label
                                htmlFor="discount"
                                className="block text-gray-800 text-sm font-bold mb-2"
                            >
                                Discount (%)
                            </label>
                            <input
                                type="number"
                                id="discount"
                                name="discount"
                                placeholder="Enter discount percentage"
                                value={vehicles.discount === 0 ? "" : vehicles.discount} // Display empty string for 0
                                onChange={handleChange}
                                className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-800 leading-tight focus:outline-none ${formErrors.discount ? "border-red-500" : "border-gray-700"
                                    }`}
                            />
                            {formErrors.discount && (
                                <p className="text-red-500 text-sm mt-1">
                                    {formErrors.discount}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Year */}
                    <div>
                        <label
                            htmlFor="year"
                            className="block text-gray-800 text-sm font-bold mb-2"
                        >
                            Year
                        </label>
                        <input
                            type="number"
                            id="year"
                            name="year"
                            placeholder="Enter year"
                            value={vehicles.year}
                            onChange={handleChange}
                            className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-800 leading-tight focus:outline-none ${formErrors.year ? "border-red-500" : "border-gray-700"
                                }`}
                        />
                        {formErrors.year && (
                            <p className="text-red-500 text-sm mt-1">
                                {formErrors.year}
                            </p>
                        )}
                    </div>

                    {/* Size */}
                    <div>
                        <label
                            htmlFor="size"
                            className="block text-gray-800 text-sm font-bold mb-2"
                        >
                            Size (e.g., 48CM)
                        </label>
                        <input
                            type="text"
                            id="size"
                            name="size"
                            placeholder="Enter bike size"
                            value={vehicles.size}
                            onChange={handleChange}
                            className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-800 leading-tight focus:outline-none ${formErrors.size ? "border-red-500" : "border-gray-700"
                                }`}
                        />
                        {formErrors.size && (
                            <p className="text-red-500 text-sm mt-1">
                                {formErrors.size}
                            </p>
                        )}
                    </div>

                    {/* Image URL */}
                    <div>
                        <label
                            htmlFor="image"
                            className="block text-gray-800 text-sm font-bold mb-2"
                        >
                            Image URL
                        </label>
                        <input
                            type="url"
                            id="image"
                            name="image"
                            placeholder="Enter image URL"
                            value={vehicles.image}
                            onChange={handleChange}
                            className={`shadow appearance-none border rounded w-full py-3 px-3 text-gray-800 leading-tight focus:outline-none ${formErrors.image ? "border-red-500" : "border-gray-700"
                                }`}
                        />
                        {formErrors.image && (
                            <p className="text-red-500 text-sm  mt-1">
                                {formErrors.image}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-red-500 text-white py-3 rounded hover:bg-red-600 focus:outline-none focus:shadow-outline transition"
                    >
                        Add New Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductAddForm;