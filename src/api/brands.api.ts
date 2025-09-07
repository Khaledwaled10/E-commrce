
export default async function Getbrands() {

    const res=await fetch( 'https://ecommerce.routemisr.com/api/v1/brands',{
        cache:'no-cache'
    });
    const {data}=await res.json();
return data;
}