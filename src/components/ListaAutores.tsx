"use client";
import { useEffect, useState } from "react";

type Autor = {
  id: number;
  name: string;
  birthDate: string;
  description: string;
  image: string;
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("es-CO", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
}

function Avatar({ name, src }: { name: string; src?: string }) {
  const [broken, setBroken] = useState(false);
  if (!src || broken) {
    const initial = (name?.[0] ?? "?").toUpperCase();
    return (
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white font-semibold">
        {initial}
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={`Foto de ${name}`}
      className="h-16 w-16 shrink-0 rounded-xl object-cover transition-transform duration-200 group-hover:scale-105"
      onError={() => setBroken(true)}
    />
  );
}

export default function ListaAutores() {
  const [autores, setAutores] = useState<Autor[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  async function cargarAutores() {
    try {
      setLoading(true);
      const res = await fetch("/api/authors", { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setAutores(data);
    } catch (e: any) {
      console.error(e);
      setError(e.message ?? "Error cargando autores");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    cargarAutores();
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold tracking-tight">
          Autores
        </h1>
        <p className="text-sm text-gray-500">
          Listado de autores registrados
        </p>
      </header>

      {error && (
        <div
          className="mb-6 rounded-xl border border-yellow-300 bg-yellow-50 p-3 text-yellow-900"
          aria-live="polite"
        >
          Warning: {error}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-2xl border p-5 shadow-sm"
            >
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 rounded-xl bg-gray-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-40 rounded bg-gray-200" />
                  <div className="h-3 w-24 rounded bg-gray-200" />
                </div>
              </div>
              <div className="mt-4 h-16 w-full rounded bg-gray-200" />
            </div>
          ))}
        </div>
      ) : autores.length === 0 ? (
        <div className="rounded-2xl border p-8 text-center text-gray-500">
          No hay autores todavía.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {autores.map((autor) => (
            <article
              key={autor.id}
              className="group rounded-2xl border bg-white/70 p-5 shadow-sm transition hover:shadow-md dark:bg-white/5"
            >
              <div className="flex items-start gap-4">
                <Avatar name={autor.name} src={autor.image} />
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold leading-tight">
                    {autor.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {formatDate(autor.birthDate)}
                  </p>
                </div>
              </div>

              <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
                {autor.description}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
