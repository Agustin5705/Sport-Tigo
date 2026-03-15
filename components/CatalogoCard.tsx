import { Product } from "@/types/Interfaces";

interface CatalogoCardProps {
  product: Product;
  onAddToCart: (idProduct: number) => void;
}

export default function CatalogoCard({
  product,
  onAddToCart,
}: CatalogoCardProps) {
  return (
    <div className="border rounded shadow p-4 flex flex-col items-center">
      <img
        src={product.image}
        alt={product.name}
        className="w-32 h-32 object-cover mb-2"
      />
      <h3 className="font-bold text-lg">{product.name}</h3>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-green-600 font-semibold mt-2">${product.price}</p>
      <button
        onClick={() => onAddToCart(product.idProduct)}
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Agregar al carrito
      </button>
    </div>
  );
}
