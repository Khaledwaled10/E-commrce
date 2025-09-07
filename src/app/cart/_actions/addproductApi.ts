'use server'
import getTokenAuth from '@/utilites/getTokenAuth';

export default async function addproductApi(productId:string) {
 const token=await getTokenAuth();
 if(!token){
    throw new Error('Unathuorized ,login first')
 } 
 const res =await fetch(`${process.env.API}/cart`,{
    cache:'no-store',
    method:'POST',
    headers:{
        'Content-type':'application/json',
        token
    },
    body:JSON.stringify({
        productId
    })
 })
const payload=await res.json()

return payload;

}
