"use client";

import React, { useEffect, useState } from "react";
import { moviePopuler } from "@/app/data/DataApi";
import Link from "next/link";
import {
  IconStar,
  IconStarFilled,
  IconStarHalfFilled,
} from "@tabler/icons-react";

const RekomenMovie: React.FC = () => {
  const [rekomendasi, mengaturRekomendasi] = useState<any>(null);

  const memberikanStars = (rating: number) => {
    const fullStars = Math.floor(rating / 2);
    const halfStar = rating % 2 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <IconStarFilled
          key={`full-${i}`}
          className="text-yellow-500"
          size={16}
        />
      );
    }

    if (halfStar) {
      stars.push(
        <IconStarHalfFilled key="half" className="text-yellow-500" size={16} />
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <IconStar key={`empty-${i}`} className="text-yellow-500" size={16} />
      );
    }

    return stars;
  };

  useEffect(() => {
    const mengambilData = async () => {
      const dataRekomendasi = await moviePopuler();
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
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
  };

  const mobileOverview = truncateText(rekomendasi.overview, 18);

  return (
    <Link href={`/movie/${rekomendasi.id}`}>
      <div
        className="relative flex items-center justify-center w-full h-80 lg:h-[460px] xl:h-[500px] p-4 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backdropUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-gray-950"></div>

        <div className="absolute left-0 md:left-10 lg:left-24 z-10 text-white p-4 max-w-2xl flex flex-col items-center md:items-start justify-center">
          <h2 className="text-2xl md:text-4xl font-semibold text-center md:text-left">
            {rekomendasi.title}
          </h2>

          <div className="py-2">
            <p className="text-sm text-center md:text-left">
              <span className="block md:hidden">{mobileOverview}</span>
              <span className="hidden md:block">{rekomendasi.overview}</span>
            </p>
          </div>

          <div className="flex items-center">
            {memberikanStars(rekomendasi.rating)}
            <p className="ml-2 text-white">{rekomendasi.rating.toFixed(1)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RekomenMovie;
