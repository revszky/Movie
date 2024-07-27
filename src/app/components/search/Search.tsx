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
import SrcMovieItem from "./SrcMovieItem";
import SrcTvShowItem from "./SrcTvShowItem";
import SrcUpcomingMovieItem from "./SrcUpcomingMovieItem";
import SrcUpcomingTvShowItem from "./SrcUpcomingTvShowItem";

const Search = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [noResults, setNoResults] = useState<boolean>(false);
  const [upcomingMoviesList, setUpcomingMoviesList] = useState<any[]>([]);
  const [upcomingTvShowsList, setUpcomingTvShowsList] = useState<any[]>([]);
  const [itemsToShow, setItemsToShow] = useState<number>(2);

  const fetchResults = async (searchQuery: string) => {
    setIsFetching(true);

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setItemsToShow(4);
      } else {
        setItemsToShow(2);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchUpcoming = async () => {
      const upcomingMoviesResults = await upcomingMovies();
      const upcomingTvShowsResults = await upcomingTvShows();
      setUpcomingMoviesList(upcomingMoviesResults);
      setUpcomingTvShowsList(upcomingTvShowsResults);
    };
    fetchUpcoming();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <input
        type="text"
        value={query}
        name="search"
        autoFocus
        onChange={handleInputChange}
        placeholder="Type to search here..."
        className="bg-gray-700 text-white focus:outline-gray-500 p-4 w-full"
      />

      {isFetching ? (
        <p className="text-center text-white">Loading...</p>
      ) : noResults ? (
        <p className="text-center text-white">Tidak Ditemukan</p>
      ) : query.trim() === "" ? (
        <div>
          <h2 className="text-white text-xl mb-4">Upcoming Movies</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {upcomingMoviesList.slice(0, itemsToShow).map((movie) => (
              <div key={movie.id} className="p-2">
                <SrcUpcomingMovieItem comingMovie={movie} />
              </div>
            ))}
          </div>
          <h2 className="text-white text-xl mb-4">Upcoming TV Shows</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {upcomingTvShowsList.slice(0, itemsToShow).map((tvShow) => (
              <div key={tvShow.id} className="p-2">
                <SrcUpcomingTvShowItem comingTvShow={tvShow} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {results.map((result) =>
            result.title ? (
              <div key={result.id} className="p-2">
                <SrcMovieItem srcMovie={result} />
              </div>
            ) : (
              <div key={result.id} className="p-2">
                <SrcTvShowItem srcTvShow={result} />
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
