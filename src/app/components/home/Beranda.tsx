"use client";

import React, { useEffect, useState } from "react";
import { fetchMovies, fetchMovieDetails } from "@/app/components/data/DataApi";

interface Movie {
  release_date: string;
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  cast: CastMember[];
}

interface CastMember {
  name: string;
  character: string;
  profile_path: string;
}

const Beranda = () => {
  const [movie, mengaturMovies] = useState<Movie[]>([]);
  const [rekomendasi, mengaturRekomendasi] = useState<Movie | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    fetchMovies(mengaturMovies, mengaturRekomendasi);
  }, []);

  const handleMovieClick = async (movieId: number) => {
    try {
      const movieDetails = await fetchMovieDetails(movieId);
      setSelectedMovie(movieDetails);
    } catch (error) {
      console.error("Error fetching movie details", error);
    }
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
              <div className="flex items-center">
                <span className="text-yellow-500">
                  {"★".repeat(Math.round(rekomendasi.vote_average / 2))}
                </span>
                <span className="ml-2">{rekomendasi.vote_average}</span>
              </div>
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
              onClick={() => handleMovieClick(movie.id)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-auto mb-4 rounded"
              />
              <h2 className="text-xl font-semibold">{movie.title}</h2>
              <p>{movie.overview}</p>
              <p>{movie.release_date}</p>
              <div className="flex items-center">
                <span className="text-yellow-500">
                  {"★".repeat(Math.round(movie.vote_average / 2))}
                </span>
                <span className="ml-2">{movie.vote_average}</span>
              </div>
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
              <div className="flex items-center">
                <span className="text-yellow-500">
                  {"★".repeat(Math.round(selectedMovie.vote_average / 2))}
                </span>
                <span className="ml-2">{selectedMovie.vote_average}</span>
              </div>
              <h4 className="text-lg font-semibold mt-4">Pemeran:</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {selectedMovie.cast.map((cast) => (
                  <div key={cast.name} className="flex flex-col items-center">
                    <img
                      src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`}
                      alt={cast.name}
                      className="w-full h-auto mb-2 rounded"
                    />
                    <p className="text-center">
                      {cast.name} <br />
                      <span className="text-gray-600 text-sm">
                        sebagai {cast.character}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Beranda;
