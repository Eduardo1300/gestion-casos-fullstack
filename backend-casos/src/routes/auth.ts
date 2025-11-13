import { Router } from "express";
import jwt from "jsonwebtoken";

const router = Router();
const SECRET = process.env.JWT_SECRET || "mi_secreto_local_123";

// Usuario de ejemplo (en práctica usar BD + hash)
const demoUser = { id: "1", email: "demo@demo.com", password: "Demo1234" };

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "email y password requeridos" });

  if (email === demoUser.email && password === demoUser.password) {
    const token = jwt.sign({ id: demoUser.id, email: demoUser.email }, SECRET, { expiresIn: "6h" });
    return res.json({ token });
  }

  return res.status(401).json({ error: "Credenciales inválidas" });
});

export default router;
