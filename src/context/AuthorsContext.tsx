"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { fetchAuthors, type Author } from "@/services/authorService";

type AuthorsCtx = {
  autores: Author[];
  loading: boolean;
  error: string | null;
  reload: () => Promise<void>;
  addAutor: (a: Omit<Author, "id">) => void;
  updateAutor: (id: number, patch: Partial<Omit<Author, "id">>) => void;
  removeAutor: (id: number) => void;
  setError: (msg: string | null) => void;
};

const Ctx = createContext<AuthorsCtx | null>(null);

function nextId(list: Author[]) {
  return list.length ? Math.max(...list.map((a) => a.id)) + 1 : 1;
}

export function AuthorsProvider({ children }: { children: ReactNode }) {
  const [autores, setAutores] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFromServer = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAuthors();
      setAutores(data);
    } catch (e: any) {
      setError(e?.message ?? "Error cargando autores");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadFromServer();
  }, [loadFromServer]);

  const addAutor = useCallback((input: Omit<Author, "id">) => {
    setAutores((prev) => [{ id: nextId(prev), ...input }, ...prev]);
  }, []);

  const updateAutor = useCallback(
    (id: number, patch: Partial<Omit<Author, "id">>) => {
      setAutores((prev) =>
        prev.map((a) => (a.id === id ? { ...a, ...patch } : a))
      );
    },
    []
  );

  const removeAutor = useCallback((id: number) => {
    setAutores((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const value: AuthorsCtx = {
    autores,
    loading,
    error,
    reload: loadFromServer,
    addAutor,
    updateAutor,
    removeAutor,
    setError,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuthors() {
  const ctx = useContext(Ctx);
  if (!ctx)
    throw new Error("useAuthors debe usarse dentro de <AuthorsProvider>");
  return ctx;
}
