import React from "react";
import DetailMovie from "@/app/components/detail/DetailMovie";

interface DetailMovieProps {
  params: {
    detail: string;
  };
}

const Page: React.FC<DetailMovieProps> = ({ params }) => {
  return (
    <main className="bg-gray-950">
      <section>
        <div className="flex items-center justify-center">
          <DetailMovie detailId={params.detail} />
        </div>
      </section>
    </main>
  );
};

export default Page;
