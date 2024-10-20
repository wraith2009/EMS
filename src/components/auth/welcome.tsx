"use client";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import FooterPage from "./footer";
import { ResendVerificationEmail } from "@/src/actions/auth.actions";
const Welcome = () => {
  const [seconds, setSeconds] = useState(30);
  const [isClickable, setIsClickable] = useState(false);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    async function fetchEmail() {
      console.log("Client: Attempting to fetch email from API...");
      try {
        const response = await fetch("/api/cookie/get-email");
        if (response.ok) {
          const data = await response.json();
          console.log("Client: Email fetched successfully:", data.email);
          setEmail(data.email);
        } else {
          console.log(
            "Client: Failed to fetch email, status:",
            response.status,
          );
        }
      } catch (error) {
        console.error("Client: Error fetching email:", error);
      }
    }
    fetchEmail();
  }, []);

  // Countdown logic
  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsClickable(true);
    }
  }, [seconds]);

  return (
    <div className="bg-[#f3f7f9] h-screen flex flex-col justify-between">
      <Header />
      <div className="flex-grow flex justify-center items-center">
        <div className="bg-white text-[#676767] p-8 rounded-lg shadow-lg w-full max-w-md text-center">
          <p className="text-2xl text-primary-red font-semibold mb-2">
            Check Your Email
          </p>
          <p>We have sent a confirmation email to your account.</p>
          <p>Please check your email and confirm.</p>

          <p className="mt-2">
            Didn&apos;t receive the email? Click the{" "}
            <span className="text-primary-red">button</span> below to resend it.
          </p>
          <button
            className={`mt-6 w-full rounded-lg py-2 text-white ${
              isClickable
                ? "bg-primary-red hover:bg-red-500"
                : "bg-red-300 cursor-not-allowed"
            }`}
            onClick={() => {
              if (isClickable) {
                ResendVerificationEmail({ email });
                setSeconds(30);
                setIsClickable(false);
              }
            }}
            disabled={!isClickable}
          >
            {isClickable ? "Resend mail" : `Wait for ${seconds} seconds`}
          </button>

          <a href="/sign-in">
            <p className="text-primary-red mt-2 underline">Sign in</p>
          </a>
        </div>
      </div>
      <FooterPage />
    </div>
  );
};

export default Welcome;
