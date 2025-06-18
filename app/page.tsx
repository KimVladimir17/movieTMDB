// import { MovieWithGenres } from "@/types";
import SearchInput from "../components/SearchInput";
import MovieLoader from "./MovieLoader";
import { getMovies } from "./lib/getMovies";

interface Props {
  searchParams: {
    q?: string;
    page?: string;
  };
}
export default async function Page({ searchParams }: Props) {
  const { q: query, page: page } = await searchParams;
  const pageNum = parseInt(page || "1", 10);

  const { movies, totalPages } = await getMovies(query, pageNum);

  return (
    <main className="main">
      <SearchInput />
      <MovieLoader initialMovies={movies} totalPages={totalPages} />
    </main>
  );
}
