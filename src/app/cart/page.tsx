import { authOptions } from '@/auth'
import { getServerSession } from 'next-auth'
import React from 'react'
import Cart from './_component/Cart';

export default async function page() {
    const session=await getServerSession(authOptions);
    
  return <>
<Cart></Cart>
  </>

}
