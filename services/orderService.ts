import { Order, CartProduct } from "@/types/Interfaces";

export async function getOrders(
  userId: number,
  token: string,
): Promise<Order[]> {
  const res = await fetch(`http://localhost:8080/orders/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Error al obtener órdenes");
  return res.json();
}

export async function createOrder(
  userId: number,
  cart: CartProduct[],
  token: string,
  newShippingAddress?: string,
): Promise<{ orderNumber: string }> {
  const res = await fetch(`http://localhost:8080/orders/buy/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ cart, newShippingAddress }),
  });
  return res.json();
}
