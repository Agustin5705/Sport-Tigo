import type { AppProps } from "next/app";
import { CartProvider } from "../context/CartContext";
import "../styles/globals.css";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">
        {/* Navbar arriba */}
        <Navbar />

        {/* Contenido principal ocupa el espacio disponible */}
        <main className="grow">
          <Component {...pageProps} />
        </main>

        {/* Footer siempre al fondo */}
        <Footer />
      </div>
    </CartProvider>
  );
}

export default MyApp;
