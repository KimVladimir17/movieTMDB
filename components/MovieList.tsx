"use client";

import { MovieWithGenres } from "@/types";
import MovieCard from "./MovieCard";

type Props = {
  movies: MovieWithGenres[];
};

export default function MovieList({ movies }: Props) {
  // console.log(movies);

  return (
    <div className="container">
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
