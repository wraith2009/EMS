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
import toast from "react-hot-toast";

const SigninPage: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

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

    try {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (response?.error) {
        toast.error(response?.error);
      } else {
        toast.success("Sign-in successful!. Redirecting...");
        setTimeout(() => router.push("/onboarding"), 1000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlegooglelogin = async () => {
    setLoading(true);

    try {
      const response = await signIn("google", {
        redirect: false,
        callbackUrl: "/profile",
      });
      console.log("res", response);

      if (response?.error) {
        console.log("Google sign-in error:", response.error);
      } else if (response?.ok) {
        setTimeout(() => {
          router.push("/profile");
        }, 2000);
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error);
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

          <button
            className="bg-primary-red text-white rounded-3xl py-2 px-4 w-full flex items-center justify-center mb-4"
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

          <p className="text-center text-[#a9a9a9] text-sm">
            --------- Continue with Credentials ----------
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
              className="mb-2 p-2 border border-gray-300 rounded-3xl"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}

            <label className="text-gray-500 py-2">Password</label>
            <input
              type="password"
              placeholder="Your password"
              {...register("password")}
              className="mb-4 p-2 border border-gray-300 rounded-3xl"
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
              className="bg-primary-red text-white py-2 rounded-3xl"
            >
              {loading ? "Signing in..." : "Continue with email"}
            </button>
          </form>

          <div>
            <p className="text-[#676767] py-2">
              Don&apos;t have an account ?{" "}
              <span className="text-red-500 hover:text-red-700 cursor-pointer hover:underline">
                SignUp
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
