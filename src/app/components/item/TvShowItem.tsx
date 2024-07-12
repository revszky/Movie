import React from "react";
import Link from "next/link";
import { IconStarFilled } from "@tabler/icons-react";

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
        />
        <h3 className="font-semibold">{show.name}</h3>
        <div className="flex items-center">
          {memberikanStars(show.rating)}
          <span className="ml-2">{show.rating}</span>
        </div>
      </div>
    </Link>
  );
};

export default TvShowItem;
