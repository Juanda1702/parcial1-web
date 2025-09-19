"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthors } from "@/context/AuthorsContext";

export default function FormsNewAuthors() {
  const { addAutor, setError } = useAuthors();
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !birthDate || !description) {
      setError("Completa todos los campos");
      return;
    }
    addAutor({ name, birthDate, description, image });
    router.push("/authors");
  }

  return (
    <form
      onSubmit={submit}
      className="w-full max-w-xl space-y-4 rounded-2xl border p-6 shadow-sm"
    >
      <h2 className="text-xl font-semibold">Nuevo autor</h2>

      <input
        className="w-full rounded-lg border p-2"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="date"
        className="w-full rounded-lg border p-2"
        placeholder="dd/mm/aaaa"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
      />

      <textarea
        className="w-full rounded-lg border p-2"
        placeholder="Descripción"
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        className="w-full rounded-lg border p-2"
        placeholder="URL de la imagen"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <div className="flex gap-2">
        <button
          type="button"
          className="rounded-lg bg-black px-4 py-2 text-white hover:opacity-90 cursor-pointer"
        >
          Guardar
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border px-4 py-2 hover:bg-gray-50 cursor-pointer"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
