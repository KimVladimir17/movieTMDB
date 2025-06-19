"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import { MovieWithGenres } from "@/types";
import Loading from "./loading";
import Pagination from "@/components/Pogination";

type Props = {
  initialMovies: MovieWithGenres[];
};

export default function MovieLoader({ initialMovies }: Props) {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const page = Number(searchParams.get("page")) || 1;

  const [movies, setMovies] = useState<MovieWithGenres[]>(initialMovies);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const trimmed = q.trim();
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          trimmed
            ? `/api/movies?q=${trimmed}&page=${page}`
            : `/api/movies?page=${page}`,
          {
            cache: "no-cache",
          }
        );
        const data = await res.json();
        setMovies(data);
      } catch (e) {
        console.error("Ошибка загрузки:", e);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };
    fetchData();
  }, [q, page]);

  if (loading) return <Loading />;
  return movies.length === 0 ? (
    <p className="no-result">
      Nothing found for search <span> `{q}`</span>
    </p>
  ) : (
    <div>
      <MovieList movies={movies} />;
      <Pagination currentPage={page} query={q} />
    </div>
  );
}
