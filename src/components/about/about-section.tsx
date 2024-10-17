import React from "react";
import Particles from "../ui/particles";
const AboutSection = () => {
  return (
    <div>
      <Particles
        className="absolute inset-0 "
        quantity={500}
        ease={80}
        color="#ff6f61"
        size={0.8}
        refresh
      />
      <div className="mt-20 px-4 md:px-40">
        <h1 className="text-[#23333e] md:text-[30px] text-xl font-bold animate-slide-fade">
          About CampusSync
        </h1>

        <div className="text-[#8c9499] mt-10 md:mt-4 text-sm animate-fade-delay ">
          <p className="text-lg">
            CampusSync is a comprehensive management solution for attendance,
            finances and events empowering universities and schools to thrive.
            <br></br>
            With special focus on solving a problem that is faced by almost
            every major educational institution in the country that is managing
            student attendance.
            <br></br>
            <p className="font-bold text-lg">
              Doing this manually has many challenges like{" "}
            </p>
            <ul>
              <li>It is time consuming </li>
              <li>Prone to human errors </li>
              <li>Lack real time analytics</li>
            </ul>
            To solve this we are leveraging the use of artificial intelligence
            and machine learning to automate this whole process and provide a
            seamless experience to both students and faculties
            <br></br>
            Key features
            <ul>
              <li>Student registration and facial recognition </li>
              <li>Automated attendance via photo upload </li>
              <li>Attendance review and editing</li>
              <li>Report generation</li>
              <li>
                Notification system and for multi class and multi faculty
                support
              </li>
            </ul>
            The app will feature a performant and intuitive ui for a pleasant
            onboarding experience for both students and management
          </p>
        </div>
      </div>
    </div>
  );
};
export default AboutSection;
