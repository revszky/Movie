"use client";

import React, { useEffect, useState } from "react";
import { topRatedTvShows } from "@/app/data/DataApi";
import TopTvShowItem from "@/app/components/item/TopTvShowItem";

const TopTvShowsList: React.FC = () => {
  const [shows, mengaturShows] = useState([]);
  const [judul, mengaturJudul] = useState<string>("");

  useEffect(() => {
    const mengambilData = async () => {
      const dataTvShows = await topRatedTvShows();
      mengaturShows(dataTvShows);

      if (dataTvShows.length > 0) {
        mengaturJudul(`Top Rated TV Shows`);
      }
    };

    mengambilData();
  }, []);

  return (
    <div className="w-full">
      <div className="py-2 px-4 self-start">
        <h1 className="text-2xl font-bold mb-4 text-white">{judul}</h1>
      </div>

      <div className="w-full overflow-auto px-2">
        <div className="carousel carousel-start">
          {shows.map((show, index) => (
            <div key={index} className="carousel-item">
              <TopTvShowItem key={index} topTvShow={show} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopTvShowsList;
