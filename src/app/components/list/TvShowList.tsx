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
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {shows.map((show) => (
        <TvShowItem key={show} show={show} />
      ))}
    </div>
  );
};

export default TvShowsList;
