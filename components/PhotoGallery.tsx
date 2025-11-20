import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote, Heart, Pause, Play } from "lucide-react";
import { photoGalleryData } from "../assets/Data/MonthsarryData";

export const PhotoGallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const current = photoGalleryData[activeIndex];

  /** Auto play */
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(
      () => setActiveIndex((i) => (i + 1) % photoGalleryData.length),
      4000
    );

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrev = () =>
    setActiveIndex((i) => (i - 1 + photoGalleryData.length) % photoGalleryData.length);

  const handleNext = () =>
    setActiveIndex((i) => (i + 1) % photoGalleryData.length);

  return (
    <div className="relative max-w-5xl mx-auto px-4 py-8">

      {/* Heading */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-3 bg-rose-50 rounded-full mb-4 shadow-sm">
          <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
        </div>
        <h2 className="text-3xl md:text-4xl font-serif text-gray-800 mb-3">
          Our Gallery
        </h2>
        <p className="text-gray-500 italic font-serif">Snapshots of our love story</p>
      </div>

      {/* Carousel */}
      <div className="relative">

        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-12 z-20 p-3 bg-white/80 rounded-full shadow-lg hover:scale-110 transition"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-12 z-20 p-3 bg-white/80 rounded-full shadow-lg hover:scale-110 transition"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Card */}
        <div className="relative bg-white p-4 md:p-6 pb-12 shadow-2xl rotate-1 mx-auto max-w-3xl">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-rose-100/50 rotate-[-2deg]"></div>

          {/* Main Image */}
          <div className="relative aspect-video md:aspect-[4/3] overflow-hidden bg-gray-100 mb-6 group">
            <img
              src={current.src}
              alt="Monthsarry memory"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Date overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 p-4 opacity-0 group-hover:opacity-100 transition">
              <span className="text-white text-sm uppercase">
                {current.date}
              </span>
            </div>
          </div>

          {/* Caption */}
          <div className="text-center px-4">
            <Quote className="w-8 h-8 text-rose-200 mx-auto mb-2 rotate-180" />
            <p className="font-serif text-xl md:text-2xl text-gray-800">
              {current.caption}
            </p>
          </div>
        </div>

        {/* Background Layer */}
        <div className="absolute top-4 left-4 right-4 bottom-0 bg-white shadow-lg -rotate-2 -z-10 rounded-sm"></div>
      </div>

      {/* Controls */}
      <div className="mt-12 flex flex-col items-center gap-6">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="text-xs font-bold uppercase tracking-widest text-rose-400 hover:text-rose-600 transition"
        >
          {isAutoPlaying ? (
            <>
              <Pause className="w-4 h-4 inline" /> Pause Slideshow
            </>
          ) : (
            <>
              <Play className="w-4 h-4 inline" /> Play Slideshow
            </>
          )}
        </button>

        {/* Thumbnails */}
        <div className="flex gap-2 md:gap-4 overflow-x-auto p-2 max-w-full">
          {photoGalleryData.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveIndex(index);
                setIsAutoPlaying(false);
              }}
              className={`relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                activeIndex === index
                  ? "border-rose-500 ring-2 ring-rose-200 scale-110"
                  : "opacity-60 hover:opacity-80"
              }`}
            >
              <img src={item.src} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
