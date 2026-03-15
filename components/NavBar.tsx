import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
  const cartContext = useContext(CartContext);
  const cartCount = cartContext
    ? cartContext.cart.reduce((acc, item) => acc + item.quantity, 0)
    : 0;

  const router = useRouter();

  // leer usuario de localStorage
  let usuarioNombre: string | null = null;
  if (typeof window !== "undefined") {
    const savedUser = localStorage.getItem("sessionUser");
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        usuarioNombre = parsed.nombre; // o parsed.email
      } catch {
        usuarioNombre = null;
      }
    }
  }

  const logout = () => {
    localStorage.removeItem("sessionUser");
    localStorage.removeItem("cart");
    localStorage.removeItem("ordenes");
    document.cookie =
      "sessionToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    localStorage.removeItem("sessionToken");

    router.push("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center">
      <li>
        <Link href="/" className="hover:underline">
          Carrito Deportivo
        </Link>
      </li>
      <ul className="flex space-x-6 items-center">
        <li>
          <Link href="/registro" className="hover:underline">
            Registro
          </Link>
        </li>
        <li>
          <Link href="/catalogo" className="hover:underline">
            Catálogo
          </Link>
        </li>
        <li>
          <Link href="/carrito" className="hover:underline">
            Carrito ({cartCount})
          </Link>
        </li>
        <li>
          <Link href="/ordenes" className="hover:underline">
            Órdenes
          </Link>
        </li>
        <li>
          <Link href="/perfil" className="hover:underline">
            Perfil
          </Link>
        </li>
        {usuarioNombre ? (
          <>
            <li className="font-semibold">Hola, {usuarioNombre}</li>
            <li>
              <button
                onClick={logout}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link href="/login" className="hover:underline">
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
