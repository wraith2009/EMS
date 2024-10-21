"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import FooterPage from "@/src/components/auth/footer";
import Header from "@/src/components/auth/Header";
import { VerifyEmail } from "@/src/actions/auth.actions";

const Verifymail = ({ params: { token } }: { params: { token: string } }) => {
  const [error, setError] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    async function fetchEmail() {
      try {
        const response = await fetch("/api/cookie/get-email");
        if (response.ok) {
          const data = await response.json();
          setEmail(data.email);
        } else {
          console.log("Failed to fetch email, status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching email:", error);
      }
    }
    fetchEmail();
  }, []);

  const handleVerify = async () => {
    setIsVerifying(true);
    try {
      const res = await VerifyEmail({ token, email });
      if (res?.success) {
        toast.success("Email Verified");
        router.push("/sign-in");
      } else {
        setError(true);
        toast.error("Verification failed");
      }
    } catch (error) {
      console.error(error);
      setError(true);
      toast.error("Unexpected Error");
    } finally {
      setIsVerifying(false);
    }
  };

  const goToHomepage = () => {
    router.push("/");
  };

  return (
    <div className="bg-[#f3f7f9] min-h-screen flex flex-col justify-between">
      <Header />
      <div className="flex justify-center items-center flex-grow">
        {error ? (
          <div className="p-8 rounded-lg bg-white shadow-md">
            <h1 className="text-2xl font-bold text-primary-red text-center mb-4">
              Verification Failed
            </h1>
            <p className="text-[#676767] mb-6">
              Invalid token or token expired. Please try again or request a new
              verification email.
            </p>
            <button
              className="w-full rounded-3xl py-2 text-white bg-primary-red hover:bg-red-600 transition-colors"
              onClick={goToHomepage}
            >
              Go to Homepage
            </button>
          </div>
        ) : (
          <div className="p-8 rounded-lg bg-white shadow-md">
            <h1 className="text-2xl font-bold text-primary-red text-center mb-4">
              Verify your email
            </h1>
            <p className="text-[#676767] mb-6">
              You are one step away from experiencing CampusSync
            </p>
            <button
              className="w-full rounded-3xl py-2 text-white bg-primary-red hover:bg-red-600 transition-colors disabled:bg-gray-400"
              onClick={handleVerify}
              disabled={isVerifying}
            >
              {isVerifying ? "Verifying..." : "Verify"}
            </button>
          </div>
        )}
      </div>
      <FooterPage />
    </div>
  );
};

export default Verifymail;
