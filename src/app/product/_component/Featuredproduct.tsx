import Getproduct from '@/api/product.api'
import { Productinterface } from '@/app/interface/productinterface'
import React from 'react'
import Productitem from './Productitem'

export default async function Featuredproduct() {
const data:Productinterface[]= await Getproduct()

    return (
    <>
<div className=' flex flex-wrap'>
{data.map((prod:Productinterface)=><Productitem key={prod._id} prod={prod}></Productitem>)}

</div>

    </>
  )
}
