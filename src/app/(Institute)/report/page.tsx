"use client";
import React from "react";
import { Calendar, Clock, Users, AlertCircle } from "lucide-react";
import { GetAttendanceReport } from "@/src/actions/attendence.action";

interface AttendanceData {
  totalClasses: number;
  presentClasses: number;
  absentClasses: number;
}

interface ReportData {
  daily: AttendanceData;
  weekly: AttendanceData;
  monthly: AttendanceData;
}

const AttendanceReport = () => {
  // Demo data for fallback
  const demoData: ReportData = {
    daily: {
      totalClasses: 4,
      presentClasses: 3,
      absentClasses: 1,
    },
    weekly: {
      totalClasses: 20,
      presentClasses: 17,
      absentClasses: 3,
    },
    monthly: {
      totalClasses: 80,
      presentClasses: 73,
      absentClasses: 7,
    },
  };

  const [reportData, setReportData] = React.useState<ReportData>(demoData);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [isUsingDemoData, setIsUsingDemoData] = React.useState(false);

  React.useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await GetAttendanceReport({ user_id: "your-user-id" });
        if (response.success) {
          if (response.data) {
            setReportData(response.data);
          } else {
            throw new Error("Response data is undefined");
          }
          setIsUsingDemoData(false);
        } else {
          console.warn("Failed to fetch real data, falling back to demo data");
          setReportData(demoData);
          setIsUsingDemoData(true);
          setError(response.error);
        }
      } catch (err) {
        console.warn("Error fetching data, falling back to demo data", err);
        setReportData(demoData);
        setIsUsingDemoData(true);
        setError("Failed to fetch attendance data");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, []);

  const AttendanceCard = ({
    title,
    data,
    icon: Icon,
  }: {
    title: string;
    data: AttendanceData;
    icon: React.ElementType;
  }) => (
    <div className="w-full bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <Icon className="h-5 w-5 text-red-600" />
      </div>

      <div className="p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4 pb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">
                {data.totalClasses}
              </div>
              <div className="text-xs text-gray-600">Total Classes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {data.presentClasses}
              </div>
              <div className="text-xs text-gray-600">Present</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {data.absentClasses}
              </div>
              <div className="text-xs text-gray-600">Absent</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Attendance Rate</span>
              <span className="font-medium">
                {Math.round(
                  (data.presentClasses / (data.totalClasses || 1)) * 100,
                )}
                %
              </span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all duration-500"
                style={{
                  width: `${(data.presentClasses / (data.totalClasses || 1)) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading attendance data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Attendance Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Track your attendance across different time periods
              </p>
            </div>
            {isUsingDemoData && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-yellow-500" />
                <span className="text-sm text-yellow-700">
                  Using demo data due to connection issues
                </span>
              </div>
            )}
          </div>
          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AttendanceCard
            title="Today's Attendance"
            data={reportData.daily}
            icon={Clock}
          />
          <AttendanceCard
            title="This Week"
            data={reportData.weekly}
            icon={Calendar}
          />
          <AttendanceCard
            title="This Month"
            data={reportData.monthly}
            icon={Users}
          />
        </div>

        <div className="mt-8 bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Quick Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-red-50 rounded-lg">
              <h3 className="text-lg font-semibold text-red-800">
                Overall Attendance Rate
              </h3>
              <p className="text-3xl font-bold text-red-600 mt-2">
                {Math.round(
                  (reportData.monthly.presentClasses /
                    reportData.monthly.totalClasses) *
                    100,
                )}
                %
              </p>
              <p className="text-sm text-red-700 mt-1">This Month</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800">
                Classes Attended
              </h3>
              <p className="text-3xl font-bold text-gray-700 mt-2">
                {reportData.monthly.presentClasses}/
                {reportData.monthly.totalClasses}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Total Classes This Month
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceReport;
