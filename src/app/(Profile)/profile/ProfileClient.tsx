"use client";

import React, { useState, FormEvent } from "react";
import axios from "axios";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { User } from "lucide-react";
import GradualSpacing from "@/src/components/magicui/gradual-spacing";
import { Message, Loader, useToaster } from "rsuite";
import AvatarIcon from "@rsuite/icons/legacy/Avatar";
import Particles from "@/src/components/ui/particles";
import Image from "next/image";

type PreviewFileCallback = (result: string | ArrayBuffer | null) => void;

function previewFile(file: File, callback: PreviewFileCallback) {
  const reader = new FileReader();
  reader.onloadend = () => {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
}

const Profile: React.FC = () => {
  const toaster = useToaster();
  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploading(true);
      previewFile(file, (value) => {
        setAvatar(value as string);
        setUploading(false);
        toaster.push(
          <Message type="success">Image selected successfully</Message>,
        );
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("gender", gender);
    formData.append("phoneNumber", phoneNumber);
    if (avatar) {
      // Convert base64 to blob and append to formData
      const response = await fetch(avatar);
      const blob = await response.blob();
      formData.append("avatar", blob, "avatar.jpg");
    }

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

  return (
    <div className="flex justify-between">
      {/* Left side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center h-[100vh] ">
        <div className="w-full p-8 bg-[#F0F0F5] h-[100vh] px-32 flex flex-col justify-center ">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary-red mb-2 ">
              Update Profile
            </h1>
            <p className="text-sm text-primary-red">
              Keep your profile up-to-date.
            </p>
          </div>
          {message && (
            <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* Avatar section */}
            <div className="flex flex-col ">
              <div className="relative w-32 h-32 mx-auto cursor-pointer">
                {uploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-75 rounded-full">
                    <Loader />
                  </div>
                )}
                {avatar ? (
                  <img
                    src={avatar}
                    alt="Avatar preview"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-full">
                    <AvatarIcon style={{ fontSize: 48 }} />
                  </div>
                )}
                <input
                  type="file"
                  id="avatar"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>

            {/* Name input */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <div className="relative">
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ff6f61] focus:border-transparent transition duration-200 focus:outline-none"
                  placeholder="Enter your name"
                />
                <User className="absolute left-3 top-2.5 text-gray-400" />
              </div>
            </div>

            {/* Gender input */}
            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Gender
              </label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#ff6f61] focus:border-transparent transition duration-200 focus:outline-none"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Phone number input */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
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

            {/* Submit button */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-[#ff6f61] to-[#ff4a45] text-white font-semibold rounded-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff6f61] transition duration-300"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>

      {/* Right side */}
      <div className="hidden w-1/2 lg:flex lg:flex-col">
        <Particles
          className="absolute inset-0 "
          quantity={100}
          ease={80}
          color="#ff6f61"
          size={0.8}
          refresh
        />
        <div className="flex-grow flex items-center justify-center text-primary-red text-3xl font-semibold h-1/3 bg-white">
          <GradualSpacing text="Enhance your experience with streamlined|tools for effortless control and customization" />
        </div>
        <div className="h-2/3">
          <div className="bg-[url('https://res.cloudinary.com/dhrbg2jbi/image/upload/c_pad,ar_16:9/v1728922778/AI_Generated_Image_2024-10-14_466618629025201_ribt8v.jpg')] bg-cover bg-no-repeat h-full w-full  ">
            <div className="flex items-end justify-center h-full ">
              <div className="flex items-center pb-8 justify-center gap-4">
                <Image
                  src={
                    "https://res.cloudinary.com/dhrbg2jbi/image/upload/v1728935936/linkedin-app-icon_riwyqy.svg"
                  }
                  width={32}
                  height={32}
                  alt="linkedin"
                />
                <Image
                  src={
                    "https://res.cloudinary.com/dhrbg2jbi/image/upload/v1728935838/reddit-icon_q9ik8c.svg"
                  }
                  width={32}
                  height={32}
                  alt="reddit"
                />
                <Image
                  src={
                    "https://res.cloudinary.com/dhrbg2jbi/image/upload/v1728935894/x-social-media-black-icon_br6wpq.svg"
                  }
                  width={32}
                  height={32}
                  alt="X"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
