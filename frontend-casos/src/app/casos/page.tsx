"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL, getToken, clearToken } from "@/lib/api";
import CasoForm, { Caso } from "@/components";



export default function CasosPage() {
  const router = useRouter();
  const [casos, setCasos] = useState<Caso[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<Caso | null>(null);

  useEffect(() => {
    const token = getToken();
    if (!token) return router.push("/login");
    fetchCasos(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchCasos(token: string) {
    setLoading(true); setError("");
    try {
      const res = await fetch(`${API_URL}/casos`, { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) { if (res.status === 401) { clearToken(); router.push("/login"); } throw new Error("Error al obtener casos"); }
      const data = await res.json();
      setCasos(data);
    } catch (err: any) {
      setError(err.message || "Error");
    } finally { setLoading(false); }
  }

  async function handleDelete(id: string) {
    const token = getToken(); if (!token) return router.push("/login");
    await fetch(`${API_URL}/casos/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
    setCasos(prev => prev.filter(c => c.id !== id));
  }

  async function handleLogout() {
    clearToken();
    router.push("/login");
  }

  return (
    <div className="min-h-screen p-6 bg-linear-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold text-purple-700 dark:text-purple-300 drop-shadow">Casos</h1>
        <div>
          <button
            onClick={handleLogout}
            className="mr-2 bg-linear-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-lg shadow hover:from-pink-600 hover:to-purple-600 transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      <div className="mb-6">
        <CasoForm
          onCreated={(c: Caso) => setCasos(prev => [c, ...prev])}
          editing={editing}
          onUpdated={(updated: Caso) => setCasos(prev => prev.map(p => p.id === updated.id ? updated : p))}
          onFinishEdit={() => setEditing(null)}
        />
      </div>

      {loading && <p className="text-blue-600 font-semibold">Cargando...</p>}
      {error && <p className="text-red-500 font-semibold">{error}</p>}

      <ul className="mt-4 space-y-4">
        {casos.map(c => (
          <li
            key={c.id}
            className="p-4 bg-white dark:bg-gray-800 border border-purple-200 dark:border-gray-700 rounded-xl flex justify-between items-start shadow hover:shadow-lg transition-shadow"
          >
            <div>
              <p className="font-bold text-lg text-purple-800 dark:text-purple-200">{c.nombre}</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">{c.descripcion}</p>
              <div className="flex flex-wrap gap-2 mt-1">
                <span className="inline-block px-2 py-0.5 text-xs rounded bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200">Estado: {c.estado}</span>
                <span className={`inline-block px-2 py-0.5 text-xs rounded font-bold ${c.prioridad === 'alta' ? 'bg-red-200 text-red-700 dark:bg-red-900 dark:text-red-200' : c.prioridad === 'media' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200' : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200'}`}>Prioridad: {c.prioridad}</span>
                <span className="inline-block px-2 py-0.5 text-xs rounded bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200">Responsable: {c.responsable}</span>
              </div>
            </div>
            <div className="flex flex-col space-y-2 ml-4">
              <button
                onClick={() => setEditing(c)}
                className="px-3 py-1 bg-linear-to-r from-yellow-300 to-yellow-500 text-yellow-900 font-semibold rounded shadow hover:from-yellow-400 hover:to-yellow-600 transition-colors"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(c.id)}
                className="px-3 py-1 bg-linear-to-r from-red-400 to-pink-500 text-white font-semibold rounded shadow hover:from-red-500 hover:to-pink-600 transition-colors"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
