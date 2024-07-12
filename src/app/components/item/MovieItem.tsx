import React from "react";
import Link from "next/link";
import { IconStar, IconStarFilled } from "@tabler/icons-react";

interface MovieItemProps {
  movie: {
    id: number;
    title: string;
    poster_path: string;
    rating: number;
  };
}

const MovieItem: React.FC<MovieItemProps> = ({ movie }) => {
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
    <Link href={`/movie/${movie.id}`}>
      <div>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <h3 className="font-semibold">{movie.title}</h3>
        <div className="flex items-center">
          {memberikanStars(movie.rating)}
          <IconStar size={16} className="text-yellow-500" />
          <span className="ml-2">{movie.rating}</span>
        </div>
      </div>
    </Link>
  );
};

export default MovieItem;
