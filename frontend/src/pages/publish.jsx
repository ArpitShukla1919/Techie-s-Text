import React, { useState } from "react";
import { Appbar } from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css"; // Quill styles

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const data = localStorage.getItem("user");
  const parsedData = JSON.parse(data);
  const token = parsedData?.token;

  const handlePublish = async (isDraft) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        {
          title,
          shortDescription: shortDesc,
          content: description,
          status: isDraft ? "DRAFT" : "PUBLISHED",
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (isDraft) {
        alert("Blog saved as draft ✅");
        navigate("/profile");
      } else {
        navigate(`/blog/${response.data.id}`);
      }
    } catch (err) {
      console.error("Error publishing blog:", err);
      alert("Failed to publish blog ❌");
    }
  };

  return (
    <div>
      <Appbar />
      <div className="flex justify-center w-full pt-8">
        <div className="max-w-screen-lg w-full space-y-4">
          {/* Title input */}
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            placeholder="Title"
          />

          {/* Short description input */}
          <input
            onChange={(e) => setShortDesc(e.target.value)}
            type="text"
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                       focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            placeholder="Short description (for preview cards)"
          />

          {/* Quill Editor */}
          <TextEditor onChange={(value) => setDescription(value)} />

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => handlePublish(true)}
              type="button"
              className="inline-flex items-center px-5 py-2.5 text-sm font-medium 
                         text-center text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 
                         focus:ring-4 focus:ring-gray-100"
            >
              Save as Draft
            </button>

            <button
              onClick={() => handlePublish(false)}
              type="button"
              className="inline-flex items-center px-5 py-2.5 text-sm font-medium 
                         text-center text-white bg-blue-700 rounded-lg 
                         focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
            >
              Publish Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Quill Editor Component */
function TextEditor({ onChange }) {
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
      modules={modules}
      formats={formats}
      onChange={onChange}
      className="bg-white rounded-lg border border-gray-300"
      style={{ minHeight: "300px" }}
    />
  );
}
