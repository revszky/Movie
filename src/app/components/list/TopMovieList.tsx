"use client";
import React, { useEffect, useState } from "react";
import TopMovieItem from "@/app/components/item/TopMovieItem";
import { topRatedMovies } from "@/app/data/DataApi";

const TopMovieList = () => {
  const [topMovie, mengaturTopMovie] = useState<any[]>([]);
  const [judul, mengaturJudul] = useState<string>("");

  useEffect(() => {
    const mengambilData = async () => {
      const dataTopMovie = await topRatedMovies();
      mengaturTopMovie(dataTopMovie);

      if (dataTopMovie.length > 0) {
        mengaturJudul(`Top Rated Movie`);
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
          {topMovie.map((movie, index) => (
            <div key={index} className="carousel-item">
              <TopMovieItem key={index} topMovie={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopMovieList;
