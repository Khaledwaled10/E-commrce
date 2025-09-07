'use server'
import getTokenAuth from '@/utilites/getTokenAuth';

export default async function clearCart() {
 const token=await getTokenAuth();
 if(!token){
    throw new Error('Unathuorized ,login first')
 } 
 
 const res =await fetch(`${process.env.API}/cart`,{
    cache:'no-store',
    method:'DELETE',
    headers:{
        'Content-type':'application/json',
        token
    },

 })
const payload=await res.json()

return payload;

}
