import React, { useState, useEffect } from "react";
import { Appbar } from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const data = localStorage.getItem("user");
  const parsedData = JSON.parse(data);
  const token = parsedData?.token;

  useEffect(() => {
    if (!id) return;
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
          headers: { Authorization: token },
        });
        const blog = res.data.blog;
        if (blog) {
          setTitle(blog.title || "");
          setShortDesc(blog.shortDescription || "");
          setDescription(blog.content || "");
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id, token]);

  const handleSave = async (isDraft) => {
    try {
      if (id) {
        await axios.put(
          `${BACKEND_URL}/api/v1/blog/${id}`,
          {
            title,
            shortDescription: shortDesc,
            content: description,
            status: isDraft ? "DRAFT" : "PUBLISHED",
          },
          { headers: { Authorization: token } }
        );
        alert("Blog updated ✅");
        navigate(`/blog/${id}`);
      } else {
        const res = await axios.post(
          `${BACKEND_URL}/api/v1/blog`,
          {
            title,
            shortDescription: shortDesc,
            content: description,
            status: isDraft ? "DRAFT" : "PUBLISHED",
          },
          { headers: { Authorization: token } }
        );
        navigate(`/blog/${res.data.id}`);
      }
    } catch (err) {
      console.error("Error saving blog:", err);
      alert("Failed ❌");
    }
  };

  if (loading) return <p className="p-5 text-center">Loading...</p>;

  return (
    <div>
      <Appbar />
      <div className="flex justify-center w-full pt-8">
        <div className="max-w-screen-lg w-full space-y-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title"
            className="w-full bg-gray-50 border rounded-lg p-2.5"
          />
          <input
            value={shortDesc}
            onChange={(e) => setShortDesc(e.target.value)}
            type="text"
            placeholder="Short description"
            className="w-full bg-gray-50 border rounded-lg p-2.5"
          />
          <TextEditor value={description} onChange={setDescription} />

          <div className="flex gap-4 mt-4">
            <button
              onClick={() => handleSave(true)}
              className="px-5 py-2.5 bg-gray-200 rounded-lg"
            >
              Save as Draft
            </button>
            <button
              onClick={() => handleSave(false)}
              className="px-5 py-2.5 bg-blue-700 text-white rounded-lg"
            >
              {id ? "Update Post" : "Publish Post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function TextEditor({ value, onChange }) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["code-block"],
      ["clean"],
    ],
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "code-block",
  ];

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
      className="bg-white border rounded-lg"
      style={{ minHeight: "300px" }}
    />
  );
}
