"use client";

import React, { useEffect, useState } from "react";
import { getMovieDetail } from "@/app/data/DataApi";
import Link from "next/link";
import { IconStar, IconStarFilled } from "@tabler/icons-react";
import DetailAktor from "./DetailAktor";

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
    <div className="flex flex-col items-center justify-center">
      <div className="my-6 self-start mx-4 xl:mx-6 2xl:mx-60">
        <Link href="/" className="px-6 py-2 bg-black text-white font-bold">
          BACK
        </Link>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center">
        <div className="p-4">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-80 h-auto"
          />
        </div>

        <div className="flex flex-col items-center md:items-start justify-center p-0 md:p-4 text-white">
          <div className="py-6 px-4">
            <h1 className="text-3xl font-bold">{movie.title}</h1>
          </div>

          <div className="max-w-xl pb-6 px-4">
            <p className="text-sm text-center md:text-left">{movie.overview}</p>
          </div>

          <div className="flex items-start justify-center gap-4 p-4">
            <div className="flex flex-col items-start justify-center">
              <div className="flex items-center gap-2 p-2">
                <p className="text-sm">Released</p>
                <p className="text-xs">{formatDate(movie.release_date)}</p>
              </div>

              <div className="flex items-center gap-2 p-2">
                <p className="text-sm">Director</p>
                <p className="text-xs">
                  {
                    movie.credits.crew.find(
                      (crew: any) => crew.job === "Director"
                    )?.name
                  }
                </p>
              </div>

              <div className="flex items-center gap-2 p-2">
                <p className="text-sm">Production</p>
                <p className="text-xs md:max-w-[200px]">
                  {movie.production_companies
                    .map((company: any) => company.name)
                    .join(", ")}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start justify-center">
              <div className="flex items-center gap-2 p-2">
                <p className="text-sm">Runtime</p>
                <p className="text-xs">{formatRuntime(movie.runtime)}</p>
              </div>

              <div className="flex items-center gap-2 p-2">
                <p className="text-sm">Genres</p>
                <p className="text-xs md:max-w-[200px]">
                  {movie.genres.map((genre: any) => genre.name).join(", ")}
                </p>
              </div>

              <div className="flex items-center gap-2 p-2">
                <div className="flex items-center">
                  {renderStars(movie.vote_average)}
                  <IconStar size={16} className="text-yellow-500" />
                </div>
                <p className="text-sm">{movie.vote_average}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DetailAktor cast={movie.credits.cast} />
    </div>
  );
};

export default DetailMovie;
