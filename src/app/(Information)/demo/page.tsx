"use client";
import FooterPage from "@/src/components/auth/footer";
import Header from "@/src/components/auth/Header";
import React, { useState } from "react";
import { FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa";
import FreeTrealBenefits from "@/src/components/demo/FreeTrialBenifits";
const Demo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");

  const handleSendQuery = () => {
    console.log("Email:", email);
    console.log("Query:", query);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-[#f3f5f7] min-h-screen overflow-y-scroll no-scrollbar flex flex-col justify-between">
      <Header />
      <div className="text-center my-8 ">
        <h1 className="text-[#23333e] md:text-[40px] text-3xl font-bold">
          Start Your <span className="text-primary-red">Free Trial</span> Today!
        </h1>
        <p className="text-[#8c9499] mt-4 text-sm md:text-lg">
          Discover the benefits of our platform with a 30-day free trial.
          Experience all features with no commitments.
        </p>
        <button className="bg-primary-red text-white py-2 px-6 mt-4 rounded-3xl shadow-lg hover:bg-red-600">
          Start Free Trial
        </button>
        <FreeTrealBenefits />
        {/* Query Section */}
        <div className="mt-16 flex flex-col items-center">
          <h2 className="text-[#23333e] text-2xl md:text-3xl font-bold text-center">
            Have Questions? Contact Us!
          </h2>
          <p className="text-[#8c9499] mt-2 text-sm md:text-lg">
            Reach out via email or connect with us on social media.
          </p>

          <div className="flex gap-4 mt-6">
            {/* Social media links */}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-red hover:text-red-600"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-red hover:text-red-600"
            >
              <FaLinkedin size={24} />
            </a>
            <a href="#" className="text-primary-red hover:text-red-600">
              <FaEnvelope size={24} />
            </a>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary-red text-white py-2 px-6 mt-4 rounded-3xl shadow-lg hover:bg-red-600"
          >
            Send Us Your Query
          </button>
        </div>
      </div>

      <FooterPage />

      {/* Modal for Query */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-sm">
          <div className="relative bg-[#f3f7f9] py-8 px-6 rounded-2xl shadow-lg max-w-sm w-full">
            <div className="flex flex-col items-center gap-4">
              <h2 className="text-lg font-semibold text-[#23333e]">
                Send Your Query
              </h2>
              <form className="w-full flex flex-col gap-4">
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-2 border rounded-lg w-full border-gray-300"
                />
                <textarea
                  placeholder="Your query"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="p-2 border rounded-lg w-full border-gray-300"
                  rows={4}
                ></textarea>
                <button
                  type="button"
                  onClick={handleSendQuery}
                  className="bg-primary-red text-white rounded-2xl py-2 px-4 w-full shadow-lg hover:bg-red-600"
                >
                  Send Query
                </button>
              </form>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              aria-label="Close query modal"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Demo;
