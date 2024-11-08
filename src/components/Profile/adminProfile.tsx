/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { fetchUserdetails } from "@/src/actions/user.actions";
import { useUser } from "@/src/context/UserContext";

const AdminProfileComponent = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const userData = useUser();
  const userId = userData?.userData?.id;

  useEffect(() => {
    const fetchProfile = async () => {
      if (userId) {
        const response = await fetchUserdetails({ userid: userId });
        if (response) {
          setUserProfile(response);
        }
      }
    };
    fetchProfile();
  }, [userId]);

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f3f7f9] relative">
      <div className="p-8 bg-[#f3f7f9] w-full max-w-md ">
        <div className="absolute top-4 right-4 space-x-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-primary-red hover:bg-red-600 text-white font-medium py-2 px-4 rounded-3xl"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>

        <div className="flex flex-col items-center mb-6">
          <label className="cursor-pointer">
            <input type="file" className="hidden" disabled={!isEditing} />
            <img
              src={userProfile?.user?.avatar || "/default-avatar.png"}
              alt={userProfile?.user?.name || "Admin Avatar"}
              className="w-24 h-24 rounded-full mb-4 object-cover border-2 border-gray-300"
            />
          </label>
          <h1 className="text-2xl font-bold text-center">
            {userProfile?.user?.name || "Admin Name"}
          </h1>
          <p className="text-[#676767]">
            {userProfile?.user?.role || "Admin Role"}
          </p>
        </div>

        <form className="space-y-4">
          <h2 className="text-xl font-semibold text-[#676767]">
            Personal Information
          </h2>
          <div>
            <label htmlFor="name" className="block font-medium text-[#676767]">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={userProfile?.user?.name || ""}
              readOnly
              className="block w-full border-gray-300 bg-gray-200 rounded-3xl px-3 py-2 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="email" className="block font-medium text-[#676767]">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={userProfile?.user?.email || ""}
              readOnly
              className="block w-full border-gray-300 bg-gray-200 rounded-3xl px-3 py-2 focus:outline-none"
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
              value={userProfile?.user?.dateOfBirth || ""}
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
              value={userProfile?.user?.phoneNumber || "Not provided"}
              readOnly={!isEditing}
              className={`block w-full border-gray-300 ${
                isEditing ? "bg-white" : "bg-gray-200"
              } rounded-3xl px-3 py-2 focus:outline-none`}
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
              value={userProfile?.user?.gender || "Not specified"}
              readOnly={!isEditing}
              className={`block w-full border-gray-300 ${
                isEditing ? "bg-white" : "bg-gray-200"
              } rounded-3xl px-3 py-2 focus:outline-none`}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProfileComponent;
