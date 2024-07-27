"use client";

import React, { useState, useEffect } from "react";
import Search from "@/app/components/search/Search";
import SearchFound from "@/app/components/search/SearchFound";
import SearchView from "@/app/components/search/SearchView";
import {
  moviePopuler,
  tvShows,
  topRatedMovies,
  topRatedTvShows,
  upcomingMovies,
  upcomingTvShows,
} from "@/app/data/DataApi";

const AllSearch = () => {
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
    }, 300);
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
    document.title = query ? `${query} • KYMOVIES` : "Search • KYMOVIES";

    const newUrl = `/search?s=${encodeURIComponent(query)}`;
    window.history.replaceState(null, "", newUrl);
  }, [query]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1200) {
        setItemsToShow(5);
      } else if (window.innerWidth >= 768) {
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
    <>
      <Search
        setResults={setResults}
        setNoResults={setNoResults}
        setIsFetching={setIsFetching}
        setQuery={setQuery}
        query={query}
        results={results}
        isFetching={isFetching}
        noResults={noResults}
      />

      <div className="pt-4">
        {query.trim() === "" && (
          <SearchView
            upcomingMoviesList={upcomingMoviesList}
            upcomingTvShowsList={upcomingTvShowsList}
            itemsToShow={itemsToShow}
          />
        )}
      </div>

      <div className="py-4">
        {query.trim() !== "" && <SearchFound results={results} />}
      </div>
    </>
  );
};

export default AllSearch;
