"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/app/loading";
import Getcatogries from "@/api/catogries.api";

interface Category {
  _id: string;
  name: string;
  image: string;
}

export default function CategoriesCarousel() {
  const { data: categories, isError, isLoading, error } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: Getcatogries,
  });

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <h2 className="text-red-500 text-center py-8">
        {(error as Error).message}
      </h2>
    );

  return (
    <div className="py-10">
      <h2 className="text-2xl font-bold text-main mb-6">Shop by Category</h2>

      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 1000, disableOnInteraction: false }}
        speed={1500}
        loop={true}
        spaceBetween={20}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
      >
        {categories?.map((category) => (
          <SwiperSlide key={category._id}>
            <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-xl p-4 cursor-default">
              <Image
                src={category.image}
                alt={category.name}
                width={120}
                height={120}
                unoptimized
                className="object-contain h-24 w-auto"
              />
              <h3 className="mt-3 text-gray-700 font-semibold text-center">
                {category.name}
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}