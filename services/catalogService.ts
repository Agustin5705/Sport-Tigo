import { Product } from "@/types/Interfaces";

export async function getCatalog(): Promise<Product[]> {
  const res = await fetch("http://localhost:8080/products");
  if (!res.ok) throw new Error("Error al obtener catálogo");
  return res.json();
}
