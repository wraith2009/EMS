/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { fetchUserdetails } from "@/src/actions/user.actions";
import { useUser } from "@/src/context/UserContext";

const UserProfileComponent = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const { register, handleSubmit } = useForm();
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

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toISOString().split("T")[0];
  };

  const getFullName = () => {
    if (userProfile?.user?.teacher) {
      return `${userProfile.user.teacher.firstName} ${userProfile.user.teacher.lastName}`;
    }
    return userProfile?.user.name || "";
  };

  const onSubmit = (formData: any) => {
    console.log("Updated user data:", formData);
    setIsEditing(false);
  };

  if (!userProfile) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f3f7f9] relative">
      <div className="p-8 bg-[#f3f7f9] w-full max-w-md">
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
              src={userProfile.avatar || "/default-avatar.png"}
              alt={getFullName()}
              className="w-24 h-24 rounded-full mb-4 object-cover border-2 border-gray-300"
            />
          </label>
          <h1 className="text-2xl font-bold text-center">{getFullName()}</h1>
          <p className="text-[#676767]">
            {userProfile.user.teacher?.role || userProfile.role}
          </p>
        </div>

        <form
          id="userProfileForm"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {/* Personal Information */}
          <h2 className="text-xl font-semibold text-[#676767]">
            Personal Information
          </h2>
          <div>
            <label htmlFor="email" className="block font-medium text-[#676767]">
              Email
            </label>
            <input
              id="email"
              type="email"
              defaultValue={userProfile.user.email}
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
              defaultValue={userProfile.user.phoneNumber || "Not provided"}
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
              defaultValue={formatDate(userProfile.user.teacher?.dateOfBirth)}
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
              defaultValue={userProfile.user.gender || "Not specified"}
              readOnly
              className="block w-full border-gray-300 bg-gray-200 rounded-3xl px-3 py-2 focus:outline-none"
            />
          </div>

          {/* Professional Information */}
          <h2 className="text-xl font-semibold text-[#676767]">
            Professional Information
          </h2>
          <div>
            <label htmlFor="role" className="block font-medium text-[#676767]">
              Role
            </label>
            <input
              id="role"
              type="text"
              defaultValue={
                userProfile.user.teacher?.role || userProfile.user.role
              }
              readOnly
              className="block w-full border-gray-300 bg-gray-200 rounded-3xl px-3 py-2 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="qualification"
              className="block font-medium text-[#676767]"
            >
              Qualification
            </label>
            <input
              id="qualification"
              type="text"
              defaultValue={
                userProfile.user.teacher?.qualification || "Not provided"
              }
              readOnly
              className="block w-full border-gray-300 bg-gray-200 rounded-3xl px-3 py-2 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="experience"
              className="block font-medium text-[#676767]"
            >
              Experience
            </label>
            <input
              id="experience"
              type="text"
              defaultValue={`${userProfile.user.teacher?.experience || "0"} years`}
              readOnly
              className="block w-full border-gray-300 bg-gray-200 rounded-3xl px-3 py-2 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="subjectSpecialization"
              className="block font-medium text-[#676767]"
            >
              Subject Specialization
            </label>
            <input
              id="subjectSpecialization"
              type="text"
              defaultValue={
                userProfile.user.teacher?.subjectSpecialization ||
                "Not provided"
              }
              readOnly
              className="block w-full border-gray-300 bg-gray-200 rounded-3xl px-3 py-2 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="subjectsTeaching"
              className="block font-medium text-[#676767]"
            >
              Subjects Teaching
            </label>
            <input
              id="subjectsTeaching"
              type="text"
              defaultValue={
                userProfile.user.teacher?.subjects_teaching || "Not provided"
              }
              readOnly
              className="block w-full border-gray-300 bg-gray-200 rounded-3xl px-3 py-2 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="joinDate"
              className="block font-medium text-[#676767]"
            >
              Employment Start Date
            </label>
            <input
              id="joinDate"
              type="date"
              defaultValue={formatDate(
                userProfile.user.teacher?.employementStartDate,
              )}
              readOnly
              className="block w-full border-gray-300 bg-gray-200 rounded-3xl px-3 py-2 focus:outline-none"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfileComponent;
