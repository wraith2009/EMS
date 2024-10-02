"use client";
import { FC, useState } from "react";
import axios from "axios"; // Import Axios
import React from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
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

  const handlegooglelogin = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const response = await signIn("google", {
        redirect: false,
        callbackUrl: "/profile",
      });
      console.log("res", response);
      // Check if the signIn response has an error field
      if (response?.error) {
        console.log("Google sign-in error:", response.error);
        setError("Google sign-in failed. Please try again.");
      } else if (response?.ok) {
        console.log("Google sign-in successful! Redirecting...", response);
        setSuccess("Google sign-in successful! Redirecting...");
        // setTimeout(() => router.push("/pro"), 2000); // Redirect after 2 seconds
      } else {
        console.log("Google sign-in response: ", response); // for debugging purposes
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-sm">
      <div className="relative bg-[#f3f7f9] py-16 px-12 rounded-2xl shadow-lg max-w-sm w-full">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-lg font-semibold ">Create your account</h2>

          <button
            className="bg-primary-red text-white rounded-2xl py-2 px-4 w-full  flex items-center justify-center"
            onClick={handlegooglelogin}
          >
            <div className="flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="17"
                viewBox="0 0 30 30"
              >
                <path
                  fill="white"
                  d="M 15.003906 3 C 8.3749062 3 3 8.373 3 15 C 3 21.627 8.3749062 27 15.003906 27 C 25.013906 27 27.269078 17.707 26.330078 13 L 25 13 L 22.732422 13 L 15 13 L 15 17 L 22.738281 17 C 21.848702 20.448251 18.725955 23 15 23 C 10.582 23 7 19.418 7 15 C 7 10.582 10.582 7 15 7 C 17.009 7 18.839141 7.74575 20.244141 8.96875 L 23.085938 6.1289062 C 20.951937 4.1849063 18.116906 3 15.003906 3 z"
                ></path>
              </svg>
              <p>Continue with Google</p>
            </div>
          </button>

          <div className="flex flex-col w-full gap-2">
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=" p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <button
            onClick={handleSignup}
            disabled={loading}
            className="bg-blue-500 text-white rounded-2xl py-2 w-full"
          >
            {loading ? "Signing up..." : "Continue with email"}
          </button>

          {error && <p className="mt-2 text-red-500">{error}</p>}
          {success && <p className="mt-2 text-green-500">{success}</p>}

          <p className=" text-sm">
            <Link href="/sign-in" className="text-blue-500">
              Already have an account?
            </Link>
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
