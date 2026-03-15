import { useState } from "react";
import { useRouter } from "next/router";
import { login } from "@/services/authService";

export default function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { token } = await login(email, password);

      document.cookie = `sessionToken=${token}; path=/; secure; samesite=strict`;
      localStorage.setItem("sessionToken", token);

      setSuccess("Login exitoso");
      setError(null);

      // Redirigir para que el Navbar se actualice
      router.push("/");
    } catch {
      setError("Credenciales inválidas o error de conexión");
      setSuccess(null);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 border rounded"
    >
      <h2 className="text-xl font-bold mb-4">Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-2 p-2 border"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-2 p-2 border"
      />

      <button
        type="submit"
        className="w-full bg-green-500 text-white p-2 rounded"
      >
        Iniciar sesión
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}
    </form>
  );
}
