"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { product } from "@/app/interfaces";
import CardImage from "../Products/ProductCard";

export default function RelatedProductsCarousel({ products }: { products: product[] }) {
  if (!products || products.length === 0) return null;

  return (
    <div className="w-full mt-16 pb-10">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-1.5 h-6 bg-green-600 rounded-full" />
        <h2 className="text-xl font-bold text-gray-900">
          You May Also <span className="text-green-600">Like</span>
        </h2>
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{
            clickable: true,
            renderBullet: function (index, className) {
              return `<span class="${className} bg-green-600! w-2.5! h-2.5!"></span>`
            },
            bulletActiveClass:"w-6! bg-green-600! opacity-100! rounded-full! swiper-pagination-bullet-active"
        }}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        className="pb-12 px-2"
      >
        {products.map((p) => (
          <SwiperSlide key={p._id}>
            <div className="py-2">
               <CardImage product={p} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
