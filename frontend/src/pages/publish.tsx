import { Appbar } from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <Appbar />
      <div className="flex justify-center w-full pt-8">
        <div className="max-w-screen-lg w-full space-y-4">
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            placeholder="Title"
          />
          <input
            onChange={(e) => setShortDesc(e.target.value)}
            type="text"
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            placeholder="Short description (for preview cards)"
          />
          <TextEditor onChange={(value) => setDescription(value)} />
          <button
            onClick={async () => {
              const response = await axios.post(
                `${BACKEND_URL}/api/v1/blog`,
                {
                  title,
                  shortDescription:shortDesc,
                  content: description,
                },
                {
                  headers: {
                    Authorization: localStorage.getItem("token"),
                  },
                }
              );
              navigate(`/blog/${response.data.id}`);
            }}
            type="submit"
            className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          >
            Publish post
          </button>
        </div>
      </div>
    </div>
  );
};

function TextEditor({ onChange }: { onChange: (value: string) => void }) {
  return (
    <Editor
      apiKey="ym2q1u09mz79hd3hvzz9shham0bkuxa89i9pabahnyyy7omy"
      init={{
        height: 300,
        menubar: false,
        plugins: "lists link image code",
        toolbar:
          "undo redo | bold italic | bullist numlist | link image | code",
      }}
    //@ts-ignore
      onEditorChange={(content) => onChange(content)}
    />
  );
}
