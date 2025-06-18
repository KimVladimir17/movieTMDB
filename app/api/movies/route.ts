import { NextRequest } from "next/server";
import { getMovies } from "@/app/lib/getMovies";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("q") || "";
  const page = parseInt(req.nextUrl.searchParams.get("page") || "1");

  try {
    const { movies, totalPages } = await getMovies(query, page);
    return Response.json({ movies, totalPages });
  } catch (error) {
    return new Response("Movie loading error", { status: 500 });
  }
}
