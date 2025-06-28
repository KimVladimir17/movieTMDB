"use client";

import { Pagination } from "antd";
import { useState, useEffect } from "react";
import { useGuestSession } from "../GuestSessionsProvider";
import MovieCard from "@/components/MovieCard";

export default function RatedMovies() {
  const { ratedMovies } = useGuestSession();

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    setCurrentPage(1);
  }, [ratedMovies]);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentMovies = ratedMovies.slice(startIndex, endIndex);

  return (
    <div>
      {ratedMovies.length === 0 ? (
        <p>You have not rated a single movie yet.</p>
      ) : (
        <div className="main-block">
          <div className="movie-list">
            {currentMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={ratedMovies.length}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  );
}
