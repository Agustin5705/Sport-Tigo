import { User } from "@/types/Interfaces";

export async function getUserById(id: number, token: string): Promise<User> {
  const res = await fetch(`http://localhost:8080/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Error al obtener usuario");
  return res.json();
}

export async function updateUser(
  id: number,
  userData: Partial<User>,
  token: string,
): Promise<User> {
  const res = await fetch(`http://localhost:8080/users/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (!res.ok) throw new Error("Error al actualizar usuario");
  return res.json();
}
