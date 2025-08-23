import { useState, useRef, useEffect } from "react";
import { Avatar } from "./BlogCard";
import { Link, useNavigate } from "react-router-dom";

const avname: string = localStorage.getItem("name") || "Guest";

export const Appbar = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/signin");
  };

  return (
    <div className="max-w-7xl mx-auto border-b flex items-center justify-between px-4 py-4 relative">
      <Link to={"/blogs"} className="flex flex-col justify-center cursor-pointer">
        <img src="/mind.png" className="h-16" />
      </Link>

      <div className="flex items-center gap-4">
        <Link to={`/publish`}>
          <button
            type="button"
            className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center"
          >
            New
          </button>
        </Link>

        {/* Avatar + Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div onClick={() => setOpen(!open)} className="cursor-pointer">
            <Avatar size={"big"} name={avname} />
          </div>

          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-10">
              <Link
                to="/profile"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                My Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
