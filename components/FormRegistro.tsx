import { useState } from "react";
import { register } from "@/services/authService";
import { User } from "@/types/Interfaces";

export default function FormRegistro() {
  const [formData, setFormData] = useState<Omit<User, "idUser">>({
    firstName: "",
    lastName: "",
    shippingAddress: "",
    email: "",
    birthDate: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = (): boolean => {
    // Email válido
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(formData.email)) {
      setError("Email inválido");
      return false;
    }

    // Edad ≥ 18
    const birthDate = new Date(formData.birthDate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < 18) {
      setError("Debes tener al menos 18 años");
      return false;
    }

    // Password mínimo 6 caracteres
    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return false;
    }

    setError(null);
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await register(formData);
      setSuccess(res.message);
      setFormData({
        firstName: "",
        lastName: "",
        shippingAddress: "",
        email: "",
        birthDate: "",
        password: "",
      });
    } catch {
      setError("Error al registrar usuario");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 border rounded"
    >
      <h2 className="text-xl font-bold mb-4">Registro</h2>

      <input
        type="text"
        name="firstName"
        placeholder="Nombre"
        value={formData.firstName}
        onChange={handleChange}
        className="w-full mb-2 p-2 border"
      />
      <input
        type="text"
        name="lastName"
        placeholder="Apellido"
        value={formData.lastName}
        onChange={handleChange}
        className="w-full mb-2 p-2 border"
      />
      <input
        type="text"
        name="shippingAddress"
        placeholder="Dirección"
        value={formData.shippingAddress}
        onChange={handleChange}
        className="w-full mb-2 p-2 border"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full mb-2 p-2 border"
      />
      <input
        type="date"
        name="birthDate"
        value={formData.birthDate}
        onChange={handleChange}
        className="w-full mb-2 p-2 border"
      />
      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={formData.password}
        onChange={handleChange}
        className="w-full mb-2 p-2 border"
      />

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Registrarse
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}
    </form>
  );
}
