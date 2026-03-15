import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { CartContext } from "../context/CartContext";
import { getUserFromToken } from "@/utils/auth";
import { createOrder } from "@/services/orderService";
import { getCatalog } from "@/services/catalogService";
import { Product } from "@/types/Interfaces";

export default function CarritoPage() {
  const cartContext = useContext(CartContext);
  const [mensaje, setMensaje] = useState<string | null>(null);
  const [productos, setProductos] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const data = await getCatalog();
        setProductos(data);
      } catch {
        console.error("Error cargando catálogo");
      }
    };
    fetchCatalog();
  }, []);

  if (!cartContext) return null;
  const { cart, removeItem, clearCart } = cartContext;

  const confirmarPedido = async () => {
    if (cart.length === 0) {
      setMensaje("El carrito está vacío");
      return;
    }

    const token = localStorage.getItem("sessionToken");
    if (!token) {
      router.push("/login");
      return;
    }

    const user = getUserFromToken();
    if (!user) {
      router.push("/login");
      return;
    }

    try {
      const newOrder = await createOrder(user.idUser, cart, token);
      clearCart();
      setMensaje(`Pedido confirmado. Número de orden: ${newOrder.orderNumber}`);
    } catch {
      setMensaje("Error al confirmar pedido");
    }
  };

  const getProductInfo = (idProduct: number) =>
    productos.find((p) => p.idProduct === idProduct);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">Carrito</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">No hay productos en el carrito.</p>
      ) : (
        <ul className="space-y-4">
          {cart.map((item) => {
            const product = getProductInfo(item.idProduct);
            return (
              <li
                key={item.idProduct}
                className="border rounded p-4 bg-white shadow flex justify-between items-center"
              >
                <div>
                  <h2 className="font-semibold">{product?.name}</h2>
                  <p>Precio: ${product?.price}</p>
                  <p>Cantidad: {item.quantity}</p>
                </div>
                <button
                  onClick={() => removeItem(item.idProduct)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Eliminar
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <button
        onClick={confirmarPedido}
        className="mt-6 w-full bg-sky-500 text-white p-2 rounded hover:bg-sky-600 transition"
      >
        Confirmar pedido
      </button>

      {mensaje && <p className="mt-4 text-blue-600">{mensaje}</p>}
    </div>
  );
}
