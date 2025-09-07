
export default async function Getsingleproduct(productid:string) {

    const res=await fetch( `https://ecommerce.routemisr.com/api/v1/products/${productid}`,{
        cache:'no-cache'
    });
    const {data}=await res.json();
return data;
}
