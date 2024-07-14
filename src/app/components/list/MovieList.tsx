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
    <div className="w-full overflow-auto px-2">
      <div className="carousel carousel-start">
        {movies.map((movie, index) => (
          <div key={index} className="carousel-item">
            <MovieItem key={index} movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesList;
