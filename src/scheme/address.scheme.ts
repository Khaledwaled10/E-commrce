import *as z from 'zod'

export const addressscheme=z.object(
{
  
    details:z.string().nonempty('This is field requierd'),
    city:z.string().nonempty('This is field requierd'),
    phone:z.string().nonempty('This is field requierd')
})
 
export type AddressschemeForm =z.infer<typeof addressscheme>