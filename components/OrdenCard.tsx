import { Order } from "@/types/Interfaces";

interface OrdenCardProps {
  order: Order;
}

export default function OrdenCard({ order }: OrdenCardProps) {
  // Convertimos la fecha ISO a formato legible
  const formattedDate = new Date(order.createdAt).toLocaleDateString();

  return (
    <div className="border rounded shadow p-4 mb-4">
      <h3 className="font-bold text-lg mb-2">Orden #{order.orderNumber}</h3>
      <p className="text-gray-600">ID Orden: {order.idOrder}</p>
      <p className="text-gray-600">Usuario: {order.idUser}</p>
      <p className="text-gray-600">Estado: {order.orderStatus}</p>
      <p className="text-gray-600">
        Dirección de envío: {order.shippingAddress}
      </p>
      <p className="text-gray-600">Fecha: {formattedDate}</p>
    </div>
  );
}
