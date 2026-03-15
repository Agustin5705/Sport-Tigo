import { useEffect, useState, useContext } from "react";
import { Product } from "@/types/Interfaces";
import { CartContext } from "@/context/CartContext";
import { getCatalog } from "@/services/catalogService";
import { getUserFromToken } from "@/utils/auth";
import { useRouter } from "next/router";

export default function CatalogoPage() {
  const [articulos, setArticulos] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const cartContext = useContext(CartContext);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getCatalog();
        setArticulos(data);
      } catch {
        setError("Error cargando artículos");
      }
    };

    fetchProducts();
  }, []);

  if (!cartContext) return null;
  const { addItem } = cartContext;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">Catálogo</h1>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articulos.map((articulo) => (
          <div
            key={articulo.idProduct}
            className="border rounded p-4 bg-white shadow"
          >
            <img
              src={articulo.image}
              alt={articulo.name}
              className="w-full h-40 object-cover mb-2"
            />
            <h2 className="text-lg font-semibold">{articulo.name}</h2>
            <p className="text-gray-700">Precio: ${articulo.price}</p>
            <p className="text-gray-500">Stock: {articulo.stock}</p>
            <button
              onClick={() => {
                const user = getUserFromToken();
                if (!user) {
                  router.push("/login");
                  return;
                }
                addItem({
                  idUser: user.idUser,
                  idProduct: articulo.idProduct,
                  quantity: 1,
                });
              }}
              className="mt-2 w-full bg-sky-500 text-white p-2 rounded cursor-pointer hover:bg-sky-600 active:scale-95 transition"
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
