"use client";
import React, { useState } from "react";
import { FaTwitter, FaLinkedin, FaEnvelope, FaCheck } from "react-icons/fa";
import FooterPage from "@/src/components/auth/footer";
import Header from "@/src/components/auth/Header";
import FreeTrealBenefits from "@/src/components/demo/FreeTrialBenifits";
import Particles from "@/src/components/ui/particles";
import { Marquee } from "@/src/components/magicui/marquee";
import { cn } from "@/lib/utils";
import Image from "next/image";
const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "James",
    username: "@james",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://avatar.vercel.sh/james",
  },
];

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-fullcursor-pointer overflow-hidden rounded-xl border p-4",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};
const Demo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");

  const handleSendQuery = () => {
    console.log("Email:", email);
    console.log("Query:", query);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="bg-[#f3f7f9] no-scrollbar flex flex-col justify-between">
        <Particles
          className="absolute inset-0 min-h-full"
          quantity={300}
          ease={80}
          color="#ff6f61"
          size={0.8}
          refresh
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-20 relative">
          <Header />

          {/* Hero Section */}
          <div className="flex flex-col-reverse md:flex-row items-center justify-between py-2 md:py-8 gap-2 md:gap-8">
            <div className="md:w-1/2">
              <h1 className="text-[#23333e] text-4xl md:text-5xl font-bold leading-tight">
                Transform Your Business with Our
                <span className="text-primary-red"> 30-Day Free Trial</span>
              </h1>
              <p className="text-[#8c9499] mt-6 text-lg">
                Experience all premium features with no commitments. Join
                thousands of satisfied users who have revolutionized their
                workflow.
              </p>
              <div className="md:mt-8 mt-2 md:space-y-4 space-y-2">
                <button className="bg-primary-red text-white md:py-3 py-1 md:px-8 px-2 rounded-full text-lg font-semibold shadow-lg hover:bg-red-600 transform transition hover:scale-105">
                  Start Free Trial
                </button>
                <div className="flex items-center md:gap-2 text-sm text-[#8c9499]">
                  <FaCheck className="text-primary-red" />
                  <span>No credit card required</span>
                </div>
              </div>
            </div>
            <div className="w-1/2 md:flex hidden border-black justify-end">
              <Image
                src="https://res.cloudinary.com/dhrbg2jbi/image/upload/v1730119632/iPhone_15_Mockup_Perspective_fvgtpj.png"
                alt="demo screen"
                width={400}
                height={550}
              />
            </div>
            <div className="h-[500px] md:hidden flex border-black justify-end">
              <Image
                src="https://res.cloudinary.com/dhrbg2jbi/image/upload/v1730119632/iPhone_15_Mockup_Perspective_fvgtpj.png"
                alt="demo screen"
                width={400}
                height={400}
              />
            </div>
          </div>

          <div className="py-6 hidden md:flex">
            <Marquee
              pauseOnHover
              className="[--duration:20s] grid grid-cols-3 md:grid-cols-none md:flex gap-4"
            >
              {reviews.map((review) => (
                <ReviewCard key={review.username} {...review} />
              ))}
            </Marquee>
          </div>

          <FreeTrealBenefits />

          {/* Features Preview */}
          <div className="py-16">
            <h2 className="text-3xl font-bold text-center text-[#23333e] mb-12">
              Everything You Need to Succeed
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Advanced Analytics",
                  description:
                    "Get deep insights into your business performance",
                  image:
                    "https://res.cloudinary.com/dhrbg2jbi/image/upload/v1730120421/UwA2u8x9TvG9NFnl0nmdLQ_ihyy1v.webp",
                },
                {
                  title: "Team Collaboration",
                  description: "Work seamlessly with your team members",
                  image:
                    "https://res.cloudinary.com/dhrbg2jbi/image/upload/v1730120420/pixlr-image-generator-cf36f140-45b4-4e11-a686-d8eb3a14adb5_qbpaxj.webp",
                },
                {
                  title: "24/7 Support",
                  description: "Expert help whenever you need it",
                  image:
                    "https://res.cloudinary.com/dhrbg2jbi/image/upload/v1730120420/preview_inte41.webp",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center"
                >
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="mb-4 h-[100px]"
                  />
                  <h3 className="text-xl font-semibold text-[#23333e] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-[#8c9499]">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="py-8 text-center">
            <h2 className="text-[#23333e] text-3xl font-bold mb-6">
              Have Questions? We&apos;re Here to Help!
            </h2>
            <p className="text-[#8c9499] mb-8">
              Reach out via email or connect with us on social media.
            </p>

            <div className="flex justify-center gap-6 mb-8">
              <a
                href="#"
                className="text-primary-red hover:text-red-600 transform transition hover:scale-110"
              >
                <FaTwitter size={28} />
              </a>
              <a
                href="#"
                className="text-primary-red hover:text-red-600 transform transition hover:scale-110"
              >
                <FaLinkedin size={28} />
              </a>
              <a
                href="#"
                className="text-primary-red hover:text-red-600 transform transition hover:scale-110"
              >
                <FaEnvelope size={28} />
              </a>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-primary-red text-white py-3 px-8 rounded-full text-lg font-semibold shadow-lg hover:bg-red-600 transform transition hover:scale-105"
            >
              Send Us Your Query
            </button>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-sm">
            <div className="relative bg-white p-8 rounded-2xl shadow-xl max-w-md w-full mx-4">
              <div className="flex flex-col items-center">
                <h2 className="text-2xl font-bold text-[#23333e] mb-6">
                  Send Your Query
                </h2>
                <form className="w-full space-y-4">
                  <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent"
                  />
                  <textarea
                    placeholder="Your query"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-red focus:border-transparent"
                    rows={4}
                  ></textarea>
                  <button
                    type="button"
                    onClick={handleSendQuery}
                    className="w-full bg-primary-red text-white rounded-full py-3 px-6 font-semibold shadow-lg hover:bg-red-600 transform transition hover:scale-105"
                  >
                    Send Query
                  </button>
                </form>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
                aria-label="Close query modal"
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
      <FooterPage />
    </div>
  );
};

export default Demo;
