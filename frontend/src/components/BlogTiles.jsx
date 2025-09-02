import { useNavigate } from "react-router-dom";

const BlogTiles = ({ blogs = [], variant = "default" }) => {
  const navigate = useNavigate();

  const renderCard = (blog) => {
    switch (variant) {
      case "compact":
        return (
          <div
            key={blog.id}
            className="cursor-pointer border rounded-lg p-3 bg-gray-50 shadow-sm hover:shadow-md transition"
            onClick={() => navigate(`/blog/${blog.id}`)}
          >
            <h3 className="text-base font-medium">{blog.title}</h3>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(blog.updatedAt).toLocaleDateString()}
            </p>
          </div>
        );

      case "imageCard":
        return (
          <div
            key={blog.id}
            className="cursor-pointer flex flex-col sm:flex-row border rounded-2xl bg-white shadow-md hover:shadow-xl transition overflow-hidden"
            onClick={() => navigate(`/blog/${blog.id}`)}
          >
            {/* Thumbnail */}
            <div className="sm:w-1/3 w-full h-40 sm:h-auto">
              <img
                src={blog.thumbnail || "/placeholder.jpg"}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex-1 p-5 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {blog.shortDescription}
                </p>
              </div>

              {/* Footer */}
              <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                <span>{blog.author || "Admin"}</span>
                <span>{blog.date || "Just now"}</span>
              </div>
            </div>
          </div>
        );

      case "overlayCard":
        return (
          <div
            key={blog.id}
            onClick={() => navigate(`/blog/${blog.id}`)}
            className="relative flex flex-col cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-xl group h-full"
          >
            {/* Background Image */}
            <img
              src={blog.thumbnail || "/dashboard/placeholder.jpg"}
              alt={blog.title}
              className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 transition" />

            {/* Content */}
            <div className="absolute bottom-0 inset-x-0 p-5 text-white">
              <h3 className="text-lg font-semibold leading-snug mb-2 line-clamp-2">
                {blog.title}
              </h3>
              <p className="text-sm opacity-80">
                {blog.date
                  ? new Date(blog.date).toLocaleDateString()
                  : "07 days ago"}
              </p>
            </div>

            {/* Arrow Button */}
            <div className="absolute bottom-4 right-4 bg-white text-black w-9 h-9 rounded-full flex items-center justify-center shadow-md group-hover:bg-yellow-400 transition">
              →
            </div>
          </div>
        );

      default:
        return (
          <div
            key={blog.id}
            className="cursor-pointer border rounded-xl p-4 bg-white shadow hover:shadow-lg transition relative"
            onClick={() => navigate(`/blog/${blog.id}`)}
          >
            {/* Status Badge */}
            <span
              className={`absolute top-2 right-2 text-xs px-2 py-1 rounded-full font-medium ${
                blog.status === "PUBLISHED"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {blog.status === "PUBLISHED" ? "Published" : "Draft"}
            </span>

            <h3 className="text-lg font-semibold">{blog.title}</h3>
            <p className="text-gray-600">{blog.shortDescription}</p>
            <p className="text-sm text-gray-400 mt-2">
              Last updated: {new Date(blog.updatedAt).toLocaleDateString()}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation(); // prevent parent card click
                navigate(`/publish/${blog.id}`);
              }}
              className="px-3 py-1 mt-4 bg-green-800 text-white rounded-xl hover:bg-green-900 transition"
            >
              Edit Post
            </button>
          </div>
        );
    }
  };

  const wrapperClass =
    variant === "overlayCard"
      ? "grid grid-cols-1 sm:grid-cols-3 gap-6"
      : "grid gap-4";

  return <div className={wrapperClass}>{blogs.map(renderCard)}</div>;
};

export default BlogTiles;
