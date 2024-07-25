"use client";

import React, { useEffect, useState } from "react";
import { tvShows } from "@/app/data/DataApi";
import Link from "next/link";
import { IconStar, IconStarFilled } from "@tabler/icons-react";

const RekomenTvShows: React.FC = () => {
  const [rekomendasi, mengaturRekomendasi] = useState<any>(null);

  const memberikanStars = (rating: number) => {
    const menghitungStars = Math.round(rating / 2);
    const stars = [];
    for (let i = 0; i < menghitungStars; i++) {
      stars.push(
        <IconStarFilled key={i} className="text-yellow-500" size={16} />
      );
    }
    return stars;
  };

  useEffect(() => {
    const mengambilData = async () => {
      const dataRekomendasi = await tvShows();
      if (dataRekomendasi.length > 0) {
        mengaturRekomendasi(dataRekomendasi[0]);
      }
    };
    mengambilData();
  }, []);

  if (!rekomendasi) {
    return <div>Loading...</div>;
  }

  const backdropUrl = `https://image.tmdb.org/t/p/original${rekomendasi.backdrop_path}`;

  const truncateText = (text: string, wordLimit: number) => {
    if (!text) {
      return "";
    }
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  const mobileOverview = truncateText(rekomendasi.overview, 18);

  return (
    <Link href={`/tv-shows/${rekomendasi.id}`}>
      <div
        className="relative flex items-center justify-center w-full h-80 lg:h-[460px] xl:h-[500px] p-4 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backdropUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black"></div>
        <div className="absolute left-0 z-10 text-white p-4 max-w-2xl flex flex-col items-center md:items-start justify-center">
          <h2 className="text-2xl md:text-4xl font-semibold text-center md:text-left">
            {rekomendasi.name}
          </h2>

          <div className="py-2">
            <p className="text-sm text-center md:text-left">
              <span className="block md:hidden">{mobileOverview}</span>
              <span className="hidden md:block">{rekomendasi.overview}</span>
            </p>
          </div>

          <div className="flex items-center">
            {memberikanStars(rekomendasi.rating)}
            <IconStar size={16} className="text-yellow-500" />
            <p className="ml-2 text-white">{rekomendasi.rating}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RekomenTvShows;
