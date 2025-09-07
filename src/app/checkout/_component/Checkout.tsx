"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addressscheme, AddressschemeForm } from "@/scheme/address.scheme";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { checkoutOnline } from "../_action/checkout.action";

export default function Checkout({cartId}:{cartId:string}) {

  const form = useForm<AddressschemeForm>({
    resolver: zodResolver(addressscheme),
    defaultValues: {
      details: "",
      city: "",
      phone: "",
    },
  });

async  function onsubmit(data: AddressschemeForm) {
   const  shippingAddress=data
const res =await checkoutOnline(cartId,'',shippingAddress)
  console.log(res);
  if(res?.status==='success'){
   window.location.href=res?.session?.url
  }
  
}

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onsubmit)}
        className="w-2/3 mx-auto"
      >
        <FormField
          control={form.control}
          name="details"
          render={({ field }) => (
            <FormItem className="my-3">
              <FormLabel>Details</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className="my-3">
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="my-3">
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
