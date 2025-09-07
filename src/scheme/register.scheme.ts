import *as z from 'zod'

export const registerscheme=z.object(
{
    name:z.string().nonempty('This is field requierd').min(2,'Min 2 char').max(10,'Max 10 char'),
    email:z.string().nonempty('This is field requierd').email('The Email is not Vaild'),
    password:z.string().nonempty('This is field requierd').regex(
/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,'Not valid Password'),
rePassword:z.string().nonempty('This is field requierd'),
phone:z.string().nonempty('This is field requierd').regex(/^(\+(?=2))?2?01(?![3-4])[0-5]{1}[0-9]{8}$/)
}).refine((data)=>data.password===data.rePassword,{
    path:['rePassword'],
    message:'Not matched'
})
 
export type RegisterschemeForm =z.infer<typeof registerscheme>