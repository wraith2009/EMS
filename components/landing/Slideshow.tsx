'use client';
import React, { useState, useEffect } from 'react';

interface SlideshowProps {
  images: string[];
}

const Slideshow: React.FC<SlideshowProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isManual, setIsManual] = useState(false);

  useEffect(() => {
    if (isManual) return; 
    const intervalId = setInterval(() => {
      nextImage();
    }, 2000); 

    return () => clearInterval(intervalId);
  }, [currentImageIndex, isManual]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const previousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
    setIsManual(true); // stop the automatic slide
  };

  return (
    <div className="relative w-2/3 m-4 h-[400px] ">
      
      <div className="image-container">
        <img
          src={images[currentImageIndex]}
          alt={`Slide ${currentImageIndex + 1}`}
          className="w-full h-[400px] rounded-lg"
        />
      </div>

      <div className="flex justify-center space-x-2 mt-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`dot w-3 h-3 rounded-full cursor-pointer ${
              index === currentImageIndex
                ? 'bg-gray-600'
                : 'bg-gray-300'
            }`}
            onClick={() => selectImage(index)}
          />
        ))}
      </div>
{/* 
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
        onClick={previousImage}
      >
        &#10094;
      </button>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
        onClick={nextImage}
      >
        &#10095;
      </button> */}
    </div>
  );
};

export default Slideshow;
