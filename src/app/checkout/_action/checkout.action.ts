'use server'
import getTokenAuth from "@/utilites/getTokenAuth"

type shippingAddress={
details: string,
      city: string,
      phone: string,
}

export async function checkoutOnline(cartId:string,url='https://e-commrce-rho.vercel.app',shippingAddress:shippingAddress) {
 const token=await getTokenAuth()
  if(!token){
     throw new Error('Unathuorized ,login first')
  }   
 const res =await fetch(`${process.env.Api}/orders/checkout-session/${cartId}?url=${url}`,{
        method:'POST',
       body:JSON.stringify({
shippingAddress
       }),
        headers:{
            token,
'Content-type':'application/json',
        }
    })
const data=res.json();
return data;

}