export type Author = {
  id: number;
  name: string;
  birthDate: string;
  description: string;
  image: string;
};

const BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://127.0.0.1:8080";

export async function fetchAuthors(): Promise<Author[]> {
  const res = await fetch(`${BASE}/api/authors`, { cache: "no-store" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
