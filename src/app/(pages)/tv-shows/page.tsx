import TopTvShowsList from "@/app/components/list/TopTvShowList";
import TvShowsList from "@/app/components/list/TvShowList";
import RekomenTvShows from "@/app/components/rekomendasi/RekomenTvShows";
import React from "react";

const page = () => {
  return (
    <main>
      <section>
        <div>
          <RekomenTvShows />
        </div>
      </section>

      <section className="py-4">
        <div className="flex items-center justify-center">
          <TvShowsList />
        </div>
      </section>

      <section className="py-4">
        <div className="flex items-center justify-center">
          <TopTvShowsList />
        </div>
      </section>
    </main>
  );
};

export default page;
