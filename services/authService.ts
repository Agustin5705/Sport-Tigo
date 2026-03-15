import { User } from "@/types/Interfaces";

export async function register(
  userData: Omit<User, "idUser" | "password">,
): Promise<{ message: string }> {
  const res = await fetch("http://localhost:8080/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!res.ok) throw new Error("Error en registro");
  return res.json();
}

export async function login(
  email: string,
  password: string,
): Promise<{ token: string }> {
  const res = await fetch("http://localhost:8080/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Error en login");
  return res.json();
}

export async function recoverPassword(email: string): Promise<void> {
  const res = await fetch("http://localhost:8080/auth/recover", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error("Error en recuperación de contraseña");
}
