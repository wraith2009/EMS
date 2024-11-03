import React from "react";
import Particles from "../ui/particles";
import Header from "../auth/Header";
import Image from "next/image";
import Footer from "../landing/footer";
const AboutSection = () => {
  return (
    <div className="h-full w-full">
      <div className="bg-[#f3f7f9] flex flex-col gap-6 items-center md:px-32 ">
        <Particles
          className="absolute inset-0"
          quantity={500}
          ease={80}
          color="#ff6f61"
          size={0.8}
          refresh
        />
        <div className="md:px-20 w-full">
          <Header />
        </div>
        <div className="px-4 md:px-40 flex flex-col gap-6 justify-center animate-slide-fade">
          <h1 className="text-primary-red md:text-4xl text-xl text-center font-bold">
            Because managing schools shouldn’t
          </h1>
          <div className="flex justify-center gap-2">
            <h1 className="text-primary-red md:text-4xl text-xl text-center font-bold animate-slide-fade">
              require magic, just
            </h1>
            <div className="relative inline-block text-center">
              <span className="relative z-10 md:text-4xl text-xl font-bold px-4 text-white pb-8">
                smart tech
              </span>
              <span
                className="absolute inset-0 bg-primary-red -skew-y-3 transform px-4 py-2 -bottom-4 -top-2 rounded-md"
                aria-hidden="true"
              ></span>
            </div>
          </div>
        </div>
        <div className="max-h-[550px] min-w-[600px] overflow-hidden z-10">
          <Image
            src={
              "https://res.cloudinary.com/dhrbg2jbi/image/upload/v1730644332/Macbook_Mockup_Front_View_UV_wk2oyr.png"
            }
            alt="about us bg"
            height={550}
            width={800}
            className=""
          />
        </div>
        {/* Who we Are */}
        <div className="flex justify-between mt-16 md:px-20 gap-8  w-full">
          {/* title and description */}
          <div className="max-w-2/3 w-full flex flex-col gap-4">
            <h1 className="text-3xl font-bold text-[#23333e]">Who we are</h1>
            <div className="text-[#8c9499] text-lg flex flex-col gap-2">
              <p>
                We&apos;re your partner in smarter, simpler education
                management.
              </p>
              <p>
                <span className="font-semibold">CampusSync</span> is a
                full-fledged educational institute management software, designed
                to streamline how schools and institutions manage and track
                their students and staff. Our platform is built to make the
                day-to-day operations of educational institutions easier, more
                efficient, and more connected.
              </p>
              <p>
                With a passion for innovation, we bring smart solutions like our
                AI-powered attendance system, where teachers can mark attendance
                with just a snap of the class photo. From tracking performance
                to managing schedules and beyond, CampusSync takes the hassle
                out of administration so schools can focus on what matters most—
                <span className="font-semibold">education.</span>
              </p>
            </div>
          </div>
          {/* image */}
          <div className="w-[40%]">
            <Image
              src={
                "https://res.cloudinary.com/dhrbg2jbi/image/upload/c_crop,w_600,h_650,g_auto/v1729231721/Untitled_design_1__page-0001_bngic2.jpg"
              }
              alt="who we are logo"
              height={400}
              width={400}
              className=""
            />
          </div>
        </div>

        {/* Cards Section */}
        <div className="flex flex-col md:flex-row justify-center gap-6 mt-10 px-20">
          {/* Card 1 */}
          <div className=" p-6 shadow-lg rounded-lg flex flex-col items-center text-center max-w-sm">
            <div className="flex justify-center items-center  mb-4">
              <Image
                src={
                  "https://res.cloudinary.com/dhrbg2jbi/image/upload/c_crop,ar_1:1/v1729236377/Lzk1eyfNSt-Vb7GR5Ae3Rw_xr8iuv.webp"
                }
                alt="Our mission compass"
                width={150}
                height={150}
                className="rounded-xl"
              />
            </div>
            <h3 className="text-xl font-bold text-[#23333e]">Our Mission</h3>
            <p className="text-[#8c9499] mt-2">
              We aim to revolutionize education management by making it smarter
              and simpler with cutting-edge technology.
            </p>
          </div>

          {/* Card 2 */}
          <div className=" p-6 shadow-lg rounded-lg flex flex-col items-center text-center max-w-sm">
            <div className="flex justify-center items-center  mb-4">
              <Image
                src={
                  "https://res.cloudinary.com/dhrbg2jbi/image/upload/v1729236376/7SSVEU2pTJysRumggC5WkA_clzxrw.jpg"
                }
                alt="Our mission compass"
                width={150}
                height={150}
                className="rounded-xl"
              />
            </div>
            <h3 className="text-xl font-bold text-[#23333e]">Our Vision</h3>
            <p className="text-[#8c9499] mt-2">
              Connecting institutions, empowering education, and driving
              innovation with technology for better learning experiences.
            </p>
          </div>

          {/* Card 3 */}
          <div className=" p-6 shadow-lg rounded-lg flex flex-col items-center text-center max-w-sm">
            <div className="flex justify-center items-center  mb-4">
              <Image
                src={
                  "https://res.cloudinary.com/dhrbg2jbi/image/upload/v1729237215/Y19jcm9wLGFyXzE6MSxlX2ltcHJvdmUsZV9zaGFycGVu-removebg-preview_ajbla3.png"
                }
                alt="Our mission compass"
                width={150}
                height={150}
                className="rounded-xl"
              />
            </div>
            <h3 className="text-xl font-bold text-[#23333e]">Our Promise</h3>
            <p className="text-[#8c9499] mt-2">
              We promise to simplify school management with reliable, smart
              solutions that make administration effortless.
            </p>
          </div>
        </div>
        {/* Team */}
        <div className="w-full px-20">
          <div className="flex  min-w-full justify-start border-b-2">
            {/* <p className="text-2xl  font-bold text-[#23333e]">Team</p> */}
          </div>
          <div className="flex justify-between py-10 gap-8">
            {/* left */}
            <div className=" flex flex-col gap-4 w-[60%]">
              <h1 className="text-3xl  font-bold text-[#23333e]">
                Meet the Team
              </h1>
              <p className="text-[#8c9499] text-lg">
                Our small but dedicated team consists of two passionate
                individuals with complementary skills. As college friends turned
                co-founders, we bring together our diverse expertise in
                technology and education. This unique blend allows us to craft
                innovative solutions that make a real difference in the academic
                world.
              </p>
            </div>
            <div className="border-4 w-[40%]">An image of rahul and mayank</div>
          </div>
        </div>
        {/* footer */}
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default AboutSection;
