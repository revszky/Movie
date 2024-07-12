"use client";

import React, { useEffect, useState } from "react";
import { getMovieDetail } from "@/app/data/DataApi";
import Link from "next/link";
import { IconStar, IconStarFilled } from "@tabler/icons-react";
import DetailAktorMovie from "./DetailAktorMovie";

interface MovieDetailProps {
  detailId: string;
}

const DetailMovie: React.FC<MovieDetailProps> = ({ detailId }) => {
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMovieDetail(detailId);
      setMovie(data);
    };

    fetchData();
  }, [detailId]);

  if (!movie) {
    return <div className="text-white">Loading...</div>;
  }

  const renderStars = (rating: number) => {
    const numStars = Math.round(rating / 2);
    const stars = [];
    for (let i = 0; i < numStars; i++) {
      stars.push(
        <IconStarFilled key={i} className="text-yellow-500" size={16} />
      );
    }
    return stars;
  };

  const formatRuntime = (runtime: number) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h${minutes}min`;
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="w-full flex flex-col items-center justify-center my-4">
      <div className="my-6 self-start mx-4 xl:mx-6 2xl:mx-60">
        <Link href="/" className="px-6 py-2 bg-black text-white font-bold">
          BACK
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col md:flex-row items-center">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-80 h-auto"
          />

          <div className="flex flex-col">
            <div className="flex items-start px-10 py-6">
              <h1 className="text-3xl font-bold text-white">{movie.title}</h1>
            </div>

            <div className="flex items-start px-10">
              <div className="max-w-xl text-white">
                <p className="py-2 text-sm">{movie.overview}</p>
              </div>
            </div>

            <div className="flex items-start px-10 py-4">
              <div className="flex items-center">
                {renderStars(movie.vote_average)}
                <IconStar size={16} className="text-yellow-500" />
                <span className="ml-2 text-white">{movie.vote_average}</span>
              </div>
            </div>

            <div className="flex items-start gap-14 p-8 text-white">
              <div className="flex flex-col">
                <div className="flex items-center gap-6 p-2">
                  <p className="text-sm">Released</p>
                  <p className="text-xs">{formatDate(movie.release_date)}</p>
                </div>

                <div className="flex items-center gap-6 p-2">
                  <p className="text-sm">Director</p>
                  <p className="text-xs p-1 bg-gray-800 rounded-md">
                    {
                      movie.credits.crew.find(
                        (crew: any) => crew.job === "Director"
                      )?.name
                    }
                  </p>
                </div>

                <div className="flex items-center gap-6 p-2">
                  <p className="text-sm">Production</p>
                  <p className="text-xs">
                    {movie.production_companies
                      .map((company: any) => company.name)
                      .join(", ")}
                  </p>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-6 p-2">
                  <p className="text-sm">Runtime</p>
                  <p className="text-xs">{formatRuntime(movie.runtime)}</p>
                </div>

                <div className="flex items-center gap-6 p-2">
                  <p className="text-sm">Genres</p>
                  <p className="text-xs max-w-[200px]">
                    {movie.genres.map((genre: any) => genre.name).join(", ")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DetailAktorMovie cast={movie.credits.cast} />
      </div>
    </div>
  );
};

export default DetailMovie;
