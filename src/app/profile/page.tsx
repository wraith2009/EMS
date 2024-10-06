"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

const Profile: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("gender", gender);
    formData.append("phoneNumber", phoneNumber);
    if (avatar) formData.append("avatar", avatar);

    try {
      const response = await axios.post("/api/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true, // Include cookies for authentication
      });

      if (response.status === 200) {
        setMessage("Profile updated successfully");
      } else {
        setMessage("Failed to update profile");
      }
    } catch (error) {
      setMessage("Error updating profile");
      console.error("Error:", error);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setAvatar(file);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Update Profile</h1>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700"
          >
            Gender
          </label>
          <input
            id="gender"
            type="text"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            id="phoneNumber"
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="avatar"
            className="block text-sm font-medium text-gray-700"
          >
            Avatar
          </label>
          <input
            id="avatar"
            type="file"
            onChange={handleFileChange}
            className="mt-1 block w-full"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
