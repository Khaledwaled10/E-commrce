import Getsingleproduct from '@/api/productSingle.api';
import { Productinterface } from '@/app/interface/productinterface';
import Image from 'next/image';
import React from 'react'
import ProductBtn from '../../_components/ProductBtn';
import Productitem from '../_component/Productitem';
import GetproductCatogry from '@/api/getproductCatg.api';

export default async function page({params}:{ params: Promise<{ id: string }> }) {
    const { id } =await params;
const data:Productinterface= await Getsingleproduct(id[0])
const catproduct:Productinterface[]= await GetproductCatogry(id[1])

  return (
    <>
<div className=' flex flex-wrap items-center py-20 '>

  <div className=' w-full md:w-1/3'>
<Image src={data.imageCover} width={300} height={300} className=" w-full object-cover" alt=""></Image>
  </div>
 <div className='w-full md:w-2/3 px-10'>
<h3>{data.title}</h3>
<p className='text-gray-400 my-3'>{data.description}</p>
<p >{data.category.name}</p>

<div className="flex justify-between my-5 items-center ">
        <span>{data.price}EGP</span>
        <span>{data.ratingsAverage}<i className=" fa-solid fa-star text-rating pl-2"></i></span>
      </div>

<ProductBtn id={data._id}></ProductBtn>
  </div>

<h2 className='w-full mt-5 my-5'>🛍️ Related Product</h2>
{catproduct.map((prod:Productinterface)=><Productitem key={prod._id} prod={prod}></Productitem>)}
</div>

    
    </>
  )
}
