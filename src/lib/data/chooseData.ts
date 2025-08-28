import { Users, Clock, Headset, Settings, ShieldCheck, Truck, LucideIcon } from 'lucide-react';

export interface FeaturesData {
  icon: LucideIcon;
  title: string;
  defaultColor: string;
  defaultBg: string;
  hoverBg: string;
  activeColor: string;
  activeBg: string;
}

export const features: FeaturesData[] = [
  {
    icon: Users,
    title: 'Expert Team',
    defaultColor: 'text-gray-800',
    defaultBg: 'bg-white',
    hoverBg: 'hover:bg-gray-100',
    activeColor: 'text-white',
    activeBg: 'bg-red-500', 
  },
  {
    icon: Clock,
    title: 'Timely Delivery',
    defaultColor: 'text-gray-800', 
    defaultBg: 'bg-white', 
    hoverBg: 'hover:bg-gray-100',
    activeColor: 'text-white',
    activeBg: 'bg-red-500',
  },
  {
    icon: Headset,
    title: '24/7 Support',
    defaultColor: 'text-gray-800',
    defaultBg: 'bg-white',
    hoverBg: 'hover:bg-gray-100',
    activeColor: 'text-white',
    activeBg: 'bg-red-500',
  },
  {
    icon: Settings,
    title: 'Best Equipment',
    defaultColor: 'text-gray-800',
    defaultBg: 'bg-white',
    hoverBg: 'hover:bg-gray-100',
    activeColor: 'text-white',
    activeBg: 'bg-red-500',
  },
  {
    icon: ShieldCheck,
    title: '100% Guaranty',
    defaultColor: 'text-gray-800',
    defaultBg: 'bg-white',
    hoverBg: 'hover:bg-gray-100',
    activeColor: 'text-white',
    activeBg: 'bg-red-500',
  },
  {
    icon: Truck,
    title: 'Timely Delivery',
    defaultColor: 'text-gray-800',
    defaultBg: 'bg-white',
    hoverBg: 'hover:bg-gray-100',
    activeColor: 'text-white',
    activeBg: 'bg-red-500',
  },
];