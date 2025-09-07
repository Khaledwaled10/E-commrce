import { Productinterface } from "@/app/interface/productinterface";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import '../../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import ProductBtn from "@/app/_components/ProductBtn";

export default function Productitem({ prod }: { prod: Productinterface }) {
  return (
    <div className="sm:w-1/2 mt-5 md:w-1/3 w-full lg:w-1/6">
        <div className="p-5">
<Link href={`/product/${prod._id}/${prod.category._id}`}>
      <Image src={prod.imageCover} width={300} height={300} className=" w-full" alt="" />
      <span className="text-main">{prod.category.name}</span>
      <p className=" line-clamp-1">{prod.title}</p>
      <div className="flex justify-between items-center my-5">
        <div>
<p >
  {prod.price}EGP
</p>

        </div>

        <span>{prod.ratingsAverage}<i className=" fa-solid fa-star text-rating pl-2"></i></span>
      </div>
</Link>
<ProductBtn id={prod._id}></ProductBtn>
        </div>
    </div>
  );
}
