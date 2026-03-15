import { CartProduct } from "@/types/Interfaces";

interface CarritoItemProps {
  item: CartProduct;
  onRemove: (idProduct: number) => void;
}

export default function CarritoItem({ item, onRemove }: CarritoItemProps) {
  return (
    <div className="border rounded shadow p-4 flex justify-between items-center mb-2">
      <div>
        <p className="font-bold">Producto #{item.idProduct}</p>
        <p className="text-gray-600">Usuario: {item.idUser}</p>
        <p className="text-gray-600">Cantidad: {item.quantity}</p>
      </div>
      <button
        onClick={() => onRemove(item.idProduct)}
        className="bg-red-500 text-white px-3 py-1 rounded"
      >
        Eliminar
      </button>
    </div>
  );
}
