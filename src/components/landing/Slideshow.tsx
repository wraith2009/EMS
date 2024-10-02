// "use client";
// import React, { useState, useEffect } from "react";
// import Image from "next/image";

// interface SlideshowProps {
//   images: string[];
// }

// const Slideshow: React.FC<SlideshowProps> = ({ images }) => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isManual, setIsManual] = useState(false);

//   const nextImage = () => {
//     setCurrentImageIndex((prevIndex) =>
//       prevIndex === images.length - 1 ? 0 : prevIndex + 1,
//     );
//   };

//   useEffect(() => {
//     if (isManual) return;
//     const intervalId = setInterval(() => {
//       nextImage();
//     }, 5000);

//     return () => clearInterval(intervalId);
//   }, [currentImageIndex, isManual]);

//   const selectImage = (index: number) => {
//     setCurrentImageIndex(index);
//     setIsManual(true);
//     setTimeout(() => setIsManual(false), 10000);
//   };

//   return (
//     <div className="relative w-2/3 m-4 h-[400px] overflow-hidden">
//       <div
//         className="image-container flex transition-transform duration-500 ease-in-out"
//         style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
//       >
//         {images.map((image, index) => (
//           <div
//             key={index}
//             className="relative w-full h-[400px] flex-shrink-0"
//             style={{ position: "relative", width: "100%", height: "400px" }}
//           >
//             <Image
//               src={image}
//               alt={`Slide ${index + 1}`}
//               layout="fill"
//               objectFit="cover"
//               className="rounded-lg"
//             />
//           </div>
//         ))}
//       </div>

//       <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center space-x-2">
//         {images.map((_, index) => (
//           <div
//             key={index}
//             className={`dot w-3 h-3 rounded-full cursor-pointer transition-colors duration-300 ${
//               index === currentImageIndex ? "bg-gray-600" : "bg-gray-300"
//             }`}
//             onClick={() => selectImage(index)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Slideshow;
