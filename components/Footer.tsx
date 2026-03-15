export default function Footer() {
  return (
    <footer className="bg-gray-100 text-center p-4 mt-8 border-t">
      <p className="text-sm text-gray-600">
        © {new Date().getFullYear()} Tienda Demo. Todos los derechos reservados.
      </p>
    </footer>
  );
}
