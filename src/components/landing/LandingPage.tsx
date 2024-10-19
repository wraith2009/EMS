"use client";
import { useState, useEffect, useRef } from "react";
import FeatureCards from "./Whyus";
import SignupPopup from "../signupPopup/popup";
import StepChart from "./StepChart";
import React from "react";
import Testimonials from "./testimonials";
import { usePathname, useRouter } from "next/navigation";
import CallToAction from "./callToAction";
import Footer from "./footer";
import Image from "next/image";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"; // Import icons for hamburger
import Particles from "../ui/particles";
export default function LandingPage() {
  const router = useRouter();
  const pathname = usePathname();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State to handle mobile menu visibility

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const toggleMenu = () => setMenuOpen(!menuOpen); // Toggle the hamburger menu

  // References for components to be scrolled into view
  const slideshowRef = useRef<HTMLDivElement>(null);
  const featureCardsRef = useRef<HTMLDivElement>(null);
  const stepChartRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => pathname === path;

  // Intersection observer for smooth scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target); // Stop observing once it's visible
          }
        });
      },
      { rootMargin: "0px 0px -100px 0px", threshold: 0.1 }, // Adjust rootMargin as needed
    );

    if (slideshowRef.current) observer.observe(slideshowRef.current);
    if (featureCardsRef.current) observer.observe(featureCardsRef.current);
    if (stepChartRef.current) observer.observe(stepChartRef.current);

    return () => {
      if (slideshowRef.current) observer.unobserve(slideshowRef.current);
      if (featureCardsRef.current) observer.unobserve(featureCardsRef.current);
      if (stepChartRef.current) observer.unobserve(stepChartRef.current);
    };
  }, []);

  return (
    <div className="relative bg-[#f3f7f9] flex flex-col overflow-hidden md:px-0">
      <Particles
        className="absolute inset-0 "
        quantity={500}
        ease={80}
        color="#ff6f61"
        size={0.8}
        refresh
      />

      {/* Main Content */}
      <div className={`relative z-10 ${isModalOpen ? "blur-sm" : ""}`}>
        {/* Header */}
        <div className="w-full md:w-2/3 flex items-center justify-between mx-auto border-b-2 border-gray-300 h-14 px-4 z-10 bg-[#f3f7f9] ">
          <span className="text-[#253b47] font-bold text-lg">campussync</span>

          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
            {menuOpen ? (
              <AiOutlineClose size={24} />
            ) : (
              <AiOutlineMenu size={24} />
            )}
          </div>

          {/* Desktop Menu */}
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
            {/* <span
              className={`cursor-pointer font-sans ${
                isActive("/business")
                  ? "text-primary-red"
                  : "text-[#8f9ca3] hover:text-primary-red"
              }`}
              onClick={() => router.push("/business")}
            >
              For Business
            </span> */}
            <span
              className={`cursor-pointer font-sans ${
                isActive("/Information/demo")
                  ? "text-primary-red"
                  : "text-[#8f9ca3] hover:text-primary-red"
              }`}
              onClick={() => router.push("/demo")}
            >
              Try for free
            </span>
            <span
              className={`cursor-pointer font-sans ${
                isActive("/Information/Pricing")
                  ? "text-primary-red"
                  : "text-[#8f9ca3] hover:text-primary-red"
              }`}
              onClick={() => router.push("/Pricing")}
            >
              Pricing
            </span>
          </div>

          {/* Signup Button (Desktop) */}
          <div className="hidden md:flex gap-2">
            <button
              className="bg-[#ffe8e5] shadow-sm h-8 px-4 rounded-2xl"
              onClick={openModal}
            >
              <span className="text-primary-red font-sans">Signup</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden absolute top-14 left-0 w-full bg-[#f3f7f9] flex flex-col items-start p-4 z-20">
            <span className="text-[#8f9ca3] cursor-pointer font-sans hover:text-primary-red py-2">
              About
            </span>
            {/* <span className="text-[#8f9ca3] cursor-pointer font-sans hover:text-primary-red py-2">
              For Business
            </span> */}
            <a href="/demo">
              <span className="text-[#8f9ca3] cursor-pointer font-sans hover:text-primary-red py-2">
                Try for free
              </span>
            </a>
            <a href="/Pricing">
              <span className="text-[#8f9ca3] cursor-pointer font-sans hover:text-primary-red py-2">
                Pricing
              </span>
            </a>

            <button
              className="bg-[#ffe8e5] shadow-sm h-8 px-4 rounded-2xl mt-4"
              onClick={openModal}
            >
              <span className="text-primary-red font-sans">Signup</span>
            </button>
          </div>
        )}

        <div className="text-center mt-20 px-4 md:px-0">
          <h1 className="text-[#23333e] md:text-[30px] text-xl font-bold animate-slide-fade">
            Streamline Your Educational Institution&apos;s
          </h1>
          <h1 className="text-[#23333e] text-[34px] md:text-[40px] font-bold animate-slide-fade">
            Operations with Ease
          </h1>
          <div className="text-[#8c9499] mt-10 md:mt-4 text-sm animate-fade-delay">
            <p>
              Comprehensive Management Solutions for Attendance, Finances, and
              Events
            </p>
            <p>– Empowering Universities and Schools to Thrive.</p>
          </div>
        </div>

        <div className="flex justify-center items-center flex-grow my-4 px-4 md:px-0">
          <div className="md:w-2/3 flex justify-center items-center bg-white rounded-2xl w md:h-[500px] animate-fade-delay">
            <Image
              src="https://res.cloudinary.com/dhrbg2jbi/image/upload/v1727768563/Screenshot_2024-10-01_131209_nnpd2b.png"
              width={1000}
              height={500}
              alt="hero image"
              priority
            />
          </div>
        </div>

        {/* Feature Cards */}
        <div
          className="flex flex-col justify-center items-center my-10 hidden-element"
          ref={featureCardsRef}
        >
          <div className="md:w-2/3 text-center">
            <p>
              <span className="text-5xl md:text-5xl lg:text-5xl font-bold tracking-tighter bg-gradient-to-b from-primary-red to-slate-200 text-transparent bg-clip-text text-center mt-5">
                Why Choose Us?
              </span>
            </p>
          </div>
          <FeatureCards />
        </div>

        {/* Step Chart */}
        <div
          className="w-full flex justify-center hidden-element min-h-[300px]"
          ref={stepChartRef}
        >
          <StepChart />
        </div>

        <div className="flex justify-center my-10">
          <div className="md:w-2/3">
            <Testimonials />
          </div>
        </div>

        <div className="flex justify-center my-10">
          <div className="md:w-2/3">
            <CallToAction onOpen={openModal} />
          </div>
        </div>

        <div>
          <Footer />
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50">
          <SignupPopup onClose={closeModal} />
        </div>
      )}
    </div>
  );
}
