import { CartProduct } from "@/types/Interfaces";

export async function getCart(
  userId: number,
  token: string,
): Promise<CartProduct[]> {
  const res = await fetch(`http://localhost:8080/cart/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Error al obtener carrito");
  return res.json();
}

export async function addToCart(
  cartProduct: CartProduct,
  token: string,
): Promise<{ message: string }> {
  const res = await fetch("http://localhost:8080/cart", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cartProduct),
  });
  if (!res.ok) throw new Error("Error al agregar producto al carrito");
  return res.json();
}

export async function removeFromCart(
  userId: number,
  productId: number,
  token: string,
): Promise<{ message: string }> {
  const res = await fetch(`http://localhost:8080/cart/${userId}/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Error al eliminar producto del carrito");
  return res.json();
}
