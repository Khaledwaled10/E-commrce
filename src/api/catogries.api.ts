
export default async function Getcatogries() {

    const res=await fetch( 'https://ecommerce.routemisr.com/api/v1/categories',{
        cache:'no-cache'
    });
    const {data}=await res.json();
return data;
}