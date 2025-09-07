import React from 'react'
import Checkout from '../_component/Checkout'

export default async function page({params}:{params:Promise<{id:string}>}) {
  const {id}= await params
  return (
    <div>

        <Checkout cartId={id}></Checkout>
    </div>
  )
}
