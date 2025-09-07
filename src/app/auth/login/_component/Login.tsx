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
import { loginscheme, LoginschemeForm } from "@/scheme/login.scheme";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import Link from "next/link";

export default function Login() {

  const form = useForm<LoginschemeForm>({
    resolver: zodResolver(loginscheme),
    defaultValues: {
       
  email: "",
  password: ""
    },
  });
 async function onsubmit(data: LoginschemeForm) {
   const res=await signIn('credentials',{
      email:data.email,
      password:data.password,
      redirect:false,

    })
    console.log(res);
   if(res?.ok){
    toast.success("Login is successfully",{duration:2000,position:'top-center'});
    window.location.href='/'
   }else{
toast.error(res?.error as string, { duration: 2000, position: 'top-center' });
   } 

 
  }
  function handleLoginGithub(){
    signIn('github',{
      callbackUrl:'/'
    })
  }

  return (
    <>
      <h2 className="  my-5  mx-20">Login Now :</h2>

      <Form {...form} >
        <form className=" w-2/3 mx-auto" onSubmit={form.handleSubmit(onsubmit)}>
         
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
              <div className="text-right mt-2">
        <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
          Forgot Password?
        </Link>
      </div>
            
              </FormItem>
            )}
          />
         

          <Button className="w-[200] bg-main mx-auto text-white my-5  block cursor-pointer hover:bg-main">Login</Button>
        </form>
      </Form>
      <div className="text-center">
<Button onClick={handleLoginGithub} className="w-[200] cursor-pointer mb-5">Login With Github <i className=" fa-brands fa-github"></i></Button>
      </div>
    </>
  );
}
