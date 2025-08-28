'use client';

import React, { useState } from 'react'; 
import Headline from '../shared/Headline';
import { features } from '@/lib/data/chooseData';

const ChooseUsSection = () => {
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const handleCardClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="container mx-auto px-4 py-30">
      <Headline
        subtitle="Core Features"
        title="Why Choose Us"
        description="The Majority Have Suffered Alteration In Some Form, By Injected Humour, Or Randomised Words Which Don&apos;t Look Even Slightly Believable."
      />

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-12">
        {features.map((feature, index) => {
          const isActive = index === activeIndex;
          const cardBg = isActive ? feature.activeBg : feature.defaultBg;
          const cardIconBg = isActive ? feature.activeBg : feature.defaultBg;
          const iconColor = isActive ? feature.activeColor : feature.defaultColor;

          return (
            <div
              key={index}
              className={`flex flex-col items-center justify-center p-6 rounded-lg shadow-sm text-center transform transition-all duration-300 ease-in-out cursor-pointer
              ${cardBg} ${feature.hoverBg} // Apply card background and hover effect
            `}
              onClick={() => handleCardClick(index)} // Add onClick handler
            >
              <div className={`w-16 h-16 flex items-center justify-center rounded-lg mb-4 ${cardIconBg}`}>
                <feature.icon className={`w-8 h-8 ${iconColor}`} />
              </div>
              <h3 className={`text-lg font-semibold ${isActive ? 'text-white' : 'text-gray-800'}`}>
                {feature.title}
              </h3>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ChooseUsSection;