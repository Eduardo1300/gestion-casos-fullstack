export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent">
      <main className="w-full max-w-2xl mx-auto p-8 bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-xl border border-purple-100 dark:border-gray-700 backdrop-blur flex flex-col items-center gap-8">
        <h1 className="text-4xl font-extrabold text-purple-700 dark:text-purple-300 drop-shadow text-center">Bienvenido al sistema de gestión de casos</h1>
        <p className="text-lg text-gray-700 dark:text-gray-200 text-center max-w-xl">
          Administra, crea y edita casos fácilmente. Utiliza el botón para iniciar sesión y acceder al sistema.
        </p>
        <div className="flex flex-col gap-4 w-full sm:flex-row sm:justify-center">
          <a
            href="/login"
            className="flex-1 text-center py-4 px-6 rounded-xl bg-linear-to-r from-pink-500 to-purple-500 text-white font-bold text-lg shadow hover:from-pink-600 hover:to-purple-600 transition-colors"
          >
            Iniciar sesión
          </a>
        </div>
        <footer className="mt-8 text-xs text-gray-500 dark:text-gray-400 text-center">
          &copy; {new Date().getFullYear()} Sistema de Casos. Todos los derechos reservados.
        </footer>
      </main>
    </div>
  );
}
