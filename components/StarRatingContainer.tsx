import { useEffect, useState } from "react";
import { useGuestSession } from "../app/GuestSessionsProvider";
import { getRatedMovies, rateMovie } from "../app/lib/Services";
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
      try {
        await rateMovie(movieId, value, guestSessionId);
        setTimeout(async () => {
          const updatedMovies = await getRatedMovies(guestSessionId);
          setRatedMovies(updatedMovies);
        }, 1000);
      } catch (err) {
        console.error("Error updating rating", err);
      }
    }
  };

  return <StarRating rating={rating} onRate={handleRate} />;
}
