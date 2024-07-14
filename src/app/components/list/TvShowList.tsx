"use client";

import React, { useEffect, useState } from "react";
import { tvShows } from "@/app/data/DataApi";
import TvShowItem from "@/app/components/item/TvShowItem";

const TvShowsList: React.FC = () => {
  const [shows, mengaturShows] = useState([]);

  useEffect(() => {
    const mengambilData = async () => {
      const dataTvShows = await tvShows();
      mengaturShows(dataTvShows);
    };
    mengambilData();
  }, []);

  return (
    <div className="w-full overflow-auto px-2">
      <div className="carousel carousel-start">
        {shows.map((show, index) => (
          <div key={index} className="carousel-item">
            <TvShowItem key={index} show={show} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TvShowsList;
