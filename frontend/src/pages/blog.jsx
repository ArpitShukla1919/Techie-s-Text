import React from 'react'
import { Appbar } from "../components/Appbar";
import { FullBlog } from "../components/FullBlog";
import { Spinner } from "../components/Spinner";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";

export const Blog = () => {
  const { id } = useParams();
  const { loading, blog, error } = useBlog({
    id: id || "",
  });

  if (loading) {
    return (
      <div>
        <Appbar />
        <div className="h-screen flex flex-col justify-center">
          <div className="flex justify-center">
            <Spinner />
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

  if (!blog) {
    return (
      <div>
        <Appbar />
        <div className="h-screen flex flex-col justify-center items-center text-gray-500">
          Blog not found
        </div>
      </div>
    );
  }

  return (
    <div>
      <Appbar />
      <FullBlog blog={blog} />
    </div>
  );
};
