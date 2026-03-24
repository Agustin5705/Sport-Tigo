import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";

export default function Navbar() {
  const cartContext = useContext(CartContext);
  const cartCount = cartContext
    ? cartContext.cart.reduce((acc, item) => acc + item.quantity, 0)
    : 0;

  const router = useRouter();

  let token: string | null = null;
  let email: string | null = null;

  if (typeof window !== "undefined") {
    token = localStorage.getItem("sessionToken");
    if (token) {
      try {
        const payload = jwtDecode<{ sub: string }>(token);
        email = payload.sub; // el email del usuario
      } catch {
        email = null;
      }
    }
  }

  const logout = () => {
    localStorage.removeItem("sessionToken");
    document.cookie =
      "sessionToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
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
          <Link href="/registro">Registro</Link>
        </li>
        <li>
          <Link href="/catalogo">Catálogo</Link>
        </li>
        <li>
          <Link href="/carrito">Carrito ({cartCount})</Link>
        </li>
        <li>
          <Link href="/ordenes">Órdenes</Link>
        </li>
        <li>
          <Link href="/perfil">Perfil</Link>
        </li>
        {token ? (
          <>
            <li>{email}</li>
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
            <Link href="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
