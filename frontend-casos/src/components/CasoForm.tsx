"use client";
import { useState, useEffect } from "react";
import { API_URL, getToken } from "@/lib/api";

export type Caso = {
  id: string;
  nombre: string;
  descripcion?: string;
  estado: string;
  prioridad: 'baja' | 'media' | 'alta';
  responsable?: string;
};

export default function CasoForm({ onCreated, editing, onUpdated, onFinishEdit }: {
  onCreated?: (c: Caso) => void;
  editing?: Caso | null;
  onUpdated?: (c: Caso) => void;
  onFinishEdit?: () => void;
}) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState("nuevo");
  const [prioridad, setPrioridad] = useState<'baja' | 'media' | 'alta'>("media");
  const [responsable, setResponsable] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editing) {
      setNombre(editing.nombre || "");
      setDescripcion(editing.descripcion || "");
      setEstado(editing.estado || "nuevo");
      setPrioridad(editing.prioridad || "media");
      setResponsable(editing.responsable || "");
    } else {
      setNombre("");
      setDescripcion("");
      setEstado("nuevo");
      setPrioridad("media");
      setResponsable("");
    }
  }, [editing]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const token = getToken(); if (!token) return alert("No autorizado");

    try {
      if (editing && editing.id) {
        const res = await fetch(`${API_URL}/casos/${editing.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ nombre, descripcion, estado, prioridad, responsable })
        });
        const data = await res.json();
        onUpdated && onUpdated(data);
        onFinishEdit && onFinishEdit();
      } else {
        const res = await fetch(`${API_URL}/casos`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ nombre, descripcion, estado, prioridad, responsable })
        });
        const data = await res.json();
        onCreated && onCreated(data);
      }
      setNombre(""); setDescripcion(""); setEstado("nuevo"); setPrioridad("media"); setResponsable("");
    } catch (e) {
      console.error(e);
    } finally { setLoading(false); }
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-lg mb-6 border border-purple-100 dark:border-gray-700 backdrop-blur">
      <div className="grid grid-cols-1 gap-4">
        <input
          placeholder="Nombre del caso"
          className="border-2 border-purple-200 dark:border-purple-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-800 p-3 rounded-lg bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 font-semibold transition"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          required
        />
        <input
          placeholder="Descripción"
          className="border-2 border-purple-200 dark:border-purple-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-800 p-3 rounded-lg bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 font-semibold transition"
          value={descripcion}
          onChange={e => setDescripcion(e.target.value)}
        />
        <div className="flex gap-4">
          <select
            className="flex-1 border-2 border-purple-200 dark:border-purple-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-800 p-3 rounded-lg bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-gray-100 font-semibold transition"
            value={estado}
            onChange={e => setEstado(e.target.value)}
          >
            <option value="nuevo">nuevo</option>
            <option value="en progreso">en progreso</option>
            <option value="cerrado">cerrado</option>
          </select>
          <select
            className="flex-1 border-2 border-purple-200 dark:border-purple-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-800 p-3 rounded-lg bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-gray-100 font-semibold transition"
            value={prioridad}
            onChange={e => setPrioridad(e.target.value as 'baja' | 'media' | 'alta')}
          >
            <option value="baja">Prioridad baja</option>
            <option value="media">Prioridad media</option>
            <option value="alta">Prioridad alta</option>
          </select>
        </div>
        <input
          placeholder="Responsable (opcional)"
          className="border-2 border-purple-200 dark:border-purple-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-800 p-3 rounded-lg bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 font-semibold transition"
          value={responsable}
          onChange={e => setResponsable(e.target.value)}
        />
        <button
          type="submit"
          className="bg-linear-to-r from-blue-500 to-purple-500 text-white font-bold p-3 rounded-lg shadow hover:from-blue-600 hover:to-purple-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {editing ? "Actualizar caso" : "Crear caso"}
        </button>
        {editing && (
          <button
            type="button"
            className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold p-3 rounded-lg shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            onClick={onFinishEdit}
          >
            Cancelar edición
          </button>
        )}
      </div>
    </form>
  );
}
