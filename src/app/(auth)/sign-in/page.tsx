"use client";
import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import React from "react"; // To handle both Google and credentials sign-in

const SigninPage: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const router = useRouter();

  // Handle sign-in with email and password
  const handleSignin = async () => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Attempt to sign in using the credentials provider
      const response = await signIn("credentials", {
        email,
        password,
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

  // Handle sign-in with Google
  // Handle sign-in with Google
  const handleGoogleSignin = async () => {
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
        router.push(response.url || "/profile");
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
    <div className="flex justify-center items-center min-h-screen bg-[#f3f7f9]">
      <div className="bg-[#f3f7f9] p-6  w-full max-w-md">
        <h2 className="text-4xl text-center font-bold mb-4">Sign In</h2>
        <p className="text-lg text-center text-[#676767] pb-8">
          Enter your email and password to Sign In
        </p>

        <div className="flex flex-col w-full">
          <label className="text-gray-500 py-2">Email</label>
          <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-2 p-2 border border-gray-300 rounded-lg"
          />
          <label className="text-gray-500 py-2">Password</label>
          <input
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 p-2 border border-gray-300 rounded-lg"
          />
          <button
            onClick={handleSignin}
            disabled={loading}
            className="bg-blue-500 text-white py-2 rounded-lg"
          >
            {loading ? "Signing in..." : "Continue with email"}
          </button>
        </div>

        {error && <p className="mt-2 text-red-500">{error}</p>}
        {success && <p className="mt-2 text-green-500">{success}</p>}

        <button
          className="bg-primary-red text-white rounded-lg py-2 px-4 w-full mt-4 flex items-center justify-center"
          onClick={handleGoogleSignin}
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

        <p className="flex mt-4 text-sm gap-2">
          Don&apos;t have an account?
          <a href="/" className="text-blue-500">
            Sign up here.
          </a>
        </p>

        <p className="mt-2 text-xs text-gray-500">
          By signing in, you agree to the
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
    </div>
  );
};

export default SigninPage;
