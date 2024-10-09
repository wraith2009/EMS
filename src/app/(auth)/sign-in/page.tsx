"use client";
import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import {
  AuthSchema,
  AuthSchemaType,
} from "@/src/lib/validators/auth.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React from "react";

const SigninPage: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const router = useRouter();

  // Initialize react-hook-form with zod schema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthSchemaType>({
    resolver: zodResolver(AuthSchema),
  });

  // Handle sign-in with email and password
  const handleSignin = async (data: AuthSchemaType) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Attempt to sign in using the credentials provider
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false, // Handle the response manually
      });

      if (response?.error) {
        setError("Sign-in failed. Please check your credentials.");
      } else {
        setSuccess("Sign-in successful! Redirecting...");
        setTimeout(() => router.push("/profile"), 2000); // Redirect after 2 seconds
      }
    } catch (error) {
      console.error(error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f3f7f9]">
      <div className="bg-[#f3f7f9] p-6  w-full max-w-md">
        <h2 className="text-4xl text-center font-bold mb-4">Sign In</h2>
        <p className="text-lg text-center text-[#676767] pb-8">
          Enter your email and password to Sign In
        </p>

        {/* Form submission */}
        <form
          onSubmit={handleSubmit(handleSignin)}
          className="flex flex-col w-full"
        >
          <label className="text-gray-500 py-2">Email</label>
          <input
            type="email"
            placeholder="Your email"
            {...register("email")}
            className="mb-2 p-2 border border-gray-300 rounded-lg"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          <label className="text-gray-500 py-2">Password</label>
          <input
            type="password"
            placeholder="Your password"
            {...register("password")}
            className="mb-4 p-2 border border-gray-300 rounded-lg"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white py-2 rounded-lg"
          >
            {loading ? "Signing in..." : "Continue with email"}
          </button>
        </form>

        {error && <p className="mt-2 text-red-500">{error}</p>}
        {success && <p className="mt-2 text-green-500">{success}</p>}
      </div>
    </div>
  );
};

export default SigninPage;
