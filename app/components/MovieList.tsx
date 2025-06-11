"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { MovieBasic, Genre, MovieWithGenres } from "../../types";

const API_KEY = process.env.NEXT_PUBLIC_API_TMDB_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const MovieList: React.FC = () => {
  const [movies, setMovies] = useState<MovieWithGenres[]>([]);
  const [genreMap, setGenreMap] = useState<Record<number, string>>({});

  useEffect(() => {
    const fetchGenres = async () => {
      const res = await axios.get<{ genres: Genre[] }>(
        ` ${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
      );
      const map: Record<number, string> = {};
      res.data.genres.forEach((genre) => {
        map[genre.id] = genre.name;
      });
      setGenreMap(map);
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    if (Object.keys(genreMap).length === 0) return;
    const fetchMovies = async () => {
      const res = await axios.get<{ results: MovieBasic[] }>(
        `  ${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      );
      const moviesWithGenres: MovieWithGenres[] = res.data.results.map(
        (movie) => ({
          ...movie,
          genres: movie.genre_ids.map((id) => genreMap[id] || "Unknown"),
        })
      );
      setMovies(moviesWithGenres);
    };
    fetchMovies();
  }, [genreMap]);

  return (
    <div className="container">
      <div className="movie-list">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <img
              className="movie-img"
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
            />
            <div className="movie-info">
              <h3 className="movie-info-title">{movie.title}</h3>
              <p className="movie-info-data">{movie.release_date}</p>
              <div className="movie-info-genres">
                {movie.genres.map((genre) => (
                  <span key={genre}>{genre}</span>
                ))}
              </div>
              <p className="movie-info-text">
                {movie.overview.slice(0, 200)}...
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
