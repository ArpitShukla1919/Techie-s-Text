import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const useBlog = ({ id }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const data= localStorage.getItem("user");
    const parsedData = JSON.parse(data);
    const token = parsedData.token
    if (!token) {
      setError("❌ You are not logged in");
      setLoading(false);
      return;
    }

    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setBlog(response.data.blog);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 401 || err.response.status === 403) {
            setError("❌ You are not logged in");
          } else if (err.response.status === 404) {
            setError("❌ Blog not found");
          } else {
            setError("❌ Something went wrong");
          }
        } else {
          setError("❌ Network error");
        }
        setLoading(false);
      });
  }, [id]);

  return {
    loading,
    blog,
    error,
  };
};

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    const data= localStorage.getItem("user");
    const parsedData = JSON.parse(data);
    const token = parsedData.token
    console.log(data,"55555555555");
    
    if (!token) {
      setError("❌ You are not logged in");
      setLoading(false);
      return;
    }

    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setBlogs(response.data.blogs);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 401 || err.response.status === 403) {
            setError("❌ You are not logged in");
          } else {
            setError("❌ Something went wrong");
          }
        } else {
          setError("❌ Network error");
        }
        setLoading(false);
      });
  }, []);

  return {
    loading,
    blogs,
    error,
  };
};
