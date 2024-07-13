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
      <div className="flex flex-col items-center justify-center cursor-pointer">
        <img
          src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
          alt={actor.name}
          className="w-[100px] h-[150px] md:w-[200px] md:h-[300px]"
        />
        <div className="p-4 text-white">
          <p className="text-center">{actor.name}</p>
        </div>
      </div>
    </Link>
  );
};

export default AktorItem;
