import React, { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import BlogTiles from "../components/BlogTiles";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { BACKEND_URL } from "../config";

const Dashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { setUser } = useUser();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = storedUser?.token;

    if (!token) {
      navigate("/signin");
      return;
    }

    const fetchProfile = async () => {
      try {
        const blogsRes = await fetch(`${BACKEND_URL}/api/v1/blog/users/posts`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        if (!blogsRes.ok) throw new Error("Failed to fetch blogs");
        const blogsData = await blogsRes.json();
        setBlogs(blogsData.blogs || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate, setUser]);

  const publishedBlogs = blogs.filter((blog) => blog.status === "PUBLISHED");
  const draftBlogs = blogs.filter((blog) => blog.status === "DRAFT");

  return (
    <>
      <Appbar />
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Published Blogs Section */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Published Blogs</h2>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : publishedBlogs.length > 0 ? (
          <div className="w-full mb-8">
            <BlogTiles blogs={publishedBlogs} variant="overlayCard" />
          </div>
        ) : (
          <p className="text-gray-500 mb-8">No published blogs yet ✍️</p>
        )}

        {/* Draft Posts Section */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Draft Posts</h2>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : draftBlogs.length > 0 ? (
          <div className="w-full">
            <BlogTiles blogs={draftBlogs} variant="overlayCard" />
          </div>
        ) : (
          <p className="text-gray-500">No draft posts yet ✍️</p>
        )}
      </div>
    </>
  );
};

export default Dashboard;