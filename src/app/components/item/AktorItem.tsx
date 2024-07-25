import React from "react";
import Link from "next/link";

interface AktorItemProps {
  actor: {
    id: string;
    name: string;
    profile_path: string;
  };
}

const AktorItem: React.FC<AktorItemProps> = ({ actor }) => {
  return (
    <Link href={`/person/${actor.id}`}>
      <div className="flex flex-col items-center justify-center">
        <div className="w-44 md:w-60 h-72 md:h-[360px]">
          <img
            src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
            alt={actor.name}
            className="hover:scale-105 duration-500 w-full h-full object-cover border-gray-500 border-4"
          />
        </div>
        <div className="p-4 text-white">
          <p className="text-center">{actor.name}</p>
        </div>
      </div>
    </Link>
  );
};

export default AktorItem;
