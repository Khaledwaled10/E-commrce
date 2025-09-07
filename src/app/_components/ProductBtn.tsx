'use client'
import { Button } from "@/components/ui/button";
import {  useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import addproductApi from "../cart/_actions/addproductApi";
import toast from "react-hot-toast";

export default function ProductBtn({id}:{id:string}) {
  const queryClient=useQueryClient()
  const {mutate}=useMutation({mutationFn:addproductApi, 
  onSuccess:(data)=>{
    toast.success(data?.message,{duration:2000,position:'top-center'});
    queryClient.invalidateQueries({queryKey:['cart']})
  },
onError:()=>{
    toast.error("Please Login First!",{duration:2000,position:'top-center'});
}
}
  )


  return<>
  <Button onClick={()=>mutate(id)} className="w-full my-3 cursor-pointer">Add cart</Button>
    </>
}
