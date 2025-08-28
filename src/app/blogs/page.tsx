// app/blog/page.tsx
import { blogPosts } from '@/lib/data/blogData';
import React from 'react';
import BlogPostCard from './components/BlogPostCard';

export const metadata = {
  title: 'Our Blog - Car Doctor & Bike Exchange',
  description: 'Read our blog for tips, maintenance guides, and the latest news on car and bike care.',
};

const BlogPage: React.FC = () => {
  return (
    <div className="bg-gray-100 py-32">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <h1 className="text-5xl font-bold text-center text-gray-800 mb-12">Our Blog</h1>

        {blogPosts.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No blog posts found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;