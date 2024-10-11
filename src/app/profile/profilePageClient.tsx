"use client";
import React, { useState, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ProfileSchema,
  ProfileSchemaType,
} from "@/src/lib/validators/auth.validator";
import axios from "axios";

const ProfileVerificationPage: React.FC = () => {
  const [avatar, setAvatar] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");

  // Initialize react-hook-form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileSchemaType>({
    resolver: zodResolver(ProfileSchema),
  });

  const onSubmit = async (data: ProfileSchemaType) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("gender", data.gender);
    formData.append("phoneNumber", data.phoneNumber);
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Verify Your Profile
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Please complete your profile details for verification
        </p>

        {message && (
          <p className="text-center mb-4 text-green-600">{message}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              {...register("name")}
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-lg shadow-sm focus:ring-primary-red focus:border-primary-red sm:text-sm`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
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
              {...register("gender")}
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.gender ? "border-red-500" : "border-gray-300"
              } rounded-lg shadow-sm focus:ring-primary-red focus:border-primary-red sm:text-sm`}
            />
            {errors.gender && (
              <p className="mt-1 text-sm text-red-600">
                {errors.gender.message}
              </p>
            )}
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
              {...register("phoneNumber")}
              className={`mt-1 block w-full px-4 py-2 border ${
                errors.phoneNumber ? "border-red-500" : "border-gray-300"
              } rounded-lg shadow-sm focus:ring-primary-red focus:border-primary-red sm:text-sm`}
            />
            {errors.phoneNumber && (
              <p className="mt-1 text-sm text-red-600">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="avatar"
              className="block text-sm font-medium text-gray-700"
            >
              Upload Avatar
            </label>
            <input
              id="avatar"
              type="file"
              onChange={handleFileChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-primary-red text-white font-bold rounded-lg hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-primary-red transition-all"
          >
            Submit for Verification
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileVerificationPage;
