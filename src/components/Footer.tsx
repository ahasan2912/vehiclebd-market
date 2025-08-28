'use client';
import Link from 'next/link';
import {
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Search,
    CircleUserRound,
} from "lucide-react";
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const LucideIconMap: { [key: string]: React.ElementType } = {
    Facebook: Facebook,
    Twitter: Twitter,
    Instagram: Instagram,
    Linkedin: Linkedin,
    Search: Search,
    CircleUserRound: CircleUserRound,
};

interface SocialIconProps {
    name: string;
    href: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ name, href }) => {
    const IconComponent = LucideIconMap[name];

    if (!IconComponent) {
        console.warn(`Lucide icon '${name}' not found.`);
        return null;
    }

    return (
        <Link
            href={href}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-[#333333] hover:bg-[#ff4500] transition-colors duration-300"
            aria-label={`${name} link`}
        >
            <IconComponent className="w-5 h-5 text-white" />
        </Link>
    );
};

export default function Footer() {
    const pathname = usePathname();
    const aboutLinks = [
        { label: 'Home', href: '#' },
        { label: 'Service', href: '#' },
        { label: 'Contact', href: '#' },
    ];
    const companyLinks = [
        { label: 'Why Car Doctor', href: '#' },
        { label: 'About', href: '#' },
    ];
    const supportLinks = [
        { label: 'Support Center', href: '#' },
        { label: 'Feedback', href: '#' },
        { label: 'Accessibility', href: '#' },
    ];
    const socialIconsData = [
        { name: 'Search', href: '#' },
        { name: 'Twitter', href: '#' },
        { name: 'Instagram', href: '#' },
        { name: 'Linkedin', href: '#' },
    ];

    if(!pathname.includes('dashboard')) {
        return (
            <footer className="bg-[#e1dada7a] text-gray-800 py-16 px-4 md:px-8 lg:px-16">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
                    {/* Logo & Description */}
                    <div className="md:col-span-2 lg:col-span-2 pr-4 md:pr-8 mb-10 md:mb-0">
                        <div className="flex items-center mb-6">
                            {/* Using an image for the gear logo */}
                            <Link href="/">
                                <Image src={'/assets/logo.svg'} alt="Car Doctor" width={140} height={100} />
                            </Link>
                        </div>
                        <p className="text-base text-gray-800 leading-relaxed mb-6 ml-3">
                            Edwin Diaz is a software and web technologies engineer, a life coach trainer who is also a serial.
                        </p>
                        <div className="flex space-x-3">
                            {socialIconsData.map((icon, index) => (
                                <SocialIcon key={index} name={icon.name} href={icon.href} />
                            ))}
                        </div>
                    </div>

                    {/* About Section */}
                    <div className="mb-10 md:mb-0">
                        <h3 className="text-xl font-semibold mb-6">About</h3>
                        <ul className="space-y-4 text-base">
                            {aboutLinks.map((link, index) => (
                                <li key={index}>
                                    <Link href={link.href} className="text-gray-800 hover:text-[#ff4500] transition-colors duration-300">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Section */}
                    <div className="mb-10 md:mb-0">
                        <h3 className="text-xl font-semibold mb-6">Company</h3>
                        <ul className="space-y-4 text-base">
                            {companyLinks.map((link, index) => (
                                <li key={index}>
                                    <Link href={link.href} className="text-gray-800 hover:text-[#ff4500] transition-colors duration-300">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Section */}
                    <div className="mb-10 md:mb-0">
                        <h3 className="text-xl font-semibold mb-6">Support</h3>
                        <ul className="space-y-4 text-base">
                            {supportLinks.map((link, index) => (
                                <li key={index}>
                                    <Link href={link.href} className="text-gray-800 hover:text-[#ff4500] transition-colors duration-300">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </footer>
        );
    } else {
        return <></>
    }
}