import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Button from '../shared/Button';
import Headline from '../shared/Headline';
import { services } from '@/lib/data/service';

const ServiceArea = () => {
    return (
        <section className="container mx-auto px-4">
            <Headline
                subtitle='Service'
                title='Our Service Area'
                description=" We provide trusted exchange and selling services for Bicycles, Bikes, and Cars. Our service area ensures safe, fast, and reliable transactions for every customer."
            />

            {/* Service Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {services.map((service, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden p-6 flex flex-col border border-red-400">
                        <div className="relative w-full h-48 rounded-lg overflow-hidden">
                            <Image
                                src={service.image}
                                alt={service.title}
                                width={200}
                                height={100}
                                className="rounded-lg w-full object-fill"
                            />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 my-2">{service.title}</h3>
                        <div className="flex justify-between items-center mt-auto">
                            <p className="text-red-500 font-bold text-lg">Price : ৳{service.price}</p>
                            <Link href={`/product`} className="text-red-500 hover:text-red-600 transition-colors">
                                <ArrowRight className="w-6 h-6" />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* More Services Button */}
            <Link href={`/product`} className="flex items-center justify-center">
                <Button color={'border-red-500 text-red-600 hover:bg-red-50'}>More Services</Button>
            </Link>
        </section>
    );
};

export default ServiceArea;