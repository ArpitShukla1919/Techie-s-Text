import React from 'react'
import { Appbar } from "./Appbar";
import { Avatar } from "./BlogCard";

// Helper function to format the date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();

  // Get day suffix (st, nd, rd, th)
  const suffix = (day) => {
    if (day >= 11 && day <= 13) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${day}${suffix(day)} ${month}, ${year}`;
};

export const FullBlog = ({ blog }) => {
  return (
    <div>
      {/* <Appbar /> */}
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 gap-x-8 w-full max-w-screen-xl pt-12">
          <div className="col-span-8">
            <div className="text-4xl font-bold">{blog.title}</div>
            <div className="text-slate-500 pt-2">
              Posted on {formatDate(blog.updatedAt)}
            </div>
            <div
              className="pt-4 prose max-w-none"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
          <div className="col-span-4">
            <div className="text-slate-600 text-lg">Author</div>
            <div className="flex w-full">
              <div className="pr-4 flex flex-col justify-center">
                <Avatar size="medium" name={blog.author.name || "Anonymous"} />
              </div>
              <div>
                <div className="text-xl font-bold">
                  {blog.author.name || "Anonymous"}
                </div>
                <div className="pt-2 text-slate-500">
                  {blog.author.about || "Fresh to start"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
