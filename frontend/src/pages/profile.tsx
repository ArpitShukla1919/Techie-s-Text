import { useEffect, useState } from "react";
import { Appbar } from "../components/Appbar";

// Update the interface to match the API response
interface ProfileData {
  name: string;
  username: string; // Changed from 'email' to 'username' to match API response
  about: string;
  password?: string; // Made optional since API doesn't return it
}

export const Profile = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:8787/api/v1/user/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }
        const data = await res.json();
        console.log("Profile data:", data);
        // Set profile data and stop loading
        setProfile({
          name: data.name,
          username: data.username, // Map 'username' from API to interface
          about: data.about,
          password: "", // Initialize password as empty since not provided by API
        });
        setLoading(false); // Stop loading
      } catch (err) {
        console.error("Error fetching profile:", err);
        setLoading(false); // Stop loading even on error
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!profile) return;
    const { name, value } = e.target;
    setProfile((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  // Update profile via PUT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    try {
      const res = await fetch("http://localhost:8787/api/v1/user/profile", { // Fixed URL to match fetch
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: profile.name,
          password: profile.password || undefined,
          about: profile.about,
        }),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      const data = await res.json();
      alert("Profile updated successfully ✅");
      setProfile((prev) =>
        prev ? { ...prev, password: "" } : prev // Clear password field after update
      );
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
      <div className="flex justify-center p-6">
        <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Edit Profile
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-gray-700 font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            {/* Username (read-only) */}
            <div>
              <label className="block text-gray-700 font-medium">Username</label>
              <input
                type="text"
                value={profile.username} // Changed from 'email' to 'username'
                disabled
                className="w-full p-2 border rounded-lg bg-gray-100 text-gray-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 font-medium">
                New Password
              </label>
              <input
                type="password"
                name="password"
                value={profile.password || ""} // Handle undefined password
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>

            {/* About */}
            <div>
              <label className="block text-gray-700 font-medium">About</label>
              <textarea
                name="about"
                value={profile.about}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg h-24"
              />
            </div>

            {/* Save Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};