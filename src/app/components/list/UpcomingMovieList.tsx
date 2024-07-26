"use client";

import React, { useEffect, useState } from "react";
import { upcomingMovies } from "@/app/data/DataApi";
import UpcomingMovieItem from "../item/UpcomingMovieItem";

const UpcomingMovieList = () => {
  const [movies, mengaturMovie] = useState<any[]>([]);
  const [judul, mengaturJudul] = useState<string>("");

  useEffect(() => {
    const mengambilData = async () => {
      const dataMovie = await upcomingMovies();
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
              <UpcomingMovieItem key={index} upMovie={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpcomingMovieList;
