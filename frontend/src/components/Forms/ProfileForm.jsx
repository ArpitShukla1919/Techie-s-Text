import React from "react";

const ProfileForm = ({handleSubmit,profile,handleChange}) => {
  return (
    <div>
      {" "}
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
        <div>
          <label className="block text-gray-700 font-medium">Username</label>
          <input
            type="text"
            value={profile.username}
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
            value={profile.password || ""}
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
  );
};

export default ProfileForm;
