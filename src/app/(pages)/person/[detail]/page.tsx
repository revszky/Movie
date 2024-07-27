import React from "react";
import { getActorDetail } from "@/app/data/DataApi";
import DetailAktor from "@/app/components/detail/DetailAktor";
import { Metadata } from "next";

const fetchActor = async (id: string) => {
  const data = await getActorDetail(id);
  return data;
};

export async function generateMetadata({
  params,
}: {
  params: { detail: string };
}): Promise<Metadata> {
  const movie = await fetchActor(params.detail);
  return {
    title: `${movie.name} • KYMOVIES`,
  };
}

const Page: React.FC<{ params: { detail: string } }> = async ({ params }) => {
  return (
    <main>
      <section className="py-4">
        <div className="flex items-center justify-center">
          <DetailAktor actorId={params.detail} />
        </div>
      </section>
    </main>
  );
};

export default Page;
