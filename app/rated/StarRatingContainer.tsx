import { useEffect, useState } from "react";
import { useGuestSession } from "../GuestSessionsProvider";
import { getMovieDetails, rateMovie } from "../lib/Services";
import { StarRating } from "./StarRating";

export default function StarRatingContainer({ movieId }: { movieId: number }) {
  const { guestSessionId, ratedMovies, setRatedMovies } = useGuestSession();
  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    const found = ratedMovies.find((m) => m.id === movieId);
    if (found) {
      setRating(found?.rating ?? 0);
    }
  }, [ratedMovies, movieId]);

  const handleRate = async (value: number) => {
    setRating(value);
    if (guestSessionId) {
      await rateMovie(movieId, value, guestSessionId);
      const movie = await getMovieDetails(movieId);

      setRatedMovies((prev) => [
        ...prev.filter((m) => m.id !== movieId),
        { ...movie, rating: value },
      ]);
    }
  };

  return <StarRating rating={rating} onRate={handleRate} />;
}
