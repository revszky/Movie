import React from "react";
import Link from "next/link";
import { IconStar, IconStarFilled } from "@tabler/icons-react";

interface TvShowItemProps {
  show: {
    id: number;
    name: string;
    poster_path: string;
    rating: number;
  };
}

const TvShowItem: React.FC<TvShowItemProps> = ({ show }) => {
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
    <Link href={`/tv-shows/${show.id}`}>
      <div>
        <img
          src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
          alt={show.name}
          className="hover:scale-105"
        />

        <div className="p-4">
          <h3 className="font-semibold text-white">{show.name}</h3>
          <div className="flex items-center">
            {memberikanStars(show.rating)}
            <IconStar size={16} className="text-yellow-500" />
            <p className="ml-2 text-white">{show.rating}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TvShowItem;
