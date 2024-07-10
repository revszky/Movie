"use client";

import React, { useEffect, useState } from "react";
import { fetchMovies } from "@/app/components/data/DataApi";

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
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    fetchMovies(mengaturMovies, mengaturRekomendasi);
  }, []);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div className="container mx-auto p-4">
      {rekomendasi && !selectedMovie && (
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

      {!selectedMovie && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movie.slice(1).map((movie) => (
            <div
              key={movie.id}
              className="border p-4 rounded cursor-pointer"
              onClick={() => handleMovieClick(movie)}
            >
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
      )}

      {selectedMovie && (
        <div className="mb-8 p-4 border rounded">
          <button
            onClick={() => setSelectedMovie(null)}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Kembali
          </button>
          <h2 className="text-2xl font-bold mb-4">Detail Movie</h2>
          <div className="flex items-start gap-6">
            <img
              src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
              alt={selectedMovie.title}
              className="w-full h-auto mb-4 rounded"
            />
            <div className="flex flex-col items-start justify-center">
              <h3 className="text-xl font-semibold">{selectedMovie.title}</h3>
              <p>{selectedMovie.overview}</p>
              <p>{selectedMovie.release_date}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Beranda;
