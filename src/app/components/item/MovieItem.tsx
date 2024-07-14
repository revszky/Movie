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
    <Link href={`/movie/${movie.id}`} className="p-2">
      <div className="flex flex-col items-center justify-center">
        <div className="w-44 md:w-60 h-72 md:h-[360px]">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="hover:scale-105 duration-500 w-full h-full object-cover border-gray-500 border-4"
          />
        </div>

        <div className="p-2 self-start">
          <h3 className="font-semibold text-white max-w-[160px]">
            {movie.title}
          </h3>

          <div className="flex items-center">
            {memberikanStars(movie.rating)}
            <IconStar size={16} className="text-yellow-500" />
            <p className="ml-2 text-white">{movie.rating}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieItem;
