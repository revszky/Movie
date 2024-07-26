"use client";

import React, { useEffect, useState } from "react";
import { upcomingTvShows } from "@/app/data/DataApi";
import UpcomingTvShowItem from "../item/UpcomingTvShowItem";

const UpcomingTvShowList = () => {
  const [shows, mengaturShows] = useState([]);
  const [judul, mengaturJudul] = useState<string>("");

  useEffect(() => {
    const mengambilData = async () => {
      const dataTvShows = await upcomingTvShows();
      mengaturShows(dataTvShows);

      if (dataTvShows.length > 0) {
        mengaturJudul(`Popular TV Shows`);
      }
    };

    mengambilData();
  }, []);
  return (
    <div className="w-full">
      <div className="py-2 px-4 self-start">
        <h1 className="text-2xl font-bold my-4 text-white">{judul}</h1>
      </div>

      <div className="w-full overflow-auto px-2">
        <div className="carousel carousel-start">
          {shows.map((show, index) => (
            <div key={index} className="carousel-item">
              <UpcomingTvShowItem key={index} Upshow={show} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpcomingTvShowList;
