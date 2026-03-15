import { Product } from "@/types/Interfaces";

export async function getItems(name?: string): Promise<Product[]> {
  const url = name
    ? `http://localhost:8080/products?name=${encodeURIComponent(name)}`
    : "http://localhost:8080/products";

  const res = await fetch(url);
  if (!res.ok) throw new Error("Error al obtener productos");
  return res.json();
}
