"use client";

import React from "react";
import Image from "next/image";
import GradualSpacing from "./magicui/gradual-spacing";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterBusinessSchema,
  BusinessRegistrationType,
} from "../lib/validators/auth.validator";
import { RegisterBusiness } from "../actions/business.actions";

interface BusinessRegistrationProps {
  userId: string;
}

const BusinessRegistration: React.FC<BusinessRegistrationProps> = ({
  userId,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BusinessRegistrationType>({
    resolver: zodResolver(RegisterBusinessSchema),
  });

  const onSubmit = async (data: BusinessRegistrationType) => {
    const formData = new FormData();
    formData.append("name", data.businessName);
    formData.append("registrationNumber", data.registrationNumber);
    formData.append("address", data.businessAddress);
    formData.append("institueContactNumber", data.contactNumber);
    formData.append("institueEmail", data.email);

    try {
      const response = await RegisterBusiness(formData, userId);
      if (response?.success) {
        console.log("Business registered successfully:", response);
      }

      reset();
    } catch (error) {
      console.error("Error registering business:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F0F5] flex">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#F0F0F5] overflow-hidden">
          <div className="text-center p-6">
            <h1 className="text-2xl tracking-tighter bg-gradient-to-b from-primary-red to-slate-200 text-transparent bg-clip-text text-center font-bold">
              Business Registration
            </h1>
            <p className="mt-2 text-primary-red">
              Please fill out the form below to register your business.
            </p>
          </div>
          <form className="p-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <label
                htmlFor="businessName"
                className="text-[#676767] font-medium"
              >
                Business Name
              </label>
              <input
                id="businessName"
                {...register("businessName")}
                placeholder="Enter your business name"
                className="w-full border border-gray-300 focus:border-gray-300 rounded-lg p-2"
              />
              {errors.businessName && (
                <p className="text-red-500 text-sm">
                  {errors.businessName.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label
                htmlFor="businessAddress"
                className="text-[#676767] font-medium"
              >
                Business Address
              </label>
              <textarea
                id="businessAddress"
                {...register("businessAddress")}
                placeholder="Enter your business address"
                className="w-full border border-gray-300 focus:border-gray-300 rounded-lg p-2"
              />
              {errors.businessAddress && (
                <p className="text-red-500 text-sm">
                  {errors.businessAddress.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="contact" className="text-[#676767] font-medium">
                Contact Number
              </label>
              <input
                id="contact"
                type="tel"
                {...register("contactNumber")}
                placeholder="Enter your contact number"
                className="w-full border border-gray-300 focus:border-gray-300 rounded-lg p-2"
              />
              {errors.contactNumber && (
                <p className="text-red-500 text-sm">
                  {errors.contactNumber.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-[#676767] font-medium">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                placeholder="Enter your email address"
                className="w-full border border-gray-300 focus:border-gray-300 rounded-lg p-2"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <label
                htmlFor="registrationNumber"
                className="text-[#676767] font-medium"
              >
                Registration Number
              </label>
              <input
                id="registrationNumber"
                {...register("registrationNumber")}
                placeholder="Enter your registration number"
                className="w-full border border-gray-300 focus:border-gray-300 rounded-lg p-2"
              />
              {errors.registrationNumber && (
                <p className="text-red-500 text-sm">
                  {errors.registrationNumber.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-primary-red transition-colors text-white font-semibold py-2 px-4 rounded-3xl"
            >
              Register Business
            </button>
          </form>
        </div>
      </div>
      <div className="hidden  w-1/2 bg-white lg:flex lg:flex-col">
        <div className="text-primary-red font-semibold text-3xl flex justify-center items-center h-full w-full ">
          <GradualSpacing text="Empower your institution with AI-driven|insights and seamless management" />
        </div>
        <div className="h-full w-full justify-end flex flex-col">
          <Image
            src="https://res.cloudinary.com/dhrbg2jbi/image/upload/v1728831169/school2_vgsjc1.webp"
            alt="Business registration illustration"
            width={770}
            height={450}
          />
        </div>
        {/* <div className="flex items-end justify-center h-full absolute ">
              <div className="flex items-center pb-8 justify-center gap-4">
                <Image
                  src={"https://res.cloudinary.com/dhrbg2jbi/image/upload/v1728935936/linkedin-app-icon_riwyqy.svg"}
                  width={32}
                  height={32}
                  alt="linkedin"
                />
                <Image
                  src={"https://res.cloudinary.com/dhrbg2jbi/image/upload/v1728935838/reddit-icon_q9ik8c.svg"}
                  width={32}
                  height={32}
                  alt="reddit"
                />
                <Image
                  src={"https://res.cloudinary.com/dhrbg2jbi/image/upload/v1728935894/x-social-media-black-icon_br6wpq.svg"}
                  width={32}
                  height={32}
                  alt="X"
                />
              </div>

        </div> */}
      </div>
    </div>
  );
};

export default BusinessRegistration;
