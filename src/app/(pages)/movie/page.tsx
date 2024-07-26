import TopMovieItem from "@/app/components/item/TopMovieItem";
import MoviesList from "@/app/components/list/MovieList";
import TopMovieList from "@/app/components/list/TopMovieList";
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

      <section className="py-4">
        <div className="flex items-center justify-center">
          <TopMovieList />
        </div>
      </section>
    </main>
  );
};

export default page;
