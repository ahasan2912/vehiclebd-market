// components/BlogPostCard.tsx
import { BlogPost } from '@/lib/data/blogData';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative w-full h-48">
        <Image
          src={post.imageUrl}
          alt={post.title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          <Link href={`/blog/${post.slug}`} className="hover:text-[#ff4500] transition-colors duration-200">
            {post.title}
          </Link>
        </h3>
        <p className="text-sm text-gray-500 mb-4">{post.date}</p>
        <p className="text-gray-600 text-base mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        <Link href={`/blogs`} className="inline-flex items-center text-[#ff4500] hover:text-red-700 font-medium transition-colors duration-200">
          Read More
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default BlogPostCard;