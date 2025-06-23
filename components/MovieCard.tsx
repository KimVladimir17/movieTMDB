import Image from "next/image";
import { MovieWithGenres } from "@/types";
import { Card } from "antd";
import RatingCircle from "./RatingCircle";
import StarRatingContainer from "@/app/rated/StarRatingContainer";

type Props = {
  movie: MovieWithGenres;
};

export default function MovieCard({ movie }: Props) {
  return (
    <Card>
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
        <StarRatingContainer movieId={movie.id} />
        <RatingCircle rating={movie.vote_average} />
      </div>
    </Card>
  );
}
