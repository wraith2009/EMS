"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const UserProfileComponent = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit } = useForm();

  const user = {
    name: "Edward Larry",
    email: "edwardlarry@email.com",
    phoneNumber: "123-456-7890",
    birthDate: "1994-09-14",
    joinedDate: "2021-01-21",
    avatar: "/avatar.png",
    role: "Senior Designer",
  };

  const onSubmit = (formData) => {
    console.log("Updated user data:", formData);
    setIsEditing(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f3f7f9] relative">
      <div className="p-8 bg-[#f3f7f9]  w-full max-w-md ">
        <div className="absolute top-4 right-4 space-x-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-primary-red hover:bg-red-600 text-white font-medium py-2 px-4 rounded-3xl"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
          {isEditing && (
            <button
              type="submit"
              form="userProfileForm"
              className="bg-primary-red hover:bg-red-600 text-white font-medium py-2 px-4 rounded-3xl"
            >
              Save Changes
            </button>
          )}
        </div>
        <div className="flex flex-col items-center mb-6">
          <label className="cursor-pointer">
            <input
              type="file"
              className="hidden"
              {...register("avatar")}
              disabled={!isEditing}
            />
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-full mb-4 object-cover border-2 border-gray-300"
            />
          </label>
          <h1 className="text-2xl font-bold text-center">{user.name}</h1>
          <p className="text-[#676767]">{user.role}</p>
        </div>
        <form
          id="userProfileForm"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div>
            <label htmlFor="email" className="block font-medium text-[#676767]">
              Email
            </label>
            <input
              id="email"
              type="email"
              defaultValue={user.email}
              readOnly
              className="block w-full border-gray-300 bg-gray-200 rounded-3xl px-3 py-2 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block font-medium text-[#676767]">
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              defaultValue={user.phoneNumber}
              readOnly
              className="block w-full border-gray-300 bg-gray-200 rounded-3xl px-3 py-2 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="gender"
              className="block font-medium text-[#676767]"
            >
              Gender
            </label>
            <input
              id="gender"
              type="text"
              {...register("gender")}
              defaultValue="Male"
              readOnly={!isEditing}
              className={`block w-full border-gray-300 rounded-3xl px-3 py-2 focus:outline-none ${
                !isEditing ? "bg-gray-200" : "bg-white"
              }`}
            />
          </div>
          <div>
            <label
              htmlFor="avatar"
              className="block font-medium text-[#676767]"
            >
              Avatar URL
            </label>
            <input
              id="avatar"
              type="text"
              {...register("avatar")}
              defaultValue={user.avatar}
              readOnly={!isEditing}
              className={`block w-full border-gray-300 rounded-3xl px-3 py-2 focus:outline-none ${
                !isEditing ? "bg-gray-200" : "bg-white"
              }`}
            />
          </div>
          <div>
            <label htmlFor="role" className="block font-medium text-[#676767]">
              Role
            </label>
            <input
              id="role"
              type="text"
              {...register("role")}
              defaultValue={user.role}
              readOnly={!isEditing}
              className={`block w-full border-gray-300 rounded-3xl px-3 py-2 focus:outline-none ${
                !isEditing ? "bg-gray-200" : "bg-white"
              }`}
            />
          </div>
          <div>
            <label
              htmlFor="birthDate"
              className="block font-medium text-[#676767]"
            >
              Birth Date
            </label>
            <input
              id="birthDate"
              type="date"
              {...register("birthDate")}
              defaultValue={user.birthDate}
              readOnly={!isEditing}
              className={`block w-full border-gray-300 rounded-3xl px-3 py-2 focus:outline-none ${
                !isEditing ? "bg-gray-200" : "bg-white"
              }`}
            />
          </div>
          <div>
            <label
              htmlFor="joinedDate"
              className="block font-medium text-[#676767]"
            >
              Joined Date
            </label>
            <input
              id="joinedDate"
              type="date"
              {...register("joinedDate")}
              defaultValue={user.joinedDate}
              readOnly={!isEditing}
              className={`block w-full border-gray-300 rounded-3xl px-3 py-2 focus:outline-none ${
                !isEditing ? "bg-gray-200" : "bg-white"
              }`}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfileComponent;
