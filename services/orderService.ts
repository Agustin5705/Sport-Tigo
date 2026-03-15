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
  items: CartProduct[], // 👈 antes estaba CartItem[]
  token: string,
): Promise<Order> {
  const res = await fetch(`http://localhost:8080/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idUser: userId,
      items,
    }),
  });

  if (!res.ok) throw new Error("Error al crear orden");
  return res.json();
}
