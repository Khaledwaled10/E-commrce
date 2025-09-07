import Image from 'next/image'
import React from 'react'
import { Category } from '../interface/productinterface';
import Getcatogries from '@/api/catogries.api';


export default async function Page() {
  const categories: Category[] = await Getcatogries();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Categories ({categories.length})</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="flex flex-col items-center justify-center p-4 bg-white shadow-md rounded-xl hover:scale-105 transition-transform"
          >
            <Image
              src={cat.image}
              alt={cat.name}
              width={100}
              height={100}
              className="object-contain h-20"
            />
            <h3 className="mt-3 font-semibold text-gray-700">{cat.name}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}
