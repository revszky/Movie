"use client";

import React from "react";
import AktorItem from "../item/AktorItem";

interface DetailAktorProps {
  cast: any[];
}

const AktorList: React.FC<DetailAktorProps> = ({ cast }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="self-start p-6">
        <h2 className="text-2xl font-bold mt-4 text-white">Cast:</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
        {cast.slice(0, 5).map((actor: any) => (
          <AktorItem key={actor.id} actor={actor} />
        ))}
      </div>
    </div>
  );
};

export default AktorList;
