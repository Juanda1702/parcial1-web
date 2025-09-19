"use client";
import Link from "next/link";
import { useAuthors } from "@/context/AuthorsContext";

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

export default function ListaAutores() {
  const { autores, loading, error, reload, removeAutor } = useAuthors();

  if (loading) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 h-8 w-48 animate-pulse rounded bg-gray-200" />
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
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Autores</h1>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => reload()}
            className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50 cursor-pointer"
            title="Descartar cambios locales y recargar desde el servidor"
          >
            Restablecer
          </button>
          <Link
            href="/authors/crear"
            className="rounded-lg bg-black px-4 py-2 text-white hover:opacity-90"
          >
            Nuevo autor
          </Link>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-yellow-300 bg-yellow-50 p-3 text-yellow-900">
          ⚠️ {error}
        </div>
      )}

      {autores.length === 0 ? (
        <div className="rounded-2xl border p-8 text-center text-gray-500">
          No hay autores todavía.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {autores.map((a) => (
            <article
              key={a.id}
              className="group rounded-2xl border bg-white/70 p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <img
                  src={a.image}
                  alt={`Foto de ${a.name}`}
                  className="h-16 w-16 rounded-xl object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "data:image/svg+xml;charset=UTF-8," +
                      encodeURIComponent(
                        `<svg xmlns='http://www.w3.org/2000/svg' width='64' height='64'><rect width='100%' height='100%' fill='#ddd'/><text x='50%' y='54%' dominant-baseline='middle' text-anchor='middle' font-size='24' fill='#666'>${(
                          a.name?.[0] ?? "?"
                        ).toUpperCase()}</text></svg>`
                      );
                  }}
                />
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold leading-tight">
                    {a.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Nació: {formatDate(a.birthDate)}
                  </p>
                </div>
              </div>

              <p className="mt-3 line-clamp-3 text-sm text-gray-700">
                {a.description}
              </p>

              <div className="mt-4 flex gap-2">
                <Link
                  href={`/authors/editar/${a.id}`}
                  className="rounded-lg border px-3 py-1 text-sm hover:bg-gray-50"
                >
                  Editar
                </Link>
                <button
                  type="button"
                  className="rounded-lg border px-3 py-1 text-sm hover:bg-gray-50 cursor-pointer"
                  onClick={() => removeAutor(a.id)}
                >
                  Eliminar
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
