import React from "react";
import Link from "next/link";

interface TvShowItemProps {
  show: {
    id: number;
    name: string;
    poster_path: string;
  };
}

const TvShowItem: React.FC<TvShowItemProps> = ({ show }) => {
  return (
    <Link href={`/tv-shows/${show.id}`}>
      <div>
        <img
          src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
          alt={show.name}
        />
        <h3 className="font-semibold">{show.name}</h3>
      </div>
    </Link>
  );
};

export default TvShowItem;
