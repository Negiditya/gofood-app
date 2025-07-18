import { useState, useEffect } from "react";

// Image array outside the component
const foodImages = [
  "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1600&q=80",
];

export default function CustomCarousel({ searchTerm, setSearchTerm }) {
  const [index, setIndex] = useState(0);



  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Manual controls
  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? foodImages.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setIndex((prev) => (prev === foodImages.length - 1 ? 0 : prev + 1));
  };





  return (
    <div className="relative w-full h-[500px]">
      {/* Background image with smooth transition */}
      <div className="absolute inset-0">
        <img
          src={foodImages[index]}
          alt={`Food carousel slide ${index + 1}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Hero content */}
      <div className="absolute inset-0 flex items-center justify-center px-4">

        {/* Enhanced search bar */}

        <div className="flex w-full max-w-2xl">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search dishes..."
            className="flex-1 px-6 py-4 text-lg bg-white text-black rounded-xl"
          />
        </div>

      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 text-white p-2 rounded-full"
      >
        ❮
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 text-white p-2 rounded-full"
      >
        ❯
      </button>
    </div>
  );
}


