interface DashboardCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}
export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  icon,
  children,
  className = "",
}) => (
  <div
    className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 ${className}`}
  >
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-bold text-gray-800">{title}</h3>
      <div className="text-gray-500">{icon}</div>
    </div>
    {children}
  </div>
);
