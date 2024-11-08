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

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const response = await signIn("google", {
        redirect: false,
        callbackUrl: "/",
      });

      if (response?.error) {
        console.log("Google sign-in error:", response.error);
        setError("Google sign-in failed. Please try again.");
      } else if (response?.ok) {
        setSuccess("Google sign-in successful! Redirecting...");
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f3f7f9]">
      <div className="w-full flex justify-center items-center lg:w-2/3 lg:mx-auto">
        <Header />
      </div>

      <div className="flex-1 flex">
        {/* Left side - Image */}
        <div className="hidden lg:block w-1/2 relative">
          <Image
            src="https://res.cloudinary.com/dhrbg2jbi/image/upload/v1730783755/Square_Outdoor_Sign_Mockup_kopzjx.png"
            alt="Login"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right side - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-primary-red mb-3">
                Welcome Back
              </h2>
              <p className="text-lg text-[#676767]">
                Enter your email and password to Sign In
              </p>
            </div>

            {/* Google Sign In Button */}
            <button
              className="w-full bg-primary-red text-white rounded-3xl py-3 mb-6 flex items-center justify-center hover:bg-red-700 transition-colors disabled:opacity-50"
              onClick={handleGoogleLogin}
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
                <span>Continue with Google</span>
              </div>
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-[#676767] bg-[#f3f7f9]">
                  Continue with credentials
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit(handleSignin)} className="space-y-4">
              <div className="space-y-2">
                <label className="text-gray-700 font-medium block">Email</label>
                <input
                  type="email"
                  placeholder="Your email"
                  {...register("email")}
                  className="w-full p-3 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-primary-red focus:border-transparent outline-none transition-all"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-gray-700 font-medium block">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Your password"
                  {...register("password")}
                  className="w-full p-3 border border-gray-300 rounded-3xl focus:ring-2 focus:ring-primary-red focus:border-transparent outline-none transition-all"
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
                className="w-full bg-primary-red text-white py-3 rounded-3xl hover:bg-red-700 transition-colors disabled:opacity-50"
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

            <div className="mt-6 text-center">
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
