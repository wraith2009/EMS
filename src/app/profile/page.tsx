"use client";
import React, { useState, FormEvent } from "react";
import axios from "axios";
import { FileUpload } from "@/src/components/ui/file-upload";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { User, Camera } from "lucide-react";

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
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
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

  const handleFileChange = (file: File) => {
    setAvatar(file);
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-gradient-to-r from-gray-100 via-white to-gray-100 rounded-lg shadow-xl mt-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Update Profile</h1>
        <p className="text-sm text-gray-500">Keep your profile up-to-date.</p>
      </div>
      {message && (
        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md">
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <div className="relative">
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ff6f61] focus:border-transparent transition duration-200"
              placeholder="Enter your name"
            />
            <User className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>

        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ff6f61] focus:border-transparent transition duration-200"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <PhoneInput
            defaultCountry="in"
            value={phoneNumber}
            onChange={(phone) => setPhoneNumber(phone)}
            className="w-full"
            inputClassName="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ff6f61] focus:border-transparent transition duration-200"
          />
        </div>

        <div>
          <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 mb-1">
            Avatar
          </label>
          <div className="flex items-center space-x-4">
            <div className="relative w-20 h-20 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
              {avatar ? (
                <img
                  src={URL.createObjectURL(avatar)}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Camera className="text-gray-400 w-8 h-8" />
              )}
            </div>
            <FileUpload onChange={handleFileChange} />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-[#ff6f61] to-[#ff4a45] text-white font-semibold rounded-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff6f61] transition duration-300"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
