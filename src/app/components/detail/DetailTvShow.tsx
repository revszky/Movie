"use client";

import React, { useEffect, useState } from "react";
import { getTvShowDetail } from "@/app/data/DataApi";
import Link from "next/link";
import {
  IconStar,
  IconStarFilled,
  IconStarHalfFilled,
} from "@tabler/icons-react";
import AktorList from "../list/AktorList";

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

  const backdropUrl = `https://image.tmdb.org/t/p/original${show.backdrop_path}`;

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

  const mobileOverview = truncateText(show.overview, 18);

  const renderStars = (rating: number) => {
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

  return (
    <div className="flex flex-col items-center justify-center">
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

        <div className="absolute left-0 md:left-10 lg:left-24 z-10 text-white p-4 max-w-2xl flex flex-col items-center md:items-start justify-center">
          <h2 className="text-2xl md:text-4xl font-semibold text-center md:text-left">
            {show.name}
          </h2>

          <div className="py-2">
            <p className="text-sm text-center md:text-left">
              <span className="block md:hidden">{mobileOverview}</span>
              <span className="hidden md:block">{show.overview}</span>
            </p>
          </div>

          <div className="flex items-center">
            {renderStars(show.vote_average)}
            <p className="ml-2 text-white">{show.vote_average.toFixed(1)}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col md:flex-row items-center">
          <div className="p-4">
            <img
              src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
              alt={show.name}
              className="w-40 h-64 md:w-80 md:h-auto"
            />
          </div>

          <div className="flex flex-col items-center md:items-start justify-center p-0 md:p-4 text-white">
            <div className="py-6 px-4">
              <h1 className="text-3xl font-bold text-center md:text-left">
                Storyline
              </h1>
            </div>

            <div className="max-w-xl pb-6 px-4">
              <p className="text-sm text-center md:text-left">
                {show.overview}
              </p>
            </div>

            <div className="flex flex-col items-start justify-center p-4">
              <div className="flex items-center gap-2 md:gap-6 p-2">
                <p className="text-sm">Production</p>
                <p className="text-xs md:max-w-[200px]">
                  {show.production_companies
                    .map((company: any) => company.name)
                    .join(", ")}
                </p>
              </div>

              <div className="flex items-center gap-2 md:gap-6 p-2">
                <p className="text-sm">Status</p>
                <p className="text-xs">{show.status}</p>
              </div>

              <div className="flex items-center gap-2 md:gap-6 p-2">
                <p className="text-sm">Genres</p>
                <p className="text-xs">
                  {show.genres.map((genre: any) => genre.name).join(", ")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AktorList cast={show.credits.cast} />
    </div>
  );
};

export default DetailTvShow;
