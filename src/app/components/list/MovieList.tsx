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
    <div className="px-10 py-4">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4 text-white">Popular Movies</h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies.map((movie, index) => (
          <MovieItem key={index} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MoviesList;
