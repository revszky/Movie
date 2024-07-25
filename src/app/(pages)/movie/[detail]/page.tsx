import React from "react";
import DetailMovie from "@/app/components/detail/DetailMovie";

interface DetailMovieProps {
  params: {
    detail: string;
  };
}

const Page: React.FC<DetailMovieProps> = ({ params }) => {
  return (
    <main>
      <section className="">
        <div className="">
          <DetailMovie detailId={params.detail} />
        </div>
      </section>
    </main>
  );
};

export default Page;
