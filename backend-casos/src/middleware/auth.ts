
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "mi_secreto_local_123";

export interface AuthRequest extends Request {
  user?: any;
}

function verifyToken(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token proporcionado" });

  const parts = authHeader.split(" ");
  if (parts.length !== 2) return res.status(401).json({ error: "Token malformado" });

  const [scheme, token] = parts;
  if (!scheme || !/^Bearer$/i.test(scheme)) return res.status(401).json({ error: "Token malformado" });
  if (!token) return res.status(401).json({ error: "Token no proporcionado" });

  jwt.verify(token, SECRET, (err: any, decoded: any) => {
    if (err) return res.status(401).json({ error: "Token inválido" });
    req.user = decoded;
    next();
  });
}

export { verifyToken };
