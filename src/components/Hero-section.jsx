import { useState, useEffect } from "react";

const images = [
  {
    url: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=1920&h=700&q=85",
    alt: "Electronics and gadgets",
    position: "center",
  },
  {
    url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1920&h=700&q=85",
    alt: "Fashion shopping collection",
    position: "center",
  },
  {
    url: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=1920&h=700&q=85",
    alt: "Featured sneakers",
    position: "center",
  },
];

function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-60 sm:h-75 md:h-90 lg:h-105 overflow-hidden bg-slate-900">
      {images.map((image, index) => (
        <img
          key={image.url}
          src={image.url}
          alt={image.alt}
          loading={index === 0 ? "eager" : "lazy"}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            current === index ? "opacity-100" : "opacity-0"
          }`}
          style={{ objectPosition: image.position }}
        />
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-slate-950/50 via-slate-900/20 to-transparent" />

      {/* Banner text */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300 sm:text-base">
            Discover More
          </p>

          <h1 className="text-3xl font-extrabold text-white drop-shadow-lg sm:text-4xl md:text-5xl lg:text-6xl">
            Big Sale <span>🔥</span>
          </h1>

          <p className="mt-3 text-sm font-medium text-white drop-shadow sm:text-base md:text-lg">
            Great deals on your favorite products
          </p>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {images.map((image, index) => (
          <button
            key={image.url}
            type="button"
            onClick={() => setCurrent(index)}
            aria-label={`Show banner ${index + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              current === index
                ? "w-8 bg-cyan-400"
                : "w-2 bg-white/70 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default Hero;