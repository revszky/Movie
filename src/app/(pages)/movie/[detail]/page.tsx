import React from "react";
import { getMovieDetail } from "@/app/data/DataApi";
import DetailMovie from "@/app/components/detail/DetailMovie";
import { Metadata } from "next";

const fetchMovie = async (id: string) => {
  const data = await getMovieDetail(id);
  return data;
};

export async function generateMetadata({
  params,
}: {
  params: { detail: string };
}): Promise<Metadata> {
  const movie = await fetchMovie(params.detail);
  return {
    title: `${movie.title} • KYMOVIES`,
  };
}

const Page: React.FC<{ params: { detail: string } }> = async ({ params }) => {
  return (
    <main>
      <section>
        <div>
          <DetailMovie detailId={params.detail} />
        </div>
      </section>
    </main>
  );
};

export default Page;
