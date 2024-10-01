"use client"; // Enables client-side rendering for this component
import { motion } from "framer-motion";
import React, { useState, useEffect, useCallback } from "react"; // Import React hooks
import Image from "next/image"; // Import Next.js Image component
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"; // Import custom Carousel components

import { Button } from "@/components/ui/button"; // Import custom Button component
import { PlayIcon, PauseIcon } from "lucide-react"; // Import icons from lucide-react
import AnimatedBackground from "@/components/ui/AnimatedBackground";

// Define the ImageData interface
interface ImageData {
  id: string;
  urls: {
    regular: string;
  };
  alt_description: string;
  description: string;
  user: {
    name: string;
  };
}

export default function ImageSlider() {
  // State to manage the images fetched from the API
  const [images, setImages] = useState<ImageData[]>([]);
  // State to manage the current image index in the carousel
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  // State to manage the play/pause status of the carousel
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const interval = 3000; // Interval for the carousel autoplay

  // Function to fetch images from Unsplash API
  const fetchImages = async (): Promise<void> => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_API_KEY}&per_page=10`
      );
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  // useEffect to fetch images when the component mounts
  useEffect(() => {
    fetchImages();
  }, []);

  // Function to go to the next image
  const nextImage = useCallback((): void => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  // useEffect to handle the autoplay functionality
  useEffect(() => {
    if (isPlaying) {
      const id = setInterval(nextImage, interval);
      return () => clearInterval(id);
    }
  }, [isPlaying, nextImage]);

  // Function to toggle play/pause status
  const togglePlayPause = (): void => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);
  };
    
  console.log(currentIndex, "trying to check index of ")
  // JSX return statement rendering the Image Slider UI

  const AnimatedCircles1 = () => {
    return (
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      >
        <motion.div
          className="absolute w-32 h-32 bg-white rounded-full"
          animate={{ y: [0, 100, 0], x: [0, 100, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
        />
        {/* Add more circles or shapes here */}
      </motion.div>
    );
  };
  const AnimatedCircles = () => {
    return (
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      >
        <motion.div
          className="absolute w-32 h-32 bg-white rounded-full"
          animate={{ y: [0, 0, 100], x: [0, 0, 100] }}
          transition={{ repeat: Infinity, duration: 4 }}
        />
        {/* Add more circles or shapes here */}
      </motion.div>
    );
  };

const AnimatedBackgroundColor = () => {
  const colors = [
    '#FF6F61',
    '#6B5B95',
    '#88B04B',
    '#F7CAC9',
    '#92A8D1',
    '#995951',
    '#2c2cd3',
    '#955801',
    '#955711',

  ];

  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 2000); // Change color every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [colors.length]);
  return (
    <motion.div
      className="absolute inset-0"
      style={{ backgroundColor: colors[currentColorIndex] }}
      transition={{ duration: 1 }}
    />
  );
};

  // globe
  const Globe = () => {
    return (
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <div className="globe" />
      </motion.div>
    );
  };
  return (
    <div className="flex items-center justify-center min-h-screen  custom">
      <AnimatedBackground/>
      <AnimatedBackgroundColor/>
   
      <AnimatedCircles1/>
       <AnimatedCircles/>
      <div className="w-full max-w-2xl mx-auto">
     
        <h1 className="text-3xl font-bold text-center mb-4">Image Slider</h1>
        <p className="text-center text-gray-600 mb-4">
          A simple dynamic image slider/carousel with Unsplash.
        </p>
        <Carousel
          className="rounded-lg overflow-hidden relative"
        >
          <CarouselContent>
          {images.map((image, index) => (
  <CarouselItem
    key={image.id}
    className={`carousel-item ${index === currentIndex ? 'block' : 'hidden'}`}
  >
    <Image
      src={image.urls.regular}
      alt={image.alt_description}
      width={800}
      height={400}
      className="w-[2000px] h-[560px] object-cover shadow-2xl scale-125"
    />
    <div className="p-2 bg-white/75 text-center">
   
      <h2 className="text-lg font-bold">{image.user.name}</h2>
      <p className="text-sm">
        {image.description || image.alt_description}
      </p>
    </div>
  </CarouselItem>
))}

          </CarouselContent>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
          <Button
  variant="ghost"
  size="icon"
  onClick={togglePlayPause}
  className="bg-white/50 hover:bg-white/75 p-2 rounded-full shadow-md transition-transform transform hover:scale-110"
>
  {isPlaying ? (
    <PauseIcon className="w-6 h-6 text-gray-800" />
  ) : (
    <PlayIcon className="w-6 h-6 text-gray-800" />
  )}
  <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>

</Button>

          </div>
        </Carousel>
       
      </div>
      <Globe/>
    </div>
  );
}