import MoviesList from "@/app/components/list/MovieList";
import RekomenMovie from "@/app/components/rekomendasi/RekomenMovie";
import React from "react";

const page = () => {
  return (
    <main>
      <section>
        <div>
          <RekomenMovie />
        </div>
      </section>

      <section className="py-4">
        <div className="flex items-center justify-center">
          <MoviesList />
        </div>
      </section>
    </main>
  );
};

export default page;
