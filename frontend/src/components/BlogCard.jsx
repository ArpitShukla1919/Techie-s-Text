import React from 'react';
import { Link } from "react-router-dom";

export const BlogCard = ({
  id,
  authorName,
  title,
  shortDescription,
  content,
  publishedDate,
}) => {
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();

    const getOrdinal = (n) => {
      if (n > 3 && n < 21) return 'th';
      switch (n % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };

    return `${day}${getOrdinal(day)} ${month}, ${year}`;
  }

  return (
    <Link to={`/blog/${id}`}>
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden m-4">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <Avatar name={authorName} size="medium" />
            <div className="ml-3">
              <div className="text-sm font-medium text-gray-900">{authorName}</div>
              <div className="text-xs text-gray-500">{formatDate(publishedDate)}</div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 hover:text-indigo-600 transition-colors duration-200">
            {title}
          </h2>
          <p className="text-gray-600 text-base mb-4 line-clamp-3">
            {shortDescription || "Short Description Missing"}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {`${Math.ceil(content.length / 100)} minute(s) read`}
            </span>
            <span className="text-sm text-indigo-600 font-medium hover:underline">
              Read More →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export function Circle() {
  return <div className="h-1.5 w-1.5 rounded-full bg-gray-400"></div>;
}

export function Avatar({ name, size = "small" }) {
  const sizeClasses = {
    small: "w-8 h-8 text-xs",
    medium: "w-10 h-10 text-sm",
    large: "w-12 h-12 text-base"
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden bg-indigo-100 rounded-full ${sizeClasses[size]}`}
    >
      <span className="font-medium text-xl text-indigo-600 uppercase">
        {name[0]}
      </span>
    </div>
  );
}