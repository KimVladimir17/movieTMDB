// import { MovieWithGenres } from "@/types";
// import SearchInput from "../components/SearchInput";
// import MovieLoader from "./MovieLoader";
import { Tabs } from "antd";
import { getDefaultMovies, searchMovies } from "./lib/services";
import SearchMovies from "./search/SearchMovies";
import RatedMovies from "./rated/RatedMovies";

interface Props {
  searchParams: Promise<{
    q?: string;
    page?: string;
  }>;
}
export default async function Page({ searchParams }: Props) {
  const { q: query, page } = await searchParams;
  const pageNum = parseInt(page || "1", 10);

  const movies = query?.trim()
    ? await searchMovies(query || "", Number(page) || 1)
    : await getDefaultMovies(Number(page) || 1);

  return (
    <main className="main">
      <div className="tabs-content">
        <div className="container">
          <Tabs
            defaultActiveKey="search"
            items={[
              {
                key: "search",
                label: "Search",
                children: (
                  <SearchMovies
                    movies={movies}
                    query={query}
                    pageNum={Number(pageNum)}
                  />
                ),
              },
              { key: "rated", label: "Rated", children: <RatedMovies /> },
            ]}
          />
        </div>
      </div>
    </main>
  );
}
