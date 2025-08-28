'use client';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Keyboard, Mousewheel, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import CustomSwiperSlide from './CustomSwiperSlide';

const HeroSlider = () => {
    const [activeBtn, setActiveBtn] = useState<'prev' | 'next' | null>(null);

    const handlePrevClick = () => {
        setActiveBtn('prev')
    }

    const handleNextClick = () => {
        setActiveBtn('next')
    }
    return (
        <div className="relative">
            <Swiper
                cssMode={false}
                navigation={{
                    nextEl: '.next-btn',
                    prevEl: '.prev-btn',
                }}
                pagination={true}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                keyboard={true}
                modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
                className="mySwiper flex flex-col justify-center items-center h-[75vh]"
            >
                <SwiperSlide>
                    <CustomSwiperSlide url={`/assets/images/homeCarousel/1.jpg`} />
                </SwiperSlide>
                <SwiperSlide>
                    <CustomSwiperSlide url={`/assets/images/homeCarousel/2.jpg`} />
                </SwiperSlide>
                <SwiperSlide>
                    <CustomSwiperSlide url={`/assets/images/homeCarousel/3.jpg`} />
                </SwiperSlide>
                <SwiperSlide>
                    <CustomSwiperSlide url={`/assets/images/homeCarousel/4.jpg`} />
                </SwiperSlide>
            </Swiper>
            {/* Custom Navigation Buttons */}
            <div className="absolute bottom-10 right-10 z-30 flex gap-4">
                <button onClick={handlePrevClick}
                    className={`prev-btn rounded-full p-3 transition ${activeBtn === 'prev'
                        ? 'bg-red-500 text-white'
                        : 'bg-white text-black hover:bg-gray-100'
                        }`}
                >
                    <ArrowLeft />
                </button>
                <button onClick={handleNextClick}
                    className={`next-btn rounded-full p-3 transition ${activeBtn === 'next'
                        ? 'bg-red-500 text-white'
                        : 'bg-white text-black hover:bg-gray-100'
                        }`}
                >
                    <ArrowRight />
                </button>
            </div>
        </div>
    );
};

export default HeroSlider;
