import { useState, useEffect } from "react";
import { Order } from "@/types/Interfaces";
import { getUserFromToken } from "@/utils/auth";
import { getOrders } from "@/services/orderService";
import { useRouter } from "next/router";

export default function OrdenesPage() {
  const [ordenes, setOrdenes] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("sessionToken");
    const user = getUserFromToken();

    if (!token || !user) {
      router.push("/login");
      return;
    }

    getOrders(user.idUser, token)
      .then((data: Order[]) => setOrdenes(data))
      .catch(() => setError("Error al obtener órdenes"));
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">Órdenes</h1>

      {error && <p className="text-red-500">{error}</p>}

      {ordenes.length === 0 ? (
        <p className="text-gray-600">No hay órdenes registradas.</p>
      ) : (
        <ul className="space-y-6">
          {ordenes.map((orden) => (
            <li
              key={orden.idOrder}
              className="border rounded p-4 bg-white shadow"
            >
              <h2 className="font-semibold mb-2">
                Orden #{orden.orderNumber} —{" "}
                {new Date(orden.createdAt).toLocaleString()}
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Estado: {orden.orderStatus}
              </p>
              <p className="mt-2 text-sm text-gray-500">
                Dirección de envío: {orden.shippingAddress}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
