'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram, ArrowLeft, ArrowRight } from 'lucide-react';
import Headline from '../shared/Headline';
import { Navigation, Pagination, Mousewheel, Autoplay, Keyboard } from 'swiper/modules';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { teamMembers } from '@/lib/data/teamData';

const TeamSection = () => {
    const [activeArrow, setActiveArrow] = useState<'prev' | 'next' | null>(null);
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <section className="container mx-auto px-4">
            <Headline
                subtitle='Team'
                title='Meet Our Team'
                description='The Majority Have Suffered Alteration In Some Form, By Injected Humour, Or Randomised Words Which Don&apos;t Look Even Slightly Believable.'
            />

            <div className="relative">
                <Swiper
                    spaceBetween={24}

                    loop={true}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }}
                    pagination={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        768: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                        1280: {
                            slidesPerView: 4,
                        },
                    }}
                    keyboard={true}
                    modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
                    className="mySwiper">
                    {teamMembers.map((member, index) => (
                        <SwiperSlide key={index}>
                            <div className="bg-white rounded-lg shadow-md overflow-hidden p-6 text-center h-full flex flex-col border border-red-400">
                                <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden mx-auto">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-lg"
                                    />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-1">{member.name}</h3>
                                <p className="text-gray-500 mb-4 flex-grow">{member.title}</p>
                                <div className="flex justify-center gap-3 mt-auto">
                                    <Link href={member.social.facebook} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                                        <Facebook className="w-5 h-5" />
                                    </Link>
                                    <Link href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="bg-blue-400 text-white p-2 rounded-full hover:bg-blue-500 transition-colors">
                                        <Twitter className="w-5 h-5" />
                                    </Link>
                                    <Link href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="bg-blue-700 text-white p-2 rounded-full hover:bg-blue-800 transition-colors">
                                        <Linkedin className="w-5 h-5" />
                                    </Link>
                                    <Link href={member.social.instagram} target="_blank" rel="noopener noreferrer" className="bg-pink-500 text-white p-2 rounded-full hover:bg-pink-600 transition-colors">
                                        <Instagram className="w-5 h-5" />
                                    </Link>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                {/* Custom Navigation Buttons */}
                <div
                    ref={prevRef}
                    className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 cursor-pointer">
                    <button
                        onClick={() => setActiveArrow('prev')}
                        className={`p-3 rounded-full shadow-md transition border ${activeArrow === 'prev' ? 'bg-red-500 text-white border-red-500' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}>
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                </div>

                <div
                    ref={nextRef}
                    className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 cursor-pointer">
                    <button
                        onClick={() => setActiveArrow('next')}
                        className={`p-3 rounded-full shadow-md transition border ${activeArrow === 'next' ? 'bg-red-500 text-white border-red-500' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}>
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default TeamSection;