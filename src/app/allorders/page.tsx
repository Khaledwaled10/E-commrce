"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface Order {
  _id: string;
  totalOrderPrice: number;
  paymentMethodType: string;
  createdAt: string;
}

export default function AllOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch("/api/auth/allorders", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Failed to fetch orders");
        } else {
          setOrders(data);
        }
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  if (loading) return <p className="text-center py-10">Loading orders...</p>;
  if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6 text-center">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-lg p-5 shadow-md bg-white"
            >
              <h2 className="font-bold text-lg mb-2">
                Order #{order._id}
              </h2>
              <p>
                <span className="font-semibold">Total:</span>{" "}
                {order.totalOrderPrice} EGP
              </p>
              <p>
                <span className="font-semibold">Payment:</span>{" "}
                {order.paymentMethodType}
              </p>
              <p>
                <span className="font-semibold">Date:</span>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <Button className="mt-4 w-full bg-main text-white hover:bg-main/80">
                View Details
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
