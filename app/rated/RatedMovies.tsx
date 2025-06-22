"use client";

import { useEffect, useState } from "react";
import { MovieWithGenres } from "@/types";
import MovieList from "@/components/MovieList";
import { getRatedMovies } from "../lib/Services";

export default function RatedMovies() {
  const [ratedMovies, setRatedMovies] = useState<MovieWithGenres[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const guestSessionId = localStorage.getItem("guest_session_id");
    if (!guestSessionId) return;

    const fetchRated = async () => {
      try {
        const data = await getRatedMovies(guestSessionId);
        setRatedMovies(data);
      } catch (err) {
        console.error("Ошибка загрузки рейтингов:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRated();
  }, []);

  if (loading) return <div>Загрузка...</div>;

  return (
    <div>
      {ratedMovies.length === 0 ? (
        <p>You have not rated a single movie yet.</p>
      ) : (
        <MovieList movies={ratedMovies} />
      )}
    </div>
  );
}
