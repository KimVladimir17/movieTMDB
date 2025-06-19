import { NextRequest } from "next/server";
import { getMovies } from "@/app/lib/getMovies";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("q") || "";
  const page = parseInt(req.nextUrl.searchParams.get("page") || "1");

  try {
    const movies = await getMovies(query, page);
    return Response.json(movies);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      return new Response("Movie loading error", { status: 500 });
    }
  }
}
