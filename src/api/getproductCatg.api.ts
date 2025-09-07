
export default async function GetproductCatogry(catId:string) {

    const res=await fetch( `https://ecommerce.routemisr.com/api/v1/products?category[in]=${catId}`,{
        cache:'no-cache'
    });
    const {data}=await res.json();
return data;
}
