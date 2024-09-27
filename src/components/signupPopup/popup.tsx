"use client";
import { FC, useState } from "react";
import axios from "axios"; // Import Axios
import React from "react";

// Define the types for the props
interface SignupPopupProps {
  onClose: () => void;
}

const SignupPopup: FC<SignupPopupProps> = ({ onClose }) => {
  // State for managing form inputs and submission status
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  // Function to handle form submission
  const handleSignup = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      // Make an Axios POST request to your signup endpoint
      const response = await axios.post("/api/users/signup", {
        email,
        password,
      });

      // Handle success (display a success message or navigate, etc.)
      setSuccess("Signup successful! Redirecting...");
      console.log("Signup successful:", response.data);

      // Optionally, close the modal after a short delay
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      // Handle error
      setError("Signup failed. Please try again.");
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-sm">
      <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-4">Create your account</h2>

          <button className="bg-gray-800 text-white rounded-lg py-2 px-4 w-full mb-4 flex items-center justify-center">
            <svg className="mr-2" width="20" height="20" fill="currentColor">
              <circle cx="10" cy="10" r="10" fill="#EA4335" />
            </svg>
            Continue with Google
          </button>

          <div className="flex flex-col w-full">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-2 p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4 p-2 border border-gray-300 rounded-lg"
            />
            <button
              onClick={handleSignup}
              disabled={loading}
              className="bg-blue-500 text-white rounded-lg py-2"
            >
              {loading ? "Signing up..." : "Continue with email"}
            </button>
          </div>

          {error && <p className="mt-2 text-red-500">{error}</p>}
          {success && <p className="mt-2 text-green-500">{success}</p>}

          <p className="mt-4 text-sm">
            <a href="#" className="text-blue-500">
              Already have an account?
            </a>
          </p>
          <p className="mt-2 text-xs text-gray-500">
            By signing up, you agree to the
            <a href="#" className="text-blue-500">
              {" "}
              Terms of Service{" "}
            </a>{" "}
            and
            <a href="#" className="text-blue-500">
              {" "}
              Privacy Policy
            </a>
            .
          </p>
        </div>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default SignupPopup;
