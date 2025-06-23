import { Genre, MovieBasic, MovieWithGenres } from "@/types";

const API_KEY = process.env.NEXT_PUBLIC_API_TMDB_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function getMovieDetails(movieId: number) {
  const res = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=ru-RU`
  );

  if (!res.ok) throw new Error("Error when receiving movie data");

  return await res.json();
}

async function getGenreMap(): Promise<Record<number, string>> {
  const genreRes = await fetch(
    ` ${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
  );
  if (!genreRes.ok) throw new Error("Error loading genres");

  const genreData = await genreRes.json();
  const genreMap: Record<number, string> = {};
  genreData.genres.forEach((g: Genre) => {
    genreMap[g.id] = g.name;
  });
  return genreMap;
}

function mapMoviesWithGenres(
  movies: MovieBasic[],
  genreMap: Record<number, string>
): MovieWithGenres[] {
  return movies.map((movie) => ({
    ...movie,
    genres: movie.genre_ids.map((id) => genreMap[id] || "Unknown"),
  }));
}

export async function searchMovies(query: string, page: number) {
  const genreMap = await getGenreMap();
  const endpoint = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
    query
  )}&page=${page}&language=en-US`;

  const res = await fetch(endpoint, { cache: "no-store" });
  if (!res.ok) throw new Error("Error downloading movies by search");

  const data = await res.json();
  return mapMoviesWithGenres(data.results, genreMap);
}

export async function getDefaultMovies(page: number) {
  const genreMap = await getGenreMap();
  const endpoint = `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}&language=en-US`;

  const res = await fetch(endpoint, { cache: "no-store" });
  if (!res.ok) throw new Error("Error downloading popular movies");

  const data = await res.json();
  return mapMoviesWithGenres(data.results, genreMap);
}

///////////////////////////////
export async function createGuestSession(): Promise<string | null> {
  try {
    const res = await fetch(
      `${BASE_URL}/authentication/guest_session/new?api_key=${API_KEY}`
    );
    const data = await res.json();

    if (data.success) {
      localStorage.setItem("guest_session_id", data.guest_session_id);
      return data.guest_session_id;
    }

    return null;
  } catch (err) {
    console.error("Failed to create guest session", err);
    return null;
  }
}

export async function rateMovie(
  movieId: number,
  rating: number,
  guestSessionId: string
) {
  await fetch(
    `${BASE_URL}/movie/${movieId}/rating?api_key=${API_KEY}&guest_session_id=${guestSessionId}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: rating * 1 }),
    }
  );
}

export async function getRatedMovies(
  guestSessionId: string
): Promise<MovieWithGenres[]> {
  const genreMap = await getGenreMap();

  const ratedRes = await fetch(
    `${BASE_URL}/guest_session/${guestSessionId}/rated/movies?api_key=${API_KEY}&language=en-US`
  );
  if (!ratedRes.ok) throw new Error("Error downloading popular movies");
  const ratedData = await ratedRes.json();
  return mapMoviesWithGenres(ratedData.results, genreMap);
}
