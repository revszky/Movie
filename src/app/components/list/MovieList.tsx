"use client";

import React, { useEffect, useState } from "react";
import { moviePopuler } from "@/app/data/DataApi";
import MovieItem from "@/app/components/item/MovieItem";

const MoviesList: React.FC = () => {
  const [movies, mengaturMovie] = useState<any[]>([]);
  const [judul, mengaturJudul] = useState<string>("");

  useEffect(() => {
    const mengambilData = async () => {
      const dataMovie = await moviePopuler();
      mengaturMovie(dataMovie);

      if (dataMovie.length > 0) {
        mengaturJudul(`Popular Movies`);
      }
    };
    mengambilData();
  }, []);

  return (
    <div className="w-full">
      <div className="py-2 px-4 self-start">
        <h1 className="text-2xl font-bold mb-4 text-white">{judul}</h1>
      </div>

      <div className="w-full overflow-auto px-2">
        <div className="carousel carousel-start">
          {movies.map((movie, index) => (
            <div key={index} className="carousel-item">
              <MovieItem key={index} movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoviesList;
