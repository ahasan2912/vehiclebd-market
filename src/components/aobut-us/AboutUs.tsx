import React from 'react';
import Button from '../shared/Button';
import Image from 'next/image';

const AboutUs = () => {
    return (
        <section className="container mx-auto px-4 py-32 flex flex-col lg:flex-row gap-10 lg:gap-24">
            {/* Image Section */}
            <div className="relative w-full  lg:w-2/5 flex justify-center items-center">
                {/* Main Image (Mechanic) */}
                <div className="w-full h-[350px] md:h-[450px] lg:h-[550px] rounded-lg overflow-hidden shadow-xl">
                    <Image
                        src="/assets/images/about_us/person.jpg"
                        alt="Mechanic working on a car"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                    />
                </div>

                {/* Overlapping Image (Car Parts) */}
                <div className="absolute bottom-[-100px] right-1/2 transform translate-x-1/2 md:bottom-[-40px] md:right-28 md:transform-none
                         w-[250px] h-[240px] md:w-[280px] md:h-[270px] lg:w-[350px] lg:h-[340px]
                         bg-white p-4 rounded-lg shadow-2xl border-8 border-white">
                    <Image
                        src="/assets/images/about_us/parts.jpg"
                        alt="Car parts and oil bottle"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                    />
                </div>
            </div>

            {/* Text Content Section */}
            <div className="w-full lg:w-1/2 space-y-6 mt-20 md:mt-0">
                <p className="text-red-500 font-bold text-xl">About Us</p>
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 leading-tight">
                    We are qualified <br className="hidden sm:block" /> &amp; of experience <br className="hidden sm:block" /> in this field
                </h2>
                <p className="text-[#737373] leading-relaxed my-[30px]">
                    There Are Many Variations Of Passages Of Lorem Ipsum Available, But The Majority Have Suffered Alteration In Some Form, By Injected Humour, Or Randomised Words Which Don&apos;t Look Even Slightly Believable.
                </p>
                <p className="text-[#737373] leading-relaxed">
                    The Majority Have Suffered Altered In Some Form, By Injected Humour, Or Randomised Words Which Don&apos;t Look Even Slightly Believable.
                </p>
                <Button color={'bg-[#FF3811] hover:bg-red-500 text-white hover:bg-red-600 px-5 py-3'}>Get More Info</Button>
            </div>
        </section>
    );
};

export default AboutUs;