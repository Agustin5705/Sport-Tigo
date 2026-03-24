import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  idUser: number;
  sub: string; // email
}

export function getUserFromToken(): TokenPayload | null {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("sessionToken") : null;
  if (!token) return null;
  try {
    return jwtDecode<TokenPayload>(token);
  } catch {
    return null;
  }
}
