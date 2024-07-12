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
    return <div>Loading...</div>;
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

  // Format tanggal rilis
  const formatDate = (date: string) => {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

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
        <div className="flex items-center mt-2">
          {renderStars(show.vote_average)}
          <IconStar size={16} className="text-yellow-500" />
          <span className="ml-2">{show.vote_average}</span>
        </div>
        <p className="mt-4">{show.overview}</p>

        <DetailAktorTvShow cast={show.credits.cast} />

        <div className="mt-4">
          <p>
            <strong>Creator:</strong>
            {show.created_by.map((creator: any) => creator.name)}
          </p>
          <p>
            <strong>Production:</strong>
            {show.production_companies
              .map((company: any) => company.name)
              .join(", ")}
          </p>
          <p>
            <strong>Status:</strong> {show.status}
          </p>
          <p>
            <strong>Genres:</strong>{" "}
            {show.genres.map((genre: any) => genre.name).join(", ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailTvShow;
