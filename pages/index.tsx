import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Bienvenido a nuestra tienda deportiva
      </h1>
      <p className="text-gray-700 mb-8 text-center">
        Descubre productos pensados para acompañar tu entrenamiento y estilo de
        vida.
      </p>

      <div className="space-y-6">
        {/* Catálogo */}
        <div className="flex items-center gap-4">
          <Link
            href="/catalogo"
            className="bg-sky-200 border border-sky-400 text-sky-800 px-4 py-2 rounded font-semibold hover:bg-sky-300 transition"
          >
            Catálogo
          </Link>
          <p className="text-gray-600">
            Explora nuestro catálogo para encontrar el artículo deportivo que
            más se ajusta a lo que estás buscando.
          </p>
        </div>

        {/* Carrito */}
        <div className="flex items-center gap-4">
          <Link
            href="/carrito"
            className="bg-sky-200 border border-sky-400 text-sky-800 px-4 py-2 rounded font-semibold hover:bg-sky-300 transition"
          >
            Carrito
          </Link>
          <p className="text-gray-600">
            Revisa tu carrito y asegura que no se te escape nada antes de
            finalizar tu compra.
          </p>
        </div>

        {/* Órdenes */}
        <div className="flex items-center gap-4">
          <Link
            href="/ordenes"
            className="bg-sky-200 border border-sky-400 text-sky-800 px-4 py-2 rounded font-semibold hover:bg-sky-300 transition"
          >
            Órdenes
          </Link>
          <p className="text-gray-600">
            Consulta el historial de tus órdenes y mantén el control de tus
            compras.
          </p>
        </div>
      </div>
    </div>
  );
}
