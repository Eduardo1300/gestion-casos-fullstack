import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import type { Caso } from "../types.js";
import { verifyToken } from "../middleware/auth.js";

const router = Router();

// "DB" en memoria (si quieres persistir usa fs)
let casos: Caso[] = [];

router.use(verifyToken); // proteger todas las rutas siguientes

router.get("/", (req, res) => {
  res.json(casos);
});

router.post("/", (req, res) => {
  const { nombre, descripcion, estado, prioridad, responsable } = req.body;
  if (!nombre || typeof nombre !== "string") return res.status(400).json({ error: "nombre es requerido" });
  if (!prioridad || !["baja", "media", "alta"].includes(prioridad)) return res.status(400).json({ error: "prioridad es requerida (baja, media, alta)" });

  const nuevo: Caso = {
    id: uuidv4(),
    nombre,
    descripcion: descripcion || "",
    estado: estado || "nuevo",
    prioridad,
    responsable: responsable && typeof responsable === "string" ? responsable : undefined
  };
  casos.push(nuevo);
  res.json(nuevo);
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, estado, prioridad, responsable } = req.body;
  const idx = casos.findIndex(c => c.id === id);
  if (idx === -1 || !casos[idx]) return res.status(404).json({ error: "Caso no encontrado" });

  const casoActual = casos[idx];
  const actualizado: Caso = {
    id: casoActual.id,
    nombre: nombre ?? casoActual.nombre,
    descripcion: descripcion ?? casoActual.descripcion,
    estado: estado ?? casoActual.estado,
    prioridad: prioridad ?? casoActual.prioridad,
    responsable: responsable !== undefined ? responsable : casoActual.responsable
  };
  casos[idx] = actualizado;
  res.json(actualizado);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const idx = casos.findIndex(c => c.id === id);
  if (idx === -1) return res.status(404).json({ error: "Caso no encontrado" });
  const removed = casos.splice(idx, 1)[0];
  res.json({ removed });
});

export default router;
