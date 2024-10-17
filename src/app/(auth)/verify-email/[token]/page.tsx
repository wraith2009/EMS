"use client";
import FooterPage from "@/src/components/auth/footer";
import Header from "@/src/components/auth/Header";
import React from "react";
import { VerifyEmail } from "@/src/actions/auth.actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Verifymail = ({ params: { token } }: { params: { token: string } }) => {
  const router = useRouter();
  const handleVerify = async () => {
    try {
      const res = await VerifyEmail({ token });
      if (res?.success) {
        toast.success("Email Verified");
        router.push("/sign-in");
      }
    } catch (error) {
      console.error(error);
      toast.error("unexpected Error");
    }
  };
  return (
    <div className="bg-[#f3f7f9] h-screen flex flex-col justify-between">
      <Header />
      <div>
        <div className="flex justify-center items-center ">
          <div className=" p-8 rounded-lg">
            <h1 className="text-2xl font-bold text-primary-red text-center">
              Verify your mail
            </h1>
            <p className="text-[#676767]">
              You are one step away from experiencing campussync
            </p>
            <button
              className="mt-6 w-full rounded-3xl py-2 text-white bg-primary-red"
              onClick={handleVerify}
            >
              Verify
            </button>
          </div>
        </div>
      </div>
      <FooterPage />
    </div>
  );
};
export default Verifymail;
