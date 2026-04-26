"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({ images }: { images: string[] }) {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="flex flex-col gap-4">
      {/* Main Large Image */}
      <div className="relative overflow-hidden rounded-xl bg-[#F8F9FA] aspect-[4/5] flex items-center justify-center border border-gray-100">
        <img
          src={activeImage}
          alt="Product preview"
          className="object-contain w-full h-full mix-blend-multiply"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(img)}
            className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
              activeImage === img ? "border-green-600" : "border-gray-200 hover:border-green-400"
            }`}
          >
            <div className="absolute inset-0 bg-[#F8F9FA]" />
            <img
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className="relative z-10 w-full h-full object-contain mix-blend-multiply"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
