// src/app/orders/type/order.interface.ts
export interface OrderProduct {
  count: number;
  product: {
    id: string;
    title: string;
    imageCover: string;
    category: {
      name: string;
    };
    price: number;
  };
  price: number;
}

export interface Order {
  id: string;
  user: string;
  cartItems: OrderProduct[];
  totalOrderPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  paidAt?: string;
  createdAt: string;
}

export type OrdersResponse = Order[];
