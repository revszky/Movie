"use client";

import {
  IconStar,
  IconStarFilled,
  IconStarHalfFilled,
} from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

interface TopTvShowItemProps {
  topTvShow: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
    overview: string;
    rating: number;
  };
}

const TopTvShowItem: React.FC<TopTvShowItemProps> = ({ topTvShow }) => {
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
    <Link href={`/tv-shows/${topTvShow.id}`} className="p-2">
      <div className="flex flex-col items-center justify-center">
        <div className="w-44 md:w-60 h-72 md:h-[360px]">
          <img
            src={`https://image.tmdb.org/t/p/w500${topTvShow.poster_path}`}
            alt={topTvShow.name}
            className="hover:scale-105 duration-500 w-full h-full object-cover border-gray-500 border-4"
          />
        </div>

        <div className="p-2 self-start">
          <h3 className="font-semibold text-white max-w-[160px]">
            {topTvShow.name}
          </h3>

          <div className="flex items-center">
            {memberikanStars(topTvShow.rating)}
            <p className="ml-2 text-white">{topTvShow.rating.toFixed(1)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TopTvShowItem;
