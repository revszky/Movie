"use client";

import React, { useEffect, useState } from "react";
import { moviePopuler } from "@/app/data/DataApi";
import MovieItem from "@/app/components/item/MovieItem";

const MoviesList: React.FC = () => {
  const [movies, mengaturMovie] = useState([]);

  useEffect(() => {
    const mengambilData = async () => {
      const dataMovie = await moviePopuler();
      mengaturMovie(dataMovie);
    };
    mengambilData();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {movies.map((movie) => (
        <MovieItem key={movie} movie={movie} />
      ))}
    </div>
  );
};

export default MoviesList;
