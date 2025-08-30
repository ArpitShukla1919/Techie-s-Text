import React, { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { BACKEND_URL } from "../config";
import ProfileForm from "../components/Forms/ProfileForm";
import BlogTiles from "../components/BlogTiles";

export const Profile = () => {
  const [profile, setProfile] = useState(null);
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
        // fetch profile
        const res = await fetch(`${BACKEND_URL}/api/v1/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const data = await res.json();

        setProfile({
          name: data.name,
          username: data.username,
          about: data.about,
          password: "",
        });
        const newUserData = { ...data, token };
        localStorage.setItem("user", JSON.stringify(newUserData));
        setUser(newUserData);

        // fetch blogs of this user
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
        console.error("Error fetching profile:", err);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate, setUser]);

  const handleChange = (e) => {
    if (!profile) return;
    const { name, value } = e.target;
    setProfile((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!profile) return;

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = storedUser?.token;
    if (!token) return;

    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/user/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: profile.name,
          password: profile.password || undefined,
          about: profile.about,
        }),
      });

      if (!res.ok) throw new Error("Failed to update profile");
      const updated = await res.json();
      alert("Profile updated successfully ✅");
      setProfile((prev) => (prev ? { ...prev, password: "" } : prev));
      const newUser = {
        username: profile.username,
        name: updated.name,
        about: updated.about,
        token,
      };
      localStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Error updating profile ❌");
    }
  };

  if (loading) {
    return (
      <div>
        <Appbar />
        <div className="flex justify-center items-center h-64">
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div>
        <Appbar />
        <div className="flex justify-center items-center h-64">
          <p>No profile data found ❌</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Appbar />
      <div className="flex max-w-7xl mx-auto flex-col md:flex-row justify-center gap-6 p-6">
        {/* Profile Form */}
        <div className="w-full md:w-1/3 bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Edit Profile
          </h2>
          <ProfileForm
            handleSubmit={handleSubmit}
            profile={profile}
            setProfile={setProfile}
            handleChange={handleChange}
          />
        </div>

        {/* Blog Tiles */}
        <div className="w-full md:w-2/3">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">My Blogs</h2>
          {blogs.length > 0 ? (
            <BlogTiles blogs={blogs} />
          ) : (
            <p className="text-gray-500">No blogs written yet ✍️</p>
          )}
        </div>
      </div>
    </div>
  );
};
