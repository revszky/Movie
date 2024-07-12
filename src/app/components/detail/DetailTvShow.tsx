"use client";

import React, { useEffect, useState } from "react";
import { getTvShowDetail } from "@/app/data/DataApi";
import Link from "next/link";
import { IconStar, IconStarFilled } from "@tabler/icons-react";
import DetailAktorTvShow from "./DetailAktorTvShow";

interface TvShowDetailProps {
  detailId: string;
}

const DetailTvShow: React.FC<TvShowDetailProps> = ({ detailId }) => {
  const [show, setShow] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTvShowDetail(detailId);
      setShow(data);
    };

    fetchData();
  }, [detailId]);

  if (!show) {
    return <div className="text-white">Loading...</div>;
  }

  const renderStars = (rating: number) => {
    const numStars = Math.round(rating / 2);
    const stars = [];
    for (let i = 0; i < numStars; i++) {
      stars.push(
        <IconStarFilled key={i} className="text-yellow-500" size={16} />
      );
    }
    return stars;
  };

  return (
    <div className="w-full flex flex-col items-center justify-center my-4">
      <div className="my-6 self-start mx-4 xl:mx-6 2xl:mx-60">
        <Link href="/" className="px-6 py-2 bg-black text-white font-bold">
          BACK
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col md:flex-row items-center">
          <img
            src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
            alt={show.name}
            className="w-80 h-auto"
          />

          <div className="flex flex-col">
            <div className="flex items-start px-10 py-6">
              <h1 className="text-3xl font-bold text-white">{show.name}</h1>
            </div>

            <div className="flex items-start px-10">
              <div className="max-w-xl text-white">
                <p className="py-2 text-sm">{show.overview}</p>
              </div>
            </div>

            <div className="flex items-start px-10 py-4">
              <div className="flex items-center">
                {renderStars(show.vote_average)}
                <IconStar size={16} className="text-yellow-500" />
                <span className="ml-2 text-white">{show.vote_average}</span>
              </div>
            </div>

            <div className="flex flex-col items-start p-8 text-white">
              <div className="flex items-center gap-6 p-2">
                <p className="text-sm">Production</p>
                <p className="text-xs max-w-[200px]">
                  {show.production_companies
                    .map((company: any) => company.name)
                    .join(", ")}
                </p>
              </div>

              <div className="flex items-center gap-6 p-2">
                <p className="text-sm">Status</p>
                <p className="text-xs">{show.status}</p>
              </div>

              <div className="flex items-center gap-6 p-2">
                <p className="text-sm">Genres</p>
                <p className="text-xs">
                  {show.genres.map((genre: any) => genre.name).join(", ")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <DetailAktorTvShow cast={show.credits.cast} />
      </div>
    </div>
  );
};

export default DetailTvShow;
