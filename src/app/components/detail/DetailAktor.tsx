"use client";

import React, { useEffect, useState } from "react";
import { getActorDetail } from "@/app/data/DataApi";
import Link from "next/link";

interface DetailAktorProps {
  actorId: string;
}

const DetailAktor: React.FC<DetailAktorProps> = ({ actorId }) => {
  const [actor, setActor] = useState<any>(null);

  useEffect(() => {
    const fetchActorDetail = async () => {
      const data = await getActorDetail(actorId);
      setActor(data);
    };

    fetchActorDetail();
  }, [actorId]);

  if (!actor) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col md:flex-row items-center justify-center">
        <div className="p-4">
          <img
            src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
            alt={actor.name}
            className="w-80 h-auto"
          />
        </div>

        <div className="flex flex-col items-center md:items-start justify-center p-0 md:p-4 text-white">
          <div className="py-6 px-4">
            <h1 className="text-3xl font-bold">{actor.name}</h1>
          </div>

          <div className="max-w-xl pb-6 px-4">
            <p className="text-sm text-center md:text-left">
              {actor.biography || "N/A"}
            </p>
          </div>

          <div className="flex flex-col items-start justify-center p-4>">
            <div className="flex items-center gap-2 md:gap-6 p-2">
              <p className="text-sm">Known For</p>
              <p className="text-xs">{actor.known_for_department || "N/A"}</p>
            </div>

            <div className="flex items-center gap-2 md:gap-6 p-2">
              <p className="text-sm">Place of Birth</p>
              <p className="text-xs">{actor.place_of_birth || "N/A"}</p>
            </div>

            <div className="flex items-center gap-2 md:gap-6 p-2">
              <p className="text-sm">Date of Birth</p>
              <p className="text-xs">{actor.birthday || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailAktor;
