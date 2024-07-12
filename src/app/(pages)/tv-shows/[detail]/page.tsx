import React from "react";
import DetailTvShow from "@/app/components/detail/DetailTvShow";

interface DetailTvShowProps {
  params: {
    detail: string;
  };
}

const Page: React.FC<DetailTvShowProps> = ({ params }) => {
  return (
    <main className="bg-gray-950">
      <section>
        <div className="flex items-center justify-center">
          <DetailTvShow detailId={params.detail} />
        </div>
      </section>
    </main>
  );
};

export default Page;
