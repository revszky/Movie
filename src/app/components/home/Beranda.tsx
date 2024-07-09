"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface Movie {
  release_date: string;
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

const Beranda = () => {
  const [movie, mengaturMovies] = useState<Movie[]>([]);
  const [rekomendasi, mengaturRekomendasi] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const urlRespon = await axios.get(
          "https://api.themoviedb.org/3/movie/popular",
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Yzk3NTMyZmVkYmQyMDRhMzNjODdjZDJhYjNkMjkzZiIsIm5iZiI6MTcyMDI3NDg3MC43NzE4NDksInN1YiI6IjY2ODdiZWI2N2Q0NDMwOWM3ZDA4MTM2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w18YSWyJpcRrhVzMaPS_0DSs8_NG2_v_nAMg3YVmGJE`,
            },
          }
        );
        mengaturMovies(urlRespon.data.results);
        mengaturRekomendasi(urlRespon.data.results[0]);
      } catch (error) {
        console.error("Error fetching movies", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {rekomendasi && (
        <div className="mb-8 p-4 border rounded">
          <h2 className="text-2xl font-bold mb-4">Rekomendasi Movie</h2>

          <div className="flex items-start gap-6">
            <img
              src={`https://image.tmdb.org/t/p/w500${rekomendasi.poster_path}`}
              alt={rekomendasi.title}
              className="w-full h-auto mb-4 rounded"
            />

            <div className="flex flex-col items-start justify-center">
              <h3 className="text-xl font-semibold">{rekomendasi.title}</h3>
              <p>{rekomendasi.overview}</p>
              <p>{rekomendasi.release_date}</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movie.slice(1).map((movie) => (
          <div key={movie.id} className="border p-4 rounded">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto mb-4 rounded"
            />
            <h2 className="text-xl font-semibold">{movie.title}</h2>
            <p>{movie.overview}</p>
            <p>{movie.release_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Beranda;
