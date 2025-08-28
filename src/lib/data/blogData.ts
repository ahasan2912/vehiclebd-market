
export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  imageUrl: string;
  slug: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: '10 Easy Tips to Keep Your Car Engine Healthy',
    date: 'July 21, 2024',
    excerpt: 'Follow these simple tips to ensure your car\'s engine lasts longer and maintains good performance. Regular maintenance is crucial.',
    imageUrl: '/assets/images/blog/1.avif',
    slug: '10-easy-engine-tips',
  },
  {
    id: '2',
    title: 'Complete Guide to Bike Tire Maintenance',
    date: 'July 18, 2024',
    excerpt: 'Your bike tires are extremely important for your safety. Improve your bike\'s performance with proper tire pressure and regular inspection.',
    imageUrl: '/assets/images/blog/2.avif',
    slug: 'bike-tire-maintenance-guide',
  },
  {
    id: '3',
    title: 'Car Brake System: When to Change?',
    date: 'July 15, 2024',
    excerpt: 'Understand the functionality of your car\'s brake system and learn when to replace brake pads or discs.',
    imageUrl: '/assets/images/blog/3.avif',
    slug: 'car-brake-system-when-to-change',
  },
  {
    id: '4',
    title: 'The Future of Electric Bikes: New Technologies and Trends',
    date: 'July 10, 2024',
    excerpt: 'Discover how the rapidly growing market of electric bikes and new technological innovations are changing the biking experience.',
    imageUrl: '/assets/images/blog/4.avif',
    slug: 'future-of-electric-bikes',
  },
];