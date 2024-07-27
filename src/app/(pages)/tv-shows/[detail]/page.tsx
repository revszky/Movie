import React from "react";
import { getTvShowDetail } from "@/app/data/DataApi";
import DetailTvShow from "@/app/components/detail/DetailTvShow";
import { Metadata } from "next";

const fetchTvShow = async (id: string) => {
  const data = await getTvShowDetail(id);
  return data;
};

export async function generateMetadata({
  params,
}: {
  params: { detail: string };
}): Promise<Metadata> {
  const movie = await fetchTvShow(params.detail);
  return {
    title: `${movie.name} • KYMOVIES`,
  };
}

const Page: React.FC<{ params: { detail: string } }> = async ({ params }) => {
  return (
    <main>
      <section>
        <div>
          <DetailTvShow detailId={params.detail} />
        </div>
      </section>
    </main>
  );
};

export default Page;
