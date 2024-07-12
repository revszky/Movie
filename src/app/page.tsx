import MoviesList from "./components/list/MovieList";
import TvShowsList from "./components/list/TvShowList";

export default function Home() {
  return (
    <main className="bg-gray-950 min-h-screen">
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
