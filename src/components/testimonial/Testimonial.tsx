'use client';
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Star, Quote, ArrowRight, ArrowLeft } from 'lucide-react';
import Headline from '../shared/Headline';
import 'swiper/css';
import { Navigation, Pagination, Mousewheel, Autoplay, Keyboard } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { testimonials } from '@/lib/data/testimonial';



const TestimonialSection = () => {
  const [activeArrow, setActiveArrow] = useState<'prev' | 'next' | null>(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="container mx-auto px-4 pb-30">
      <Headline
        subtitle='Testimonial'
        title='What Customer Says'
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
              slidesPerView: 1,
            },
            1024: {
              slidesPerView: 2,
            },
            1280: {
              slidesPerView: 2,
            },
          }}
          keyboard={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
          className="mySwiper">
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-lg shadow-sm p-8 flex flex-col items-start h-full relative border border-gray-200">
                <div className="flex items-center mb-4 w-full">
                  <div className="relative w-16 h-16 rounded-full mr-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={50}
                      height={50}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{testimonial.name}</h3>
                    <p className="text-gray-500 text-sm">{testimonial.title}</p>
                  </div>
                  {/* Quote Icon - positioned absolutely for design flexibility */}
                  <div className="absolute top-8 right-8 text-red-300 opacity-50">
                    <Quote className="w-16 h-16 transform scale-x-[1]" /> {/* Flipped horizontally */}
                  </div>
                </div>
                <p className="text-gray-600 mb-4 flex-grow">{testimonial.quote}</p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-orange-400 fill-orange-400' : 'text-gray-300'}`}
                    />
                  ))}
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

export default TestimonialSection;
