"use client";
import Loading from "@/app/_components/Loading";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { cartRes, Product } from "../type/cart.interface";
import Image from "next/image";
import deleteproductApi from "../_actions/deleteproductApi";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import clearCart from "../_actions/clearCart";
import UpdateproductApi from "../_actions/updateproduct";
import Link from "next/link";

export default function Cart() {
  const { data, isLoading, isError, error } = useQuery<cartRes>({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await fetch("/api/auth/cart");
      const payload = await res.json();
      return payload;
    },
  });

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: clearCart,
    onSuccess: (data) => {
      toast.success(data?.message, { duration: 2000, position: "top-center" });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: () => {
      toast.error("Please Login First!", {
        duration: 2000,
        position: "top-center",
      });
    },
  });

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  if (isError) {
    return (
      <div className="h-screen flex justify-center items-center">
        <h1>{(error as Error).message}</h1>
      </div>
    );
  }

  return (
    <>
      <div className="py-5">
        <h1>
          Total Cart Price :{" "}
          <span className="text-main">{data?.data.totalCartPrice}</span>
        </h1>
        <h3>
          Total Number Cart :{" "}
          <span className="text-main">{data?.numOfCartItems}</span>
        </h3>

        {/* ✅ Desktop Table */}
        <div className="hidden md:block relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.data.products.map((prod) => (
                <ProductRow key={prod._id} prod={prod} />
              ))}
            </tbody>
          </table>
        </div>

        {/* ✅ Mobile Cards */}
        <div className="flex flex-col gap-4 md:hidden mt-5">
          {data?.data.products.map((prod) => (
            <ProductCard key={prod._id} prod={prod} />
          ))}
        </div>

        <Button
          onClick={() => mutate()}
          className="block ml-auto my-5 cursor-pointer"
        >
          {isPending ? (
            <i className="fa-solid fa-spin fa-spinner"></i>
          ) : (
            "Clear Cart"
          )}
        </Button>
        
        <Button

          className="block ml-auto my-5 cursor-pointer"
        >
          <Link href={`/checkout/${data?.cartId}`}>
          Pay now
          </Link>
        </Button>
      </div>
    </>
  );
}

function ProductRow({ prod }: { prod: Product }) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: deleteproductApi,
    onSuccess: (data) => {
      toast.success(data?.message, { duration: 2000, position: "top-center" });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: () => {
      toast.error("Please Login First!", {
        duration: 2000,
        position: "top-center",
      });
    },
  });

  const { mutate: updateMutate, isPending: pendingMutate } = useMutation({
    mutationFn: UpdateproductApi,
    onSuccess: (data) => {
      toast.success(data?.message, { duration: 2000, position: "top-center" });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: () => {
      toast.error("Please Login First!", {
        duration: 2000,
        position: "top-center",
      });
    },
  });

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="p-4">
        <Image
          src={prod.product.imageCover}
          className="size-[100px] object-cover"
          alt=""
          width={100}
          height={100}
        />
      </td>
      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        {prod.product.title}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center">
          <button
            onClick={() =>
              updateMutate({ productId: prod.product._id, count: prod.count - 1 })
            }
            className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100"
          >
            -
          </button>
          <span className="px-2">{pendingMutate ? <i className="fa-solid fa-spin fa-spinner"></i> : prod.count}</span>
          <button
            onClick={() =>
              updateMutate({ productId: prod.product._id, count: prod.count + 1 })
            }
            className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100"
          >
            +
          </button>
        </div>
      </td>
      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        {prod.price} EGP
      </td>
      <td className="px-6 py-4">
        <button
          onClick={() => mutate(prod.product.id)}
          className="text-red-500"
        >
          {isPending ? <i className="fa-solid fa-spin fa-spinner"></i> : <i className="fa-solid fa-trash"></i>}
        </button>
      </td>
    </tr>
  );
}

function ProductCard({ prod }: { prod: Product }) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteproductApi,
    onSuccess: (data) => {
      toast.success(data?.message, { duration: 2000, position: "top-center" });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const { mutate: updateMutate } = useMutation({
    mutationFn: UpdateproductApi,
    onSuccess: (data) => {
      toast.success(data?.message, { duration: 2000, position: "top-center" });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  return (
    <div className="flex items-center gap-4 p-3 border rounded-lg bg-white dark:bg-gray-800">
      <Image
        src={prod.product.imageCover}
        alt={prod.product.title}
        width={80}
        height={80}
        className="rounded-lg object-cover size-20"
      />
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          {prod.product.title}
        </h3>
        <p className="text-sm text-gray-500">{prod.price} EGP</p>
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => updateMutate({ productId: prod.product._id, count: prod.count - 1 })}
            className="px-2 py-1 border rounded"
          >
            -
          </button>
          <span>{prod.count}</span>
          <button
            onClick={() => updateMutate({ productId: prod.product._id, count: prod.count + 1 })}
            className="px-2 py-1 border rounded"
          >
            +
          </button>
        </div>
      </div>
      <button
        onClick={() => mutate(prod.product.id)}
        className="text-red-500"
      >
        <i className="fa-solid fa-trash"></i>
      </button>
    </div>
  );
}
