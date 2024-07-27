"use client";

import React from "react";
import Link from "next/link";
import {
  IconStar,
  IconStarFilled,
  IconStarHalfFilled,
} from "@tabler/icons-react";

interface UpcomingMovieItemProps {
  comingMovie: {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    rating: number;
  };
}

const SrcUpcomingMovieItem: React.FC<UpcomingMovieItemProps> = ({
  comingMovie,
}) => {
  const memberikanStars = (rating: number) => {
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

  return (
    <Link href={`/movie/${comingMovie.id}`} className="p-2">
      <div className="flex flex-col items-center justify-center">
        <div className="w-36 md:w-40 lg:w-52 xl:w-60 h-56 md:h-64 lg:h-80 xl:h-[360px]">
          <img
            src={`https://image.tmdb.org/t/p/w500${comingMovie.poster_path}`}
            alt={comingMovie.title}
            className="hover:scale-105 duration-500 w-full h-full object-cover border-gray-500 border-4"
          />
        </div>

        <div className="p-2 flex flex-col items-center justify-center">
          <h3 className="font-semibold text-white max-w-[160px] text-center">
            {comingMovie.title}
          </h3>

          <div className="flex items-center">
            {memberikanStars(comingMovie.rating)}
            <p className="ml-2 text-white">{comingMovie.rating.toFixed(1)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SrcUpcomingMovieItem;
