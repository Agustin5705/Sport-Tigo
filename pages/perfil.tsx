import { useState, useEffect } from "react";
import { User } from "@/types/Interfaces";
import { getUserFromToken } from "@/utils/auth";
import { getUserById, updateUser } from "@/services/userService";
import { useRouter } from "next/router";

export default function PerfilPage() {
  const [usuario, setUsuario] = useState<User | null>(null);
  const [direccion, setDireccion] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("sessionToken");
    const user = getUserFromToken();
    console.log("PerfilPage token:", token);
    console.log("PerfilPage user:", user);
    if (!token || !user) {
      router.push("/login");
      return;
    }

    getUserById(user.userId, token)
      .then((data) => {
        setUsuario(data);
        setDireccion(data.shippingAddress || "");
      })
      .catch(() => console.error("Error cargando usuario"));
  }, [router]);

  const actualizarDireccion = async () => {
    if (!usuario) return;
    const token = localStorage.getItem("sessionToken");
    if (!token) return;

    try {
      const updated = await updateUser(
        usuario.idUser,
        { shippingAddress: direccion },
        token,
      );
      setUsuario(updated);
      alert("Dirección actualizada correctamente");
    } catch {
      alert("Error al actualizar dirección");
    }
  };

  if (!usuario) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">No hay usuario logueado.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">Perfil de Usuario</h1>
      <div className="bg-white p-6 rounded shadow max-w-md">
        <p>
          <strong>Nombre:</strong> {usuario.firstName} {usuario.lastName}
        </p>
        <p>
          <strong>Email:</strong> {usuario.email}
        </p>
        <p>
          <strong>Fecha de nacimiento:</strong> {usuario.birthDate}
        </p>
        <div className="mt-4">
          <label className="block mb-2 font-semibold">Dirección de envío</label>
          <input
            type="text"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <button
            onClick={actualizarDireccion}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Guardar dirección
          </button>
        </div>
      </div>
    </div>
  );
}
