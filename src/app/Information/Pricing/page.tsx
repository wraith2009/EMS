import FooterPage from "@/src/components/auth/footer";
import Header from "@/src/components/auth/Header";
import React from "react";

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

  return (
    <div className="flex flex-col bg-[#f3f7f9] justify-between min-h-screen">
      <Header />
      <div className="my-8 flex justify-center items-center">
        <div className="text-center mt-10 w-fit lg:w-2/3">
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
          <div className="my-8 flex flex-col">
            <span className="text-primary-red">Scale your website</span>
            <span className="text-xl px-4 text-[#676767] mt-4">
              Empower your institution with seamless management—everything you
              need to run smarter, all in one subscription!
            </span>
          </div>
          <div className="my-8 flex flex-col">
            <span className="text-primary-red">Frequently Asked Questions</span>
            <span className="text-3xl text-[#676767] font-bold mt-4">
              Have Any Questions?
            </span>
          </div>
        </div>
      </div>
      <FooterPage />
    </div>
  );
};

export default Pricing;
