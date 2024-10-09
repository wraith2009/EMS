"use client";
import { FC, useState } from "react";
import React from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import {
  AuthSchema,
  AuthSchemaType,
} from "@/src/lib/validators/auth.validator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { signUp } from "@/src/actions/auth.actions"; // Import useRouter for navigation

// Define the types for the props
interface SignupPopupProps {
  onClose: () => void;
}

const SignupPopup: FC<SignupPopupProps> = ({ onClose }) => {
  const router = useRouter(); // Initialize router for navigation

  // State for managing submission status
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  // Initialize useForm with Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthSchemaType>({
    resolver: zodResolver(AuthSchema),
  });

  // Function to handle form submission
  const onSubmit = async (data: AuthSchemaType) => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);
      const response = await signUp(formData);

      if (response.error) {
        setError(response.error);
      } else {
        setSuccess("Signup successful! Redirecting...");
        console.log("Signup successful:", response);
      }

      // Optionally, redirect after a short delay
      setTimeout(() => {
        onClose();
        router.push("/profile"); // Redirect to profile or desired page
      }, 2000);
    } catch (error: any) {
      // Handle error
      setError(
        error.response?.data?.message || "Signup failed. Please try again.",
      );
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle Google login
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
        // Redirect after 2 seconds
        setTimeout(() => {
          onClose();
          router.push("/profile"); // Redirect to profile or desired page
        }, 2000);
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
            className="bg-primary-red text-white rounded-2xl py-2 px-4 w-full flex items-center justify-center"
            onClick={handlegooglelogin}
            disabled={loading}
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

          <div className="w-full">
            {/* Handle form submission with handleSubmit */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-2"
            >
              <div>
                <input
                  type="email"
                  placeholder="Your email"
                  {...register("email")}
                  className={`p-2 border rounded-lg w-full ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  disabled={loading}
                />
                {errors.email && (
                  <p className="mt-1 text-red-500 text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Create a password"
                  {...register("password")}
                  className={`p-2 border rounded-lg w-full ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  disabled={loading}
                />
                {errors.password && (
                  <p className="mt-1 text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-500 text-white rounded-2xl py-2 w-full mt-2"
              >
                {loading ? "Signing up..." : "Continue with email"}
              </button>
            </form>
          </div>

          {/* Display global error or success messages */}
          {error && <p className="mt-2 text-red-500">{error}</p>}
          {success && <p className="mt-2 text-green-500">{success}</p>}

          <p className="text-sm">
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
          aria-label="Close signup popup"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default SignupPopup;
