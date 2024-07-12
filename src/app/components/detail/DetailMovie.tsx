"use client";

import React, { useEffect, useState } from "react";
import { getMovieDetail } from "@/app/data/DataApi";
import Link from "next/link";
import { IconStarFilled } from "@tabler/icons-react";

interface MovieDetailProps {
  detailId: string;
}

const DetailMovie: React.FC<MovieDetailProps> = ({ detailId }) => {
  const [movie, mengaturMovie] = useState<any>(null);

  useEffect(() => {
    const mengambilData = async () => {
      const dataMovie = await getMovieDetail(detailId);
      mengaturMovie(dataMovie);
    };

    mengambilData();
  }, [detailId]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const memberikanStars = (rating: number) => {
    const menghitungStars = Math.round(rating / 2);
    const stars = [];
    for (let i = 0; i < menghitungStars; i++) {
      stars.push(
        <IconStarFilled key={i} className="text-yellow-500" size={16} />
      );
    }
    return stars;
  };

  return (
    <div className="w-full flex flex-col items-center justify-center my-4">
      <div className="my-6 self-start mx-4 xl:mx-6 2xl:mx-60">
        <Link href="/" className="px-6 py-2 bg-black text-white font-bold">
          BACK
        </Link>
      </div>

      <div className="w-full md:px-14 lg:px-24 xl:px-36 2xl:px-80">
        <h1 className="text-3xl font-bold">{movie.title}</h1>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="flex items-center mt-2">
          {memberikanStars(movie.vote_average)}
          <span className="ml-2">{movie.vote_average}</span>
        </div>
        <p className="mt-4">{movie.overview}</p>
      </div>
    </div>
  );
};

export default DetailMovie;
