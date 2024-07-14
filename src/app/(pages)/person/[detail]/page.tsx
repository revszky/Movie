import DetailAktor from "@/app/components/detail/DetailAktor";
import React from "react";

interface DetailMovieProps {
  params: {
    detail: string;
  };
}

const Page: React.FC<DetailMovieProps> = ({ params }) => {
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
