"use client";

import React, { useEffect, useState } from "react";
import { moviePopuler } from "@/app/data/DataApi";
import Link from "next/link";

const RekomenMovie: React.FC = () => {
  const [rekomendasi, mengaturRekomendasi] = useState<any>(null);

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

  const backdropUrl = `https://image.tmdb.org/t/p/w500${rekomendasi.backdrop_path}`;

  return (
    <Link href={`/movie/${rekomendasi.id}`}>
      <div
        className="relative flex items-center justify-center w-full h-96 lg:h-[460px] xl:h-[500px] p-4 bg-cover bg-center"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black"></div>
        <div className="absolute left-0 z-10  text-white p-4">
          <h2 className="text-2xl md:text-4xl font-semibold mb-2">
            {rekomendasi.title}
          </h2>
          <p className="text-gray-300">Rating: {rekomendasi.rating}</p>
        </div>
      </div>
    </Link>
  );
};

export default RekomenMovie;
