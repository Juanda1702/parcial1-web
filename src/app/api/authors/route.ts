// src/app/api/authors/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("http://127.0.0.1:8080/api/authors", { cache: "no-store" });
    if (!res.ok) {
      const body = await res.text();
      console.error("Upstream error:", res.status, body);
      return NextResponse.json({ message: "Upstream error", body }, { status: 502 });
    }
    const data = await res.json();
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("Proxy error:", err);
    return NextResponse.json({ message: "Proxy error" }, { status: 500 });
  }
}
