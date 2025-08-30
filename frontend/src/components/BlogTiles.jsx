import { useNavigate } from "react-router-dom";

const BlogTiles = ({ blogs = [] }) => {
  const navigate = useNavigate();

  return (
    <div className="grid gap-4">
      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="cursor-pointer border rounded-xl p-4 bg-white shadow hover:shadow-lg transition relative"
          onClick={() => navigate(`/blog/${blog.id}`)} // 👈 navigate to blog detail
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
        </div>
      ))}
    </div>
  );
};

export default BlogTiles;
