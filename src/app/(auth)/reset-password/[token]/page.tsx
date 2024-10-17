"use client";
import FooterPage from "@/src/components/auth/footer";
import Header from "@/src/components/auth/Header";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { ResetPassword } from "@/src/actions/auth.actions"; // Ensure this path is correct

const ResetPasswordPage = ({
  params: { token },
}: {
  params: { token: string };
}) => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload
    setLoading(true); // Set loading state to true

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false); // Reset loading state if passwords don't match
    } else {
      const res = await ResetPassword({ token, password });

      if (res?.success) {
        toast.success(res.message || "Password reset successfully");
      } else {
        toast.error(res.message || "An error occurred, please try again");
      }

      setLoading(false); // Reset loading state after completion
    }
  };

  return (
    <div className="bg-[#f3f7f9] h-screen flex flex-col justify-between">
      <Header />
      <div className="flex justify-center items-center">
        <div className="p-8 rounded-lg w-full max-w-md text-center">
          <p className="text-2xl text-primary-red font-semibold mb-2">
            Reset Password
          </p>
          <p>Enter your new password below.</p>
          <form className="mt-4" onSubmit={handleResetPassword}>
            <input
              type="password"
              placeholder="New password"
              className="w-full rounded-3xl p-2 border border-gray-300 mt-2"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              disabled={loading} // Disable input during loading
            />
            <input
              type="password"
              placeholder="Confirm password"
              className="w-full rounded-3xl p-2 border border-gray-300 mt-2"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              disabled={loading} // Disable input during loading
            />
            <button
              type="submit"
              className="mt-6 w-full rounded-3xl py-2 text-white bg-primary-red"
              disabled={loading} // Disable button while loading
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
      <FooterPage />
    </div>
  );
};

export default ResetPasswordPage;
