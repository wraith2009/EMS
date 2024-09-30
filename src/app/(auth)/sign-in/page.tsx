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
        setTimeout(() => router.push("/"), 2000); // Redirect after 2 seconds
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
      const response = await signIn("google", { redirect: false });
      console.log("res", response);
      // Check if the signIn response has an error field
      if (response?.error) {
        console.log("Google sign-in error:", response.error);
        setError("Google sign-in failed. Please try again.");
      } else if (response?.ok) {
        console.log("Google sign-in successful! Redirecting...", response);
        setSuccess("Google sign-in successful! Redirecting...");
        setTimeout(() => router.push("/"), 2000); // Redirect after 2 seconds
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Sign in to your account</h2>

        {/* Google Sign-in Button */}
        <button
          onClick={handleGoogleSignin}
          disabled={loading}
          className="bg-gray-800 text-white rounded-lg py-2 px-4 w-full mb-4 flex items-center justify-center"
        >
          <svg className="mr-2" width="20" height="20" fill="currentColor">
            <circle cx="10" cy="10" r="10" fill="#EA4335" />
          </svg>
          {loading ? "Signing in..." : "Continue with Google"}
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
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 p-2 border border-gray-300 rounded-lg"
          />
          <button
            onClick={handleSignin}
            disabled={loading}
            className="bg-blue-500 text-white rounded-lg py-2"
          >
            {loading ? "Signing in..." : "Continue with email"}
          </button>
        </div>

        {error && <p className="mt-2 text-red-500">{error}</p>}
        {success && <p className="mt-2 text-green-500">{success}</p>}

        <p className="mt-4 text-sm">
          <a href="/signup" className="text-blue-500">
            Don&apos;t have an account? Sign up here.
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
