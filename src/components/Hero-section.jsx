
import { useState, useEffect } from "react";

const images = [
  "https://plus.unsplash.com/premium_photo-1718913936342-eaafff98834b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dCUyMHNoaXJ0fGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1628911772801-99aa42a1d2c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZWxlY3Ryb25pYyUyMGl0ZW1zfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNob2VzfGVufDB8fDB8fHww",
];

function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-auto h-75 md:h-100 overflow-hidden relative">
      <img
        src={images[current]}
        alt="Featured products"
        className="w-full h-full object-cover object-top transition-all duration-700"
      />

      {/* Overlay text */}
      <div className="absolute inset-0 flex items-center justify-center text-white text-3xl font-bold bg-black/30">
        Big Sale 🔥
      </div>
    </div>
  );
}

export default Hero;