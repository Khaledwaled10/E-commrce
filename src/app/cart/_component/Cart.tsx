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

  if (isLoading) return <Loading />;

  if (isError) {
    return (
      <div className="h-screen flex justify-center items-center">
        <h1>{(error as Error).message}</h1>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">
            Total Cart Price:{" "}
            <span className="text-main">{data?.data.totalCartPrice} EGP</span>
          </h1>
          <p className="text-gray-500">
            Total Items:{" "}
            <span className="text-main font-medium">
              {data?.numOfCartItems}
            </span>
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={() => mutate()}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isPending ? (
              <i className="fa-solid fa-spin fa-spinner"></i>
            ) : (
              "Clear Cart"
            )}
          </Button>

          <Button className="bg-main hover:bg-green-700 text-white">
            <Link href={`/checkout/${data?.cartId}`}>Pay Now</Link>
          </Button>
        </div>
      </div>

      {/* ✅ Desktop Table */}
      <div className="hidden md:block relative overflow-x-auto shadow-lg rounded-lg border">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-center">
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
    </div>
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
  });

  const { mutate: updateMutate, isPending: pendingMutate } = useMutation({
    mutationFn: UpdateproductApi,
    onSuccess: (data) => {
      toast.success(data?.message, { duration: 2000, position: "top-center" });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  return (
    <tr className="bg-white border-b hover:bg-gray-50">
      <td className="px-6 py-4 flex items-center gap-3">
        <Image
          src={prod.product.imageCover}
          className="w-16 h-16 rounded-lg object-cover border"
          alt={prod.product.title}
          width={64}
          height={64}
        />
        <span className="font-medium text-gray-800">
          {prod.product.title}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              updateMutate({ productId: prod.product._id, count: prod.count - 1 })
            }
            className="h-7 w-7 flex items-center justify-center rounded-full border text-gray-600 hover:bg-gray-100"
          >
            -
          </button>
          <span className="w-6 text-center">
            {pendingMutate ? (
              <i className="fa-solid fa-spin fa-spinner"></i>
            ) : (
              prod.count
            )}
          </span>
          <button
            onClick={() =>
              updateMutate({ productId: prod.product._id, count: prod.count + 1 })
            }
            className="h-7 w-7 flex items-center justify-center rounded-full border text-gray-600 hover:bg-gray-100"
          >
            +
          </button>
        </div>
      </td>
      <td className="px-6 py-4 font-semibold text-gray-800">
        {prod.price} EGP
      </td>
      <td className="px-6 py-4 text-center">
        <button
          onClick={() => mutate(prod.product.id)}
          className="text-red-600 hover:text-red-800"
        >
          {isPending ? (
            <i className="fa-solid fa-spin fa-spinner"></i>
          ) : (
            <i className="fa-solid fa-trash"></i>
          )}
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
    <div className="flex items-center gap-4 p-4 border rounded-lg bg-white shadow-sm">
      <Image
        src={prod.product.imageCover}
        alt={prod.product.title}
        width={80}
        height={80}
        className="rounded-lg object-cover size-20 border"
      />
      <div className="flex-1">
        <h3 className="font-medium text-gray-800">{prod.product.title}</h3>
        <p className="text-sm text-gray-500">{prod.price} EGP</p>
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() =>
              updateMutate({ productId: prod.product._id, count: prod.count - 1 })
            }
            className="px-2 py-1 border rounded text-gray-600 hover:bg-gray-100"
          >
            -
          </button>
          <span>{prod.count}</span>
          <button
            onClick={() =>
              updateMutate({ productId: prod.product._id, count: prod.count + 1 })
            }
            className="px-2 py-1 border rounded text-gray-600 hover:bg-gray-100"
          >
            +
          </button>
        </div>
      </div>
      <button
        onClick={() => mutate(prod.product.id)}
        className="text-red-600 hover:text-red-800"
      >
        <i className="fa-solid fa-trash"></i>
      </button>
    </div>
  );
}
