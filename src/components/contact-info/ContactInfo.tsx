import React from 'react';
import { CalendarDays, Phone, MapPin } from 'lucide-react';

const ContactInfo = () => {
    return (
        <div className="container mx-auto bg-[#151515] text-white py-10 sm:py-24 my-30 px-4 rounded-md">
            <div className="flex flex-col md:flex-row gap-16 justify-center items-center">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <CalendarDays className="w-8 h-8 text-white" />
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-gray-800 flex items-center justify-center -mb-1 -mr-1">
                        </div>
                    </div>
                    <div>
                        <p className="text-base">We are open monday-friday</p>
                        <p className="font-bold text-2xl">7:00 am - 9:00 pm</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Phone className="w-8 h-8 text-white" />
                        <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-gray-800 flex items-center justify-center -mt-1 -mr-1">
                        </div>
                    </div>
                    <div>
                        <p className="text-base">Have a question?</p>
                        <p className="font-bold text-2xl">+8801796905988</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className='relative'>
                        <MapPin className="w-8 h-8 text-white" />
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-gray-800 flex items-center justify-center -mb-1 -mr-1">
                        </div>
                    </div>
                    <div>
                        <p className="text-base">Need a repair? our address</p>
                        <p className="font-bold text-2xl">Liza Street, New York</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactInfo;