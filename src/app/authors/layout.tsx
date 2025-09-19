import { AuthorsProvider } from "@/context/AuthorsContext";

export default function AuthorsLayout({ children }: { children: React.ReactNode }) {
  return <AuthorsProvider>{children}</AuthorsProvider>;
}
