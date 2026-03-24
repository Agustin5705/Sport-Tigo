import { Order } from "@/types/Interfaces";

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
  newShippingAddress: string | null,
  token: string,
): Promise<{ orderNumber: string }> {
  const url = newShippingAddress
    ? `http://localhost:8080/orders/buy/${userId}?newShippingAddress=${encodeURIComponent(newShippingAddress)}`
    : `http://localhost:8080/orders/buy/${userId}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Error al crear orden");
  return res.json();
}
