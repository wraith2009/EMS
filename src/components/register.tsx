"use client";

import React, { FormEvent } from "react";
import Image from "next/image";
import axios from "axios";
import GradualSpacing from "./magicui/gradual-spacing";
const BusinessRegistration: React.FC = () => {
  const [businessName, setBusinessName] = React.useState<string>("");
  const [businessAddress, setBusinessAddress] = React.useState<string>("");
  const [contactNumber, setContactNumber] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [registrationNumber, setRegistrationNumber] =
    React.useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create FormData object to hold form data
    const formData = new FormData();
    formData.append("name", businessName);
    formData.append("registrationNumber", registrationNumber);
    formData.append("address", businessAddress);
    formData.append("institueContactNumber", contactNumber);
    formData.append("institueEmail", email);

    try {
      const response = await axios.post("/api/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Business registered successfully:", response);

      setBusinessName("");
      setBusinessAddress("");
      setContactNumber("");
      setEmail("");
      setRegistrationNumber("");
    } catch (error) {
      console.error("Error registering business:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F0F5] flex">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#F0F0F5]  overflow-hidden">
          <div className="text-center p-6">
            <h1 className="text-2xl tracking-tighter bg-gradient-to-b from-primary-red to-slate-200 text-transparent bg-clip-text text-center font-bold">
              Business Registration
            </h1>
            <p className="mt-2 text-primary-red">
              Please fill out the form below to register your business.
            </p>
          </div>
          <form className="p-6 space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label
                htmlFor="businessName"
                className="text-[#676767] font-medium"
              >
                Business Name
              </label>
              <input
                id="businessName"
                value={businessName}
                placeholder="Enter your business name"
                className="w-full border border-gray-300  focus:border-gray-300 rounded-lg p-2"
                onChange={(e) => setBusinessName(e.target.value)}
              />
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
                value={businessAddress}
                placeholder="Enter your business address"
                className="w-full border border-gray-300  focus:border-gray-300 rounded-lg p-2"
                onChange={(e) => setBusinessAddress(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="contact" className="text-[#676767] font-medium">
                Contact Number
              </label>
              <input
                id="contact"
                type="tel"
                value={contactNumber}
                placeholder="Enter your contact number"
                className="w-full border border-gray-300  focus:border-gray-300 rounded-lg p-2"
                onChange={(e) => setContactNumber(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-[#676767] font-medium">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                placeholder="Enter your email address"
                className="w-full border border-gray-300  focus:border-gray-300 rounded-lg p-2"
                onChange={(e) => setEmail(e.target.value)}
              />
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
                value={registrationNumber}
                placeholder="Enter your registration number"
                className="w-full border border-gray-300  focus:border-gray-300 rounded-lg p-2"
                onChange={(e) => setRegistrationNumber(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary-red  transition-colors text-white font-semibold py-2 px-4 rounded-3xl"
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
      </div>
    </div>
  );
};

export default BusinessRegistration;
