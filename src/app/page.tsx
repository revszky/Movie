import MoviesList from "./components/list/MovieList";
import TvShowsList from "./components/list/TvShowList";
import RekomenMovie from "./components/rekomendasi/RekomenMovie";

export default function Home() {
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
          <TvShowsList />
        </div>
      </section>
    </main>
  );
}
