import { MovieBasic, MovieWithGenres } from "@/types";
import MovieList from "../components/MovieList";

const API_KEY = process.env.NEXT_PUBLIC_API_TMDB_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

type Genre = {
  id: number;
  name: string;
};

async function getMovies(): Promise<MovieWithGenres[]> {
  const genreRes = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
  );
  const genreData = await genreRes.json();
  const genreMap: Record<number, string> = {};
  genreData.genres.forEach((g: Genre) => {
    genreMap[g.id] = g.name;
  });

  const movieRes = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US`,
    {
      cache: "no-store",
    }
  );
  const movieData = await movieRes.json();

  const movieWithGenres: MovieWithGenres[] = movieData.results.map(
    (movie: MovieBasic) => ({
      ...movie,
      genres: movie.genre_ids.map((id) => genreMap[id] || "Unknow"),
    })
  );
  return movieWithGenres;
}

async function App() {
  const movies = await getMovies();
  return (
    <div className="main">
      <MovieList movies={movies} />
    </div>
  );
}

export default App;
