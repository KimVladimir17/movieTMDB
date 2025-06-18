"use client";

import Image from "next/image";
import { MovieWithGenres } from "@/types";

type Props = {
  movie: MovieWithGenres;
};

export default function MovieCard({ movie }: Props) {
  return (
    <div className="movie-card" key={movie.id}>
      <Image
        className="movie-img"
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
        width={183}
        height={281}
        unoptimized
        priority
      />
      <div className="movie-info">
        <h3 className="movie-info-title">{movie.title}</h3>
        <p className="movie-info-data">{movie.release_date}</p>
        <div className="movie-info-genres">
          {movie.genres.map((genre: string) => (
            <span key={genre}>{genre}</span>
          ))}
        </div>
        <p className="movie-info-text">{movie.overview.slice(0, 200)}...</p>
      </div>
    </div>
  );
}
