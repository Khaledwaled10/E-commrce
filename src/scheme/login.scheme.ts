import *as z from 'zod'

export const loginscheme=z.object(
{
  
    email:z.string().nonempty('This is field requierd').email('The Email is not Vaild'),
    password:z.string().nonempty('This is field requierd').regex(
/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,'Not valid Password'),

})
 
export type LoginschemeForm =z.infer<typeof loginscheme>