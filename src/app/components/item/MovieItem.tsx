import React from "react";
import Link from "next/link";

interface MovieItemProps {
  movie: {
    id: number;
    title: string;
    poster_path: string;
  };
}

const MovieItem: React.FC<MovieItemProps> = ({ movie }) => {
  return (
    <Link href={`/movie/${movie.id}`}>
      <div>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <h3 className="font-semibold">{movie.title}</h3>
      </div>
    </Link>
  );
};

export default MovieItem;
