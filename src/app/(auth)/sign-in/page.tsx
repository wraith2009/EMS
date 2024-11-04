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
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between">
        <div className="w-full md:w-1/2 p-8 hidden md:block">
          <img
            src="/loginPageimage.webp"
            alt="Login"
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 bg-[#f3f7f9] rounded-lg p-6 max-w-md mx-auto">
          <h2 className="text-4xl text-center text-primary-red font-bold mb-4">
            Welcome Back
          </h2>
          <p className="text-lg text-center text-[#676767] pb-8">
            Enter your email and password to Sign In
          </p>

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
            <a href="/forget-password">
              <p className="text-red-500 mb-2 cursor-pointer hover:text-red-700">
                forget password ?
              </p>
            </a>

            <button
              type="submit"
              disabled={loading}
              className="bg-primary-red text-white py-2 rounded-lg"
            >
              {loading ? "Signing in..." : "Continue with email"}
            </button>
          </form>

          {error && <p className="mt-2 text-red-500">{error}</p>}
          {success && <p className="mt-2 text-green-500">{success}</p>}
          <div>
            <p className="text-[#676767] py-2">
              Don&apos;t have an account ?{" "}
              <span className="text-red-500 hover:text-red-700 cursor-pointer hover:underline">
                Homepage
              </span>{" "}
            </p>
          </div>
        </div>
      </div>
      <FooterPage />
    </div>
  );
};

export default SigninPage;
