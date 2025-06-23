"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MovieWithGenres } from "@/types";
import Loading from "./loading";

import { Pagination } from "antd";
import MovieCard from "@/components/MovieCard";

type Props = {
  movies: MovieWithGenres[];
  query?: string;
  pageNum: number;
};

export default function MovieLoader({ movies, query, pageNum }: Props) {
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const goToPage = (page: number) => {
    const q = query ? ` &q=${encodeURIComponent(query)}` : "";
    router.push(`/?page=${page}${q}`);
  };
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timeout);
  }, [movies]);

  if (loading) return <Loading />;

  return movies.length === 0 ? (
    <p className="no-result">
      Nothing found for search <span> `{query}`</span>
    </p>
  ) : (
    <div className="main-block">
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <Pagination
        current={pageNum}
        total={500 * 10}
        onChange={goToPage}
        showSizeChanger={false}
      />
    </div>
  );
}
