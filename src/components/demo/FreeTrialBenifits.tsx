import React from "react";
import { Shield, Users, Headset, CreditCard } from "lucide-react";

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({
  icon,
  title,
  description,
}) => (
  <div className="bg-white px-3 py-3 rounded-lg shadow-lg flex flex-col items-center text-center">
    <div className="text-primary-red mb-4">{icon}</div>
    <h3 className="text-[#23333e] text-xl font-semibold mb-2">{title}</h3>
    <p className="text-[#8c9499]">{description}</p>
  </div>
);

const FreeTrealBenefits: React.FC = () => (
  <div className="mt-20">
    <h2 className="text-[#23333e] text-2xl md:text-3xl font-bold text-center mb-8">
      What You Get with Your Free Trial
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <BenefitCard
        icon={<Shield size={48} />}
        title="Full Access"
        description="Enjoy all premium features without limitations during your trial"
      />
      <BenefitCard
        icon={<Users size={48} />}
        title="Unlimited Users"
        description="Add as many user accounts as you need for your institution"
      />
      <BenefitCard
        icon={<Headset size={48} />}
        title="24/7 Support"
        description="Get round-the-clock assistance throughout your trial period"
      />
      <BenefitCard
        icon={<CreditCard size={48} />}
        title="No Credit Card"
        description="Start your trial without entering any payment information"
      />
    </div>
  </div>
);

export default FreeTrealBenefits;
