export type Genre = {
  id: number;
  name: string;
};

export type MovieBasic = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  genre_ids: number[];
};

export type MovieWithGenres = MovieBasic & {
  genres: string[];
  runtime?: number;
};
