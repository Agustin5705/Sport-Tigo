import { NextApiRequest, NextApiResponse } from "next";
import { User } from "@/types/User";

const users: User[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const user = req.body;
    users.push(user);
    return res.status(201).json({ message: "Usuario creado", user });
  }
  if (req.method === "GET") {
    return res.status(200).json(users);
  }
  res.status(405).json({ message: "Método no permitido" });
}
