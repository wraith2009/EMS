"use client";
import FooterPage from "@/src/components/auth/footer";
import Header from "@/src/components/auth/Header";
import React from "react";
import QuestionsList from "./questionList";
import Particles from "@/src/components/ui/particles";
interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonLabel: string;
  buttonLink: string;
  isPopular?: boolean;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  price,
  description,
  features,
  buttonLabel,
  buttonLink,
  isPopular = false,
}) => {
  return (
    <div
      className={`border rounded-3xl py-10 px-6 shadow-lg ${isPopular ? "bg-gradient-to-r from-primary-red to-red-200 text-white" : "bg-white text-gray-900"} max-w-sm`}
    >
      <div className="text-center">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p
          className={`text-4xl font-bold ${isPopular ? "text-white" : "text-primary-red"}`}
        >
          {price}
        </p>
        <p className="mt-2 mb-4 text-gray-500">{description}</p>
        <ul className="space-y-2 text-left">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center space-x-2">
              <span className="text-primary-red" style={{ color: "red" }}>
                ✔️
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <a
          href={buttonLink}
          className={`block w-full mt-6 text-center px-4 py-2 rounded-full font-semibold ${isPopular ? "bg-white text-primary-red" : "bg-primary-red text-white"} hover:opacity-90`}
        >
          {buttonLabel}
        </a>
      </div>
    </div>
  );
};

const Pricing = () => {
  const pricingPlans: PricingCardProps[] = [
    {
      title: "Starter",
      price: "Free",
      description: "For those getting started with CampusSync",
      features: [
        "7 days of trial",
        "Manage up to 50 Students",
        "Manage up to 10 tutors",
        "No Payment Integration",
        "No video lectures",
        "Post up to 10 events",
        "For small businesses",
      ],
      buttonLabel: "Start 7 day free trial",
      buttonLink: "#",
      isPopular: false,
    },
    {
      title: "Basic",
      price: "$9.99 /month",
      description: "For better experience with CampusSync",
      features: [
        "Manage up to 300 students",
        "Manage up to 50 teachers",
        "100 payment instances",
        "Upload your lectures",
        "Class-specific chatroom",
        "Post up to 100 events/month",
        "For medium businesses",
      ],
      buttonLabel: "Start 7 day free trial",
      buttonLink: "#",
      isPopular: false,
    },
    {
      title: "Business",
      price: "$29.99 /month",
      description: "For the best experience with CampusSync",
      features: [
        "Manage any number of Students",
        "Manage any number of faculty",
        "Payment Integration",
        "Class-specific chatroom",
        "AI Assistant",
        "Post any number of events",
        "For universities",
      ],
      buttonLabel: "Contact Us",
      buttonLink: "#",
      isPopular: true,
    },
  ];

  const faqQuestions = [
    {
      question: "What is CampusSync?",
      answer:
        "CampusSync is a comprehensive platform designed to manage educational institutes.",
    },
    {
      question: "Can I upgrade or downgrade my plan?",
      answer:
        "Yes, you can upgrade or downgrade your plan at any time from your account settings.",
    },
    {
      question: "How can I contact support?",
      answer: "You can reach out to our support team via email or phone, 24/7.",
    },
  ];
  return (
    <div className="bg-[#f3f7f9] ">
      <div className="flex flex-col justify-between min-h-screen  mx-auto px-4 sm:px-6 md:px-20  max-w-7xl">
        <Header />
        <Particles
          className="absolute inset-0"
          quantity={500}
          ease={80}
          color="#ff6f61"
          size={0.8}
          refresh
        />
        <div className="md:my-12 flex justify-center items-center">
          <div className="text-center mt-10 w-fit ">
            <h1 className="text-3xl  font-bold text-[#676767]">
              Transparent Pricing Plans for Every{" "}
              <span className="text-primary-red">Educational Institute</span>
            </h1>

            {/* Responsive grid layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-between mx-auto my-8 px-4 lg:px-0">
              {pricingPlans.map((plan, index) => (
                <PricingCard key={index} {...plan} />
              ))}
            </div>
            {/* <div className="my-8 flex flex-col">
            <span className="text-primary-red">Scale your website</span>
            <span className="text-xl px-4 text-[#676767] mt-4">
              Empower your institution with seamless management—everything you
              need to run smarter, all in one subscription!
            </span>
          </div> */}
            <div className="my-8 flex flex-col items-center text-center  rounded-3xl p-8">
              <span className="text-primary-red flex items-center justify-center text-2xl font-semibold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-primary-red mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7H7v6h6m5 5l-7-7m7 7V8a2 2 0 00-2-2h-7.5"
                  />
                </svg>
                Scale Your Website
              </span>

              <span className="text-xl px-4 text-[#676767] mt-4">
                Empower your institution with seamless management—everything you
                need to run smarter, all in one subscription!
              </span>

              {/* Key Features Section */}
              <ul className="mt-6 space-y-4 text-left text-lg text-[#676767] max-w-lg mx-auto">
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary-red mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Seamless student and staff management
                </li>
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary-red mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Real-time event and schedule tracking
                </li>
                <li className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-primary-red mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Integrated payments and invoicing
                </li>
              </ul>

              {/* Call to Action */}
              <a
                href="/learn-more"
                className="mt-8 bg-primary-red text-white font-semibold px-6 py-2 rounded-full hover:bg-opacity-90"
              >
                Learn More
              </a>

              {/* Testimonial */}
              <div className="mt-8 max-w-lg mx-auto text-gray-500 italic">
                <p className="text-sm">
                  “CampusSync transformed our institution’s management.
                  Everything is streamlined, and we’ve saved countless hours!” —
                  Jane Doe, University Admin
                </p>
              </div>
            </div>

            <div className="my-8 flex flex-col">
              <span className="text-primary-red">
                Frequently Asked Questions
              </span>
              <span className="text-3xl text-[#676767] font-bold mt-4">
                Have Any Questions?
              </span>

              <QuestionsList questions={faqQuestions} />
            </div>
          </div>
        </div>
      </div>
      <FooterPage />
    </div>
  );
};

export default Pricing;
