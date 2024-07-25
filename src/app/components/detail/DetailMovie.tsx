"use client";

import React, { useEffect, useState } from "react";
import { getMovieDetail } from "@/app/data/DataApi";
import Link from "next/link";
import {
  IconStar,
  IconStarFilled,
  IconStarHalfFilled,
} from "@tabler/icons-react";
import AktorList from "../list/AktorList";

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
    const fullStars = Math.floor(rating / 2);
    const halfStar = rating % 2 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <IconStarFilled
          key={`full-${i}`}
          className="text-yellow-500"
          size={16}
        />
      );
    }

    if (halfStar) {
      stars.push(
        <IconStarHalfFilled key="half" className="text-yellow-500" size={16} />
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <IconStar key={`empty-${i}`} className="text-yellow-500" size={16} />
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

  const truncateText = (text: string, wordLimit: number) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  const mobileOverview = truncateText(movie.overview, 18);

  const backdropUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className="relative flex items-center justify-center w-full h-80 lg:h-[460px] xl:h-[500px] p-4 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backdropUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black">
          <div className="m-4 md:m-8">
            <Link href="/" className="px-6 py-2 bg-black text-white font-bold">
              BACK
            </Link>
          </div>
        </div>

        <div className="absolute left-0 md:left-10 lg:left-24 z-10 text-white p-4 max-w-2xl flex flex-col items-center md:items-start justify-center">
          <h2 className="text-2xl md:text-4xl font-semibold text-center md:text-left">
            {movie.title}
          </h2>

          <div className="py-2">
            <p className="text-sm text-center md:text-left">
              <span className="block md:hidden">{mobileOverview}</span>
              <span className="hidden md:block">{movie.overview}</span>
            </p>
          </div>

          <div className="flex items-center">
            {renderStars(movie.vote_average)}
            <p className="ml-2 text-white">{movie.vote_average.toFixed(1)}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="p-4">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-40 h-64 md:w-80 md:h-auto"
            />
          </div>

          <div className="flex flex-col items-center md:items-start justify-center p-0 md:p-4 text-white">
            <div className="py-6 px-4">
              <h1 className="text-3xl font-bold text-center md:text-left">
                Storyline
              </h1>
            </div>

            <div className="max-w-xl pb-6 px-4">
              <p className="text-sm text-center md:text-left">
                {movie.overview}
              </p>
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
              </div>
            </div>
          </div>
        </div>
      </div>

      <AktorList cast={movie.credits.cast} />
    </div>
  );
};

export default DetailMovie;
