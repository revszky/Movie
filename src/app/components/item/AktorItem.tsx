import React from "react";
import Link from "next/link";
import { IconUserFilled } from "@tabler/icons-react";

interface AktorItemProps {
  actor: {
    id: string;
    name: string;
    profile_path: string;
  };
}

const AktorItem: React.FC<AktorItemProps> = ({ actor }) => {
  return (
    <Link href={`/person/${actor.id}`} className="">
      <div className="flex flex-col items-center justify-center">
        <div className="w-36 md:w-60 h-48 md:h-[360px] p-2">
          {actor.profile_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
              alt={actor.name}
              className="hover:scale-105 duration-500 w-full h-full object-cover border-gray-500 border-4"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-700 border-gray-500 border-4 hover:scale-105 duration-500">
              <IconUserFilled size={48} className="text-white" />
            </div>
          )}
        </div>

        <div className="p-4 text-white max-w-[140px] md:max-w-md text-center">
          <p className="text-center">{actor.name}</p>
        </div>
      </div>
    </Link>
  );
};

export default AktorItem;
