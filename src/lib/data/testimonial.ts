
export interface TestimonialData {
  image: string;
  name: string;
  title: string;
  quote: string;
  rating: number;
}

export const testimonials: TestimonialData[] = [
  {
    image: '/assets/images/client/1.avif',
    name: 'Awlad Hossain',
    title: 'Businessman',
    quote: 'There Are Many Variations Of Passages Of Lorem Ipsum Available, But The Majority Have Suffered Alteration In Some Form, By Injected Humour, Or Randomised Words Which Don&apos;t Look Even Slightly Believable.',
    rating: 5,
  },
  {
    image: '/assets/images/client/2.avif',
    name: 'Awlad Hossain',
    title: 'Businessman',
    quote: 'There Are Many Variations Of Passages Of Lorem Ipsum Available, But The Majority Have Suffered Alteration In Some Form, By Injected Humour, Or Randomised Words Which Don&apos;t Look Even Slightly Believable.',
    rating: 5,
  },
  {
    image: '/assets/images/client/3.avif',
    name: 'Jane Doe',
    title: 'Entrepreneur',
    quote: 'There Are Many Variations Of Passages Of Lorem Ipsum Available, But The Majority Have Suffered Alteration In Some Form, By Injected Humour, Or Randomised Words Which Don&apos;t Look Even Slightly Believable.',
    rating: 4,
  },
];