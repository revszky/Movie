import MoviesList from "./components/list/MovieList";
import TvShowsList from "./components/list/TvShowList";

export default function Home() {
  return (
    <main>
      <section className="py-4">
        <div className="flex flex-col items-center justify-center">
          <div className="py-2 px-4 self-start">
            <h1 className="text-2xl font-bold mb-4 text-white">
              Popular Movies
            </h1>
          </div>

          <MoviesList />
        </div>
      </section>

      <section className="py-4">
        <div className="flex flex-col items-center justify-center">
          <div className="py-2 px-4 self-start">
            <h1 className="text-2xl font-bold my-4 text-white">
              Popular TV Shows
            </h1>
          </div>

          <TvShowsList />
        </div>
      </section>
    </main>
  );
}
