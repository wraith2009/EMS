"use client";

import Slideshow from "./Slideshow";
import FeatureCards from "./Whyus";
import SignupPopup from "../signupPopup/popup"; // Import the SignupModal component
import { useState } from "react"; // Import useState for managing modal visibility
import React from "react";

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State to handle modal visibility

  const images = ["/slideshow1.jpg", "/slideshow2.jpg", "/slideshow3.jpg"];

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-[#f3f7f9] flex flex-col">
      {/* Main Content */}
      <div className={`relative ${isModalOpen ? "blur-sm" : ""}`}>
        <div className="w-full md:w-2/3 flex items-center justify-between mx-auto border-b-2 border-gray-300 md:h-14 px-4">
          <span className="text-[#253b47] font-bold text-lg">campussync</span>
          <div className="flex gap-6">
            <span className="text-[#8f9ca3] cursor-pointer font-sans">
              About
            </span>
            <span className="text-[#8f9ca3] cursor-pointer font-sans">
              For Business
            </span>
            <span className="text-[#8f9ca3] cursor-pointer font-sans">
              Try for free
            </span>
            <span className="text-[#8f9ca3] cursor-pointer font-sans">
              Pricing
            </span>
          </div>
          <div className="flex gap-2">
            <button
              className="border-2 bg-white shadow-sm border-gray-300 h-8 px-4 rounded-2xl"
              onClick={openModal} // Open modal on click
            >
              <span className="text-black font-sans">Signup</span>
            </button>
            <button className="border-2 bg-white shadow-sm border-gray-300 h-8 px-4 rounded-2xl">
              <span className="text-black font-sans">Signin</span>
            </button>
          </div>
        </div>

        {/* Other content of the landing page */}
        <div className="text-center mt-20">
          <h1 className="text-[#23333e] text-[30px] font-bold">
            Streamline Your Educational Institution&apos;s
          </h1>
          <h1 className="text-[#23333e] text-[40px] font-bold">
            Operations with Ease
          </h1>
          <div className="text-[#8c9499] mt-4 text-sm">
            <p>
              Comprehensive Management Solutions for Attendance, Finances, and
              Events
            </p>
            <p>– Empowering Universities and Schools to Thrive.</p>
          </div>
        </div>
        <div className="flex justify-center mt-20 items-center">
          <div className="text-[#ff6f61] w-2/3">
            <p className="text-[30px] font-bold">Overview</p>
          </div>
        </div>
        <div className="flex justify-center items-center flex-grow my-4">
          <div className="w-2/3 flex justify-center items-center bg-white rounded-2xl md:h-[500px]">
            <Slideshow images={images} />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center my-10">
          <div className="w-2/3">
            <p>
              <span className="text-[#ff6f61] font-bold text-[30px]">
                Why Choose Us?
              </span>
            </p>
          </div>
          <FeatureCards />
        </div>
      </div>

      {/* Signup Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50">
          <SignupPopup onClose={closeModal} />
        </div>
      )}
    </div>
  );
}
