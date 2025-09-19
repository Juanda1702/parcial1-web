"use client";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuthors } from "@/context/AuthorsContext";

function FormEditAuthor() {
  const { id } = useParams<{ id: string }>();
  const authorId = useMemo(() => Number(id), [id]);

  const { autores, updateAutor, reload } = useAuthors();
  const actual = autores.find((a) => a.id === authorId);

  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!actual) {
      void reload();
    } else {
      setName(actual.name);
      setBirthDate(actual.birthDate);
      setDescription(actual.description);
      setImage(actual.image);
    }
  }, [actual, reload]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    updateAutor(authorId, { name, birthDate, description, image });
    router.push("/authors");
  }

  if (!actual) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border p-6">
        <p className="text-gray-600">
          Cargando autor… Si no aparece, vuelve a la lista y selecciona editar.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="mx-auto max-w-xl space-y-4 rounded-2xl border p-6"
    >
      <h2 className="text-xl font-semibold">Editar autor</h2>
      <input
        className="w-full rounded-lg border p-2"
        placeholder="nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="date"
        className="w-full rounded-lg border p-2"
        placeholder="date"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
      />
      <textarea
        className="w-full rounded-lg border p-2"
        rows={4}
        placeholder="descripcion"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        className="w-full rounded-lg border p-2"
        value={image}
        placeholder="urlImagen"
        onChange={(e) => setImage(e.target.value)}
      />
      <div className="flex gap-2">
        <button
          type="button"
          className="rounded-lg bg-black px-4 py-2 text-white hover:opacity-90 cursor-pointer"
        >
          Guardar cambios
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

export default FormEditAuthor;
