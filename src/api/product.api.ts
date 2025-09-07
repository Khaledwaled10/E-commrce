
export default async function Getproduct() {

    const res=await fetch( 'https://ecommerce.routemisr.com/api/v1/products',{
        cache:'no-cache'
    });
    const {data}=await res.json();
return data;
}
