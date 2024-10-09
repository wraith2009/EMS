"use client";

import React from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterBusinessSchema,
  BusinessRegistrationType,
} from "../lib/validators/auth.validator";
import { ResgisterBusiness } from "../actions/auth.actions";

const BusinessRegistration: React.FC = () => {
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
      const response = await ResgisterBusiness(formData);
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
      <div className="hidden lg:block w-1/2 bg-[#676767]">
        <div className="h-full w-full relative">
          <Image
            src="/register.webp?height=1080&width=1080"
            alt="Business registration illustration"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  );
};

export default BusinessRegistration;
