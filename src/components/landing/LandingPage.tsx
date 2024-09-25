'use client';
import Slideshow from "./Slideshow";
import FeatureCards from "./Whyus";
export default function LandingPage () {
  const images = [
    '/slideshow1.jpg',
    '/slideshow2.jpg',
    '/slideshow3.jpg',
  ];
  return (
    <div className="bg-[#f3f7f9] flex flex-col ">
      <div className="w-full md:w-2/3 flex items-center justify-between mx-auto border-b-2 border-gray-300 md:h-14 px-4">
        <span className="text-[#253b47] font-bold text-lg">campussync</span>
        <div className="flex gap-6">
          <span className="text-[#8f9ca3] cursor-pointer font-sans">About</span>
          <span className="text-[#8f9ca3] cursor-pointer font-sans">For Business</span>
          <span className="text-[#8f9ca3] cursor-pointer font-sans">Try for free</span>
          <span className="text-[#8f9ca3] cursor-pointer font-sans">Pricing</span>
        </div>
        <div className="flex gap-2">
        <button className="border-2 bg-white shadow-sm border-gray-300 h-8 px-4 rounded-2xl">
          <span className="text-black font-sans">Signup</span>
        </button>
        <button className="border-2 bg-white shadow-sm border-gray-300 h-8 px-4 rounded-2xl">
          <span className="text-black font-sans">Signin</span>
        </button>
        </div>
      </div>

      <div className="text-center mt-20">
        <h1 className="text-[#23333e] text-[30px] font-bold">Streamline Your Educational Institution's</h1>
        <h1 className="text-[#23333e] text-[40px] font-bold"> Operations with Ease</h1>
        <div className="text-[#8c9499] mt-4 text-sm" >
          <p >Comprehensive Management Solutions for Attendance, Finances, and Events </p>
          <p>– Empowering Universities and Schools to Thrive.</p>
        </div>
      </div>
      <div className="flex justify-center mt-20 items-center">
      <div className="text-[#ff6f61]  w-2/3">
        <p className="text-[30px] font-bold">Overview</p>
      </div>
      </div>
      <div className="flex justify-center items-center flex-grow my-4 ">
        <div className="w-2/3 flex justify-center items-center bg-white rounded-2xl md:h-[500px]">
          <Slideshow images={images} />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center my-10">
         <div className="w-2/3">
          <p>
            <span className="text-[#ff6f61] font-bold text-[30px]">Why Choose Us ?</span>
          </p>
        </div>
        {/*
        <div className="w-2/3 grid grid-cols-2 gap-4 mt-10">
          <div className="w-[500px] h-[300px] bg-[#bfa6d6] shadow-2xl rounded-lg  flex flex-col text-center">
            <span className="text-[30px] font-bold p-8 text-[#23333e] ">Streamlined leave Application</span>
            <span className="text-[25px] font-bold">Easily apply for leaves with a few clicks,</span>
            <span className="text-[25px] font-bold"> saving time and effort.</span>
          </div>
          <div className="w-[500px] h-[300px] bg-[#d5b5b2] shadow-2xl rounded-lg  flex flex-col text-center">
            <span className="text-[30px] font-bold p-8 text-[#23333e] ">Effortless Attendance Tracking</span>
            <span className="text-[25px] font-bold"> Monitor attendance seamlessly with our</span>
            <span className="text-[25px] font-bold"> intuitive management tools..</span>
          </div>
          <div className="w-[500px] h-[300px] bg-[#a5c6bd] shadow-2xl rounded-lg  flex flex-col text-center">
            <span className="text-[30px] font-bold p-8 text-[#23333e] ">Transparent Financial Management</span>
            <span className="text-[25px] font-bold">Gain insights into finances with </span>
            <span className="text-[25px] font-bold">  real-time tracking and reporting.</span>
          </div>
          <div className="w-[500px] h-[300px] bg-[#9eb1bf] shadow-2xl rounded-lg  flex flex-col text-center">
            <span className="text-[30px] font-bold p-8 text-[#23333e] ">Event Coordination Made Simple</span>
            <span className="text-[25px] font-bold">Plan and manage events effortlessly,</span>
            <span className="text-[25px] font-bold">  ensuring a smooth experience for all.</span>
          </div>
        </div> */}

        <FeatureCards />
      </div>
      
    </div>
  )
}