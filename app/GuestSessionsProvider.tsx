"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { createGuestSession, getRatedMovies } from "./lib/Services";
import { MovieWithGenres } from "@/types";

type GuestSessionContextType = {
  guestSessionId: string | null;
  ratedMovies: MovieWithGenres[];
  setRatedMovies: React.Dispatch<React.SetStateAction<MovieWithGenres[]>>;
};

const GuestSessionContext = createContext<GuestSessionContextType>({
  guestSessionId: null,
  ratedMovies: [],
  setRatedMovies: () => {},
});
export function GuestSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [guestSessionId, setGuestSessionId] = useState<string | null>(null);
  const [ratedMovies, setRatedMovies] = useState<MovieWithGenres[]>([]);
  useEffect(() => {
    const stored = localStorage.getItem("guest_session_id");
    if (stored) {
      setGuestSessionId(stored);
    } else {
      createGuestSession().then((id) => {
        if (id) {
          localStorage.setItem("guest_session_id", id);
          setGuestSessionId(id);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (guestSessionId) {
      getRatedMovies(guestSessionId)
        .then((movies) => {
          setRatedMovies(movies);
        })
        .catch((err) => console.error("Error loading ratings:", err));
    }
  }, [guestSessionId]);

  return (
    <GuestSessionContext.Provider
      value={{ guestSessionId, ratedMovies, setRatedMovies }}
    >
      {children}
    </GuestSessionContext.Provider>
  );
}

export const useGuestSession = () => useContext(GuestSessionContext);
