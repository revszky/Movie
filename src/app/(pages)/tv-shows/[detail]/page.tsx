import React from "react";
import DetailTvShow from "@/app/components/detail/DetailTvShow";

interface DetailTvShowProps {
  params: {
    detail: string;
  };
}

const Page: React.FC<DetailTvShowProps> = ({ params }) => {
  return (
    <main>
      <section className="">
        <div className="">
          <DetailTvShow detailId={params.detail} />
        </div>
      </section>
    </main>
  );
};

export default Page;
