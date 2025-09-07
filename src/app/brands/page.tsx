import Getbrands from '@/api/brands.api';
import React from 'react';
import Image from 'next/image';
import { Brand } from '../interface/productinterface';
import { cookies } from 'next/headers';

export default async function Page() {
  const brands: Brand[] = await Getbrands();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Brands ({brands.length})</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {brands.map((brand) => (
          <div
            key={brand._id}
            className="flex flex-col items-center justify-center p-4 bg-white shadow-md rounded-xl hover:scale-105 transition-transform"
          >
            <Image
              src={brand.image}
              alt={brand.name}
              width={100}
              height={100}
              className="object-contain h-20"
            />
            <h3 className="mt-3 font-semibold text-gray-700">{brand.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
