"use client";
import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"; // Import icons for hamburger
import { useRouter } from "next/navigation";
import Image from "next/image";

const Header = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState<boolean>(false); // State to handle mobile menu visibility

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleClick = () => {
    router.push("/sign-in");
  };
  return (
    <div className="w-full md:w-2/3 flex items-center justify-between mx-auto border-b-2 border-gray-300 h-14 px-4 z-10 bg-[#f3f7f9] ">
      <Image src="/logo-campus.png" height={50} width={50} alt="logo" />

      {/* Hamburger Menu for Mobile */}
      <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
        {menuOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6">
        <span className="text-[#8f9ca3] cursor-pointer font-sans hover:text-primary-red">
          About
        </span>
        <span className="text-[#8f9ca3] cursor-pointer font-sans hover:text-primary-red">
          For Business
        </span>
        <span className="text-[#8f9ca3] cursor-pointer font-sans hover:text-primary-red">
          Try for free
        </span>
        <span className="text-[#8f9ca3] cursor-pointer font-sans hover:text-primary-red">
          Pricing
        </span>
      </div>

      {/* Signup Button (Desktop) */}
      <div className="hidden md:flex gap-2">
        <button
          className="bg-[#ffe8e5] shadow-sm h-8 px-4 rounded-2xl"
          onClick={handleClick}
        >
          <span className="text-primary-red font-sans">SignIn</span>
        </button>
      </div>
    </div>
  );
};

export default Header;
