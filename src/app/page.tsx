import MoviesList from "./components/list/MovieList";
import TvShowsList from "./components/list/TvShowList";

export default function Home() {
  return (
    <main>
      <section>
        <div>
          <h1 className="text-2xl font-bold mb-4">Popular Movies</h1>
          <MoviesList />
        </div>
      </section>

      <section>
        <div>
          <h1 className="text-2xl font-bold my-4">Popular TV Shows</h1>
          <TvShowsList />
        </div>
      </section>
    </main>
  );
}
