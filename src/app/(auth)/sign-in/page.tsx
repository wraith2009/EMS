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
import Header from "@/src/components/auth/Header";
import FooterPage from "@/src/components/auth/footer";
import Image from "next/image";
const SigninPage: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthSchemaType>({
    resolver: zodResolver(AuthSchema),
  });

  const handleSignin = async (data: AuthSchemaType) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (response?.error) {
        setError("Sign-in failed. Please check your credentials.");
      } else {
        setSuccess("Sign-in successful! Redirecting...");
        setTimeout(() => router.push("/"), 1000);
      }
    } catch (error) {
      console.error(error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f3f7f9]  flex flex-col justify-between">
      <Header />
      <div className=" flex  gap-10">
        {/* Left side - Image */}
        <div className="hidden lg:block w-1/2 relative min-h-screen">
          <Image
            src="https://res.cloudinary.com/dhrbg2jbi/image/upload/v1730783755/Square_Outdoor_Sign_Mockup_kopzjx.png"
            alt="Login"
            fill
            className="object-cover "
            priority
          />
        </div>

        {/* Right side - Form */}
        <div className="w-full lg:w-1/2 bg-[#f3f7f9] flex flex-col justify-center ">
          <div className="max-w-md w-full mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-primary-red mb-3">
                Welcome Back
              </h2>
              <p className="text-lg text-[#676767]">
                Enter your email and password to Sign In
              </p>
            </div>

            <form onSubmit={handleSubmit(handleSignin)} className="space-y-6">
              <div className="space-y-2">
                <label className="text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  placeholder="Your email"
                  {...register("email")}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent outline-none transition-all"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-gray-700 font-medium">Password</label>
                <input
                  type="password"
                  placeholder="Your password"
                  {...register("password")}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent outline-none transition-all"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end">
                <a
                  href="/forget-password"
                  className="text-primary-red hover:text-red-700 text-sm font-medium transition-colors"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-red hover:bg-red-700 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Signing in..." : "Continue with email"}
              </button>
            </form>

            {error && (
              <div className="mt-4 p-3 bg-red-50 text-red-500 rounded-lg text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="mt-4 p-3 bg-green-50 text-green-500 rounded-lg text-sm">
                {success}
              </div>
            )}

            <div className="mt-8 text-center">
              <p className="text-[#676767]">
                Don&apos;t have an account?{" "}
                <a
                  href="/"
                  className="text-primary-red hover:text-red-700 font-medium hover:underline"
                >
                  Homepage
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <FooterPage />
    </div>
  );
};

export default SigninPage;
