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
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { registerscheme, RegisterschemeForm } from "@/scheme/register.scheme";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
export default function Register() {
const router =useRouter();
  const form = useForm<RegisterschemeForm>({
    resolver: zodResolver(registerscheme),
    defaultValues: {
          name: "",
  email: "",
  password: "",
  rePassword: "",
  phone: "",
    },
  });
  async function onsubmit(values: RegisterschemeForm) {
 
 
try {
  const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values    ),
  });

  const data = await res.json();

  if (data.message === "success") {
  toast.success("You Register Successfully", {
    position: "top-center",
    duration: 3000,
  });
  router.push("/auth/login");
} else {
  toast.error(data.message || "Something went wrong", {
    position: "top-center",
    duration: 3000,
  });
}

} catch (err) {
  toast.error("Network error, please try again later", {
    position: "top-center",
    duration: 3000,
  });
}

   
  }

  return (
    <>
      <h2 className="  my-5  mx-20">Register Now :</h2>

      <Form {...form} >
        <form className=" w-2/3 mx-auto" onSubmit={form.handleSubmit(onsubmit)}>
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem className=" my-5">
                <FormLabel>Name :</FormLabel>
                <FormControl>
              
                    <Input type="text" {...field} />
           
              
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem className=" my-5">
                <FormLabel>Email :</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />

          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem className=" my-5">
                <FormLabel>Password :</FormLabel>
                <FormControl>
                  <Input type="password" autoComplete="off" {...field} />
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />
          <FormField
            name="rePassword"
            control={form.control}
            render={({ field }) => (
              <FormItem className=" my-5">
                <FormLabel>rePassword :</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />
          <FormField
            name="phone"
            control={form.control}
            render={({ field }) => (
              <FormItem className=" my-5">
                <FormLabel>Phone :</FormLabel>
                <FormControl>
                  <Input type="tel" {...field} />
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />

          <Button className=" bg-main text-white my-5 ml-auto block cursor-pointer hover:bg-main">Register</Button>
        </form>
      </Form>
    </>
  );
}
