import SearchInput from "@/app/search/SearchInput";
import MovieLoader from "../MovieLoader";
import { MovieWithGenres } from "@/types";
type Props = {
  movies: MovieWithGenres[];
  query?: string;
  pageNum: number;
};

export default async function SearchMovies({ movies, query, pageNum }: Props) {
  return (
    <>
      <SearchInput />
      <MovieLoader movies={movies} query={query} pageNum={Number(pageNum)} />
    </>
  );
}
