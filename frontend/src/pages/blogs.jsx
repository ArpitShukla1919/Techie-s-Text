import React from 'react'
import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const { loading, blogs, error } = useBlogs();

  if (loading) {
    return (
      <div>
        <Appbar />
        <div className="flex justify-center">
          <div>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Appbar />
        <div className="h-screen flex flex-col justify-center items-center text-red-500 font-semibold">
          {error}
        </div>
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div>
        <Appbar />
        <div className="h-screen flex flex-col justify-center items-center text-gray-500">
          No blogs available
        </div>
      </div>
    );
  }

  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="w-full max-w-2xl">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              authorName={blog.author.name || "Anonymous"}
              title={blog.title}
              content={blog.content}
              shortDescription={blog.shortDescription}
              publishedDate={blog.updatedAt}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
