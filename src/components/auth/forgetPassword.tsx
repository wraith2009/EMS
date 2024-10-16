"use client";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import FooterPage from "./footer";

const ForgetPassword = () => {
  const [showResend, setShowResend] = useState(false);
  const [seconds, setSeconds] = useState(30);
  const [isClickable, setIsClickable] = useState(false);
  const [disableResetButton, setDisableResetButton] = useState(false); // State to disable reset button

  const handleResetClick = (e: any) => {
    e.preventDefault();

    setDisableResetButton(true); // Disable the reset button after click
    setShowResend(true);
    setSeconds(30); // Reset timer for both buttons
    setIsClickable(false); // Disable the resend button initially

    // Start the countdown for disabling the reset button
    setTimeout(() => {
      setDisableResetButton(false); // Re-enable the reset button after 30 seconds
    }, 30000);
  };

  // Countdown logic for the resend button
  useEffect(() => {
    if (showResend && seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    } else if (seconds === 0) {
      setIsClickable(true); // Enable the resend button once countdown is complete
    }
  }, [seconds, showResend]);

  return (
    <div className="bg-[#f3f7f9] h-screen flex flex-col justify-between">
      <Header />
      <div className="flex justify-center items-center">
        <div className="text-[#676767] p-8 rounded-lg w-full max-w-md text-center">
          <p className="text-2xl text-primary-red font-semibold mb-2">
            Forget Password
          </p>
          <p>
            Enter your email address below and we&apos;ll send you a link to
            reset your password.
          </p>

          <form className="mt-4" onSubmit={handleResetClick}>
            <input
              type="email"
              className="w-full rounded-3xl py-2 px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-red focus:border-transparent"
              placeholder="Email address"
              required
            />
            <button
              type="submit"
              className={`mt-6 w-full rounded-3xl py-2 text-white ${
                disableResetButton
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary-red hover:bg-red-500"
              }`}
              disabled={disableResetButton} // Disable the reset button
            >
              {disableResetButton
                ? `Wait for ${seconds} seconds`
                : "Send reset link"}
            </button>
          </form>

          {showResend && (
            <div className="mt-4">
              {seconds > 0 ? (
                <p className="text-sm text-gray-500">
                  Wait for {seconds} seconds to resend.
                </p>
              ) : (
                <button
                  className={`mt-2 text-primary-red ${
                    isClickable
                      ? "cursor-pointer"
                      : "cursor-not-allowed text-gray-400"
                  }`}
                  onClick={() => {
                    if (isClickable) {
                      // Logic for resending the reset link
                      setSeconds(30); // Reset timer
                      setIsClickable(false); // Disable button again
                    }
                  }}
                  disabled={!isClickable}
                >
                  Resend
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      <FooterPage />
    </div>
  );
};

export default ForgetPassword;
