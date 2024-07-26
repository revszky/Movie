"use client";

import React, { useState, useEffect } from "react";
import {
  moviePopuler,
  tvShows,
  topRatedMovies,
  topRatedTvShows,
  upcomingMovies,
  upcomingTvShows,
} from "../../data/DataApi";
import MovieItem from "../item/MovieItem";
import TvShowItem from "../item/TvShowItem";

const Search = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [noResults, setNoResults] = useState<boolean>(false);

  const fetchResults = async (searchQuery: string) => {
    setIsFetching(true);

    // Tambahkan delay sebelum mengatur state fetching
    setTimeout(async () => {
      let movieResults = await moviePopuler();
      let tvResults = await tvShows();
      let topRatedMovieResults = await topRatedMovies();
      let topRatedTvResults = await topRatedTvShows();
      let upcomingMoviesResults = await upcomingMovies();
      let upcomingTvShowsResults = await upcomingTvShows();

      const allResults = [
        ...movieResults,
        ...tvResults,
        ...topRatedMovieResults,
        ...topRatedTvResults,
        ...upcomingMoviesResults,
        ...upcomingTvShowsResults,
      ];

      const uniqueResults = Array.from(
        new Map(allResults.map((result) => [result.id, result])).values()
      ).filter(
        (result) =>
          result.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          result.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setResults(uniqueResults);
      setNoResults(uniqueResults.length === 0);
      setIsFetching(false);
    }, 500);
  };

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      setNoResults(false);
    } else {
      fetchResults(query);
    }
  }, [query]);

  useEffect(() => {
    const newUrl = `/search?s=${encodeURIComponent(query)}`;
    window.history.replaceState(null, "", newUrl);
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
  };

  return (
    <div className="container mx-auto p-4">
      <input
        type="text"
        value={query}
        name="search"
        autoFocus
        onChange={handleInputChange}
        placeholder="Cari film atau acara TV..."
        className="border p-2 mb-4 w-full"
      />

      {isFetching ? (
        <p className="text-center text-white">Loading...</p>
      ) : noResults ? (
        <p className="text-center text-white">Tidak Ditemukan</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((result) =>
            result.title ? (
              <MovieItem key={result.id} movie={result} />
            ) : (
              <TvShowItem key={result.id} show={result} />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
