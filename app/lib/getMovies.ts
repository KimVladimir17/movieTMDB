import { Genre, MovieBasic, MovieWithGenres } from "@/types";

const API_KEY = process.env.NEXT_PUBLIC_API_TMDB_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function getMovies(
  query: string = "",
  page: number = 1
): Promise<{ movies: MovieWithGenres[]; totalPages: number }> {
  try {
    const genreRes = await fetch(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
    );
    if (!genreRes.ok) throw new Error("Genre loading error");

    const genreData = await genreRes.json();
    if (!genreData.genres)
      throw new Error("The genres field is missing in the response");

    const genreMap: Record<number, string> = {};
    genreData.genres.forEach((g: Genre) => {
      genreMap[g.id] = g.name;
    });

    const endpoint = query
      ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          query
        )}&page=${page}&language=en-US`
      : `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}&language=en-US`;

    const movieRes = await fetch(endpoint, {
      cache: "no-store",
    });
    if (!movieRes.ok) throw new Error("Movie download error");

    const movieData = await movieRes.json();

    const movieWithGenres: MovieWithGenres[] = movieData.results.map(
      (movie: MovieBasic) => ({
        ...movie,
        genres: movie.genre_ids.map((id) => genreMap[id] || "Unknown"),
      })
    );

    return { movies: movieWithGenres, totalPages: movieData.total_pages };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Unknown error when uploading data");
    }
  }
}
