"use client";

import React, { useEffect, useState } from "react";
import { getTvShowDetail } from "@/app/data/DataApi";
import Link from "next/link";

interface TvShowDetailProps {
  detailId: string;
}

const DetailTvShow: React.FC<TvShowDetailProps> = ({ detailId }) => {
  const [show, setShow] = useState<any>(null);

  useEffect(() => {
    const fetchShow = async () => {
      const data = await getTvShowDetail(detailId);
      setShow(data);
    };

    fetchShow();
  }, [detailId]);

  if (!show) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full flex flex-col items-center justify-center my-4">
      <div className="my-6 self-start mx-4 xl:mx-6 2xl:mx-60">
        <Link href="/" className="px-6 py-2 bg-black text-white font-bold">
          BACK
        </Link>
      </div>

      <div className="w-full md:px-14 lg:px-24 xl:px-36 2xl:px-80">
        <h1 className="text-3xl font-bold">{show.name}</h1>
        <img
          src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
          alt={show.name}
        />
        <p className="mt-4">{show.overview}</p>
      </div>
    </div>
  );
};

export default DetailTvShow;
