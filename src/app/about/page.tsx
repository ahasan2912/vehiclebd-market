import React from 'react';
import Image from 'next/image';

export const metadata = {
  title: 'About Us - Car Doctor & Bike Exchange',
  description: 'Learn about Car Doctor & Bike Exchange. Our mission, history, and what we offer.',
};

const AboutPage: React.FC = () => {
  return (
    <div className="bg-gray-100 py-32">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Who Are We?
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Car Doctor & Bike Exchange is your one-stop solution for all your vehicle-related services.
            We are committed to providing high-quality services to both car and bike customers.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16 bg-white p-8 rounded-lg shadow-md">
          <div className="md:order-1">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Our Mission & Vision
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our mission is to ensure the most reliable and efficient car and bike maintenance services for our customers.
              We maintain quality through the best use of technology and experienced mechanics.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our vision is to build a trusted brand in car care and bike exchange,
              capable of meeting the needs of every customer.
            </p>
          </div>
          <div className="md:order-2">
            <Image
              src="/assets/images/homeCarousel/2.jpg"
              alt="Our Mission"
              width={600}
              height={400}
              layout="responsive"
              className="rounded-lg shadow-lg"
            />
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Car Servicing</h3>
              <p className="text-gray-600">
                Regular servicing and repair of all types of cars by expert mechanics.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Bike Exchange</h3>
              <p className="text-gray-600">
                An easy and convenient process to buy a new bike by exchanging your old one.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Parts & Accessories</h3>
              <p className="text-gray-600">
                Genuine spare parts and high-quality accessories for cars and bikes.
              </p>
            </div>
          </div>
        </section>

        <section className="text-center bg-[#1a1a1a] text-white p-10 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-4">
            Contact Us Today!
          </h2>
          <p className="text-lg mb-6">
            To learn more about our services or to ask your questions, feel free to contact us.
          </p>
          <a
            href="/contact"
            className="inline-block bg-[#ff4500] text-white font-semibold py-3 px-8 rounded-full hover:bg-red-700 transition-colors duration-300 shadow-md"
          >
            Contact Us
          </a>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;