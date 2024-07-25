"use client";

import React, { useState, useEffect } from "react";
import AktorItem from "../item/AktorItem";

interface DetailAktorProps {
  cast: any[];
}

const AktorList: React.FC<DetailAktorProps> = ({ cast }) => {
  const [judul, mengaturJudul] = useState("Cast:");

  useEffect(() => {
    if (cast.length > 0) {
      mengaturJudul(`Cast:`);
    }
  }, [cast]);

  return (
    <div className="w-full">
      <div className="py-2 px-4 self-start">
        <h2 className="text-2xl font-bold mt-4 text-white">{judul}</h2>
      </div>

      <div className="w-full overflow-auto px-2">
        <div className="carousel carousel-start">
          {cast.map((actor: any, index) => (
            <div key={index} className="carousel-item">
              <AktorItem key={actor.id} actor={actor} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AktorList;
