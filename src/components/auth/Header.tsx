"use client";
import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import type { Session } from "next-auth";
import toast from "react-hot-toast";

const Header: React.FC = () => {
  const router = useRouter();
  const { data: session }: { data: Session | null } = useSession();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Handle SignIn click
  const handleSignIn = () => {
    router.push("/sign-in");
  };

  // Handle SignOut click
  const handleSignOut = () => {
    signOut({ redirect: false });
    toast.success("SignOut Successful");
    setTimeout(() => {
      router.push("/sign-in");
    }, 1000);
  };

  // Function to check if a link is active
  const isActive = (path: string) => pathname === path;

  return (
    <div className="w-full md:w-2/3 flex items-center justify-between mx-auto border-b-2 border-gray-300 h-14 px-4 z-10 bg-[#f3f7f9]">
      <Image src="/logo-campus.png" height={50} width={50} alt="logo" />

      <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
        {menuOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
      </div>

      <div className="hidden md:flex gap-6">
        <span
          className={`cursor-pointer font-sans ${
            isActive("/about")
              ? "text-primary-red"
              : "text-[#8f9ca3] hover:text-primary-red"
          }`}
          onClick={() => router.push("/about")}
        >
          About
        </span>
        <span
          className={`cursor-pointer font-sans ${
            isActive("/business")
              ? "text-primary-red"
              : "text-[#8f9ca3] hover:text-primary-red"
          }`}
          onClick={() => router.push("/business")}
        >
          For Business
        </span>
        <span
          className={`cursor-pointer font-sans ${
            isActive("/Information/demo")
              ? "text-primary-red"
              : "text-[#8f9ca3] hover:text-primary-red"
          }`}
          onClick={() => router.push("/try-for-free")}
        >
          Try for free
        </span>
        <a href="/Information/Pricing">
          <span
            className={`cursor-pointer font-sans ${
              isActive("/Information/Pricing")
                ? "text-primary-red"
                : "text-[#8f9ca3] hover:text-primary-red"
            }`}
          >
            Pricing
          </span>
        </a>
      </div>

      <div className="hidden md:flex gap-2">
        {session ? (
          <button
            className="bg-[#ffe8e5] shadow-sm h-8 px-4 rounded-2xl"
            onClick={handleSignOut}
          >
            <span className="text-primary-red font-sans">Sign Out</span>
          </button>
        ) : (
          <button
            className="bg-[#ffe8e5] shadow-sm h-8 px-4 rounded-2xl"
            onClick={handleSignIn}
          >
            <span className="text-primary-red font-sans">Sign In</span>
          </button>
        )}
      </div>

      {menuOpen && (
        <div className="md:hidden absolute top-14 left-0 w-full bg-[#f3f7f9] flex flex-col items-start p-4 z-20">
          <span
            className={`cursor-pointer font-sans ${
              isActive("/about")
                ? "text-primary-red"
                : "text-[#8f9ca3] hover:text-primary-red"
            } py-2`}
            onClick={() => router.push("/about")}
          >
            About
          </span>
          <span
            className={`cursor-pointer font-sans ${
              isActive("/business")
                ? "text-primary-red"
                : "text-[#8f9ca3] hover:text-primary-red"
            } py-2`}
            onClick={() => router.push("/business")}
          >
            For Business
          </span>
          <span
            className={`cursor-pointer font-sans ${
              isActive("/Information/demo")
                ? "text-primary-red"
                : "text-[#8f9ca3] hover:text-primary-red"
            } py-2`}
            onClick={() => router.push("/try-for-free")}
          >
            Try for free
          </span>
          <a href="/Information/Pricing">
            <span
              className={`cursor-pointer font-sans ${
                isActive("/Information/Pricing")
                  ? "text-primary-red"
                  : "text-[#8f9ca3] hover:text-primary-red"
              } py-2`}
            >
              Pricing
            </span>
          </a>
        </div>
      )}
    </div>
  );
};

export default Header;
