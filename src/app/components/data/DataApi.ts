import axios from 'axios';

interface Movie {
  release_date: string;
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

export const fetchMovies = async (mengaturMovies: (movies: Movie[]) => void, mengaturRekomendasi: (movie: Movie | null) => void) => {
  try {
    const urlRespon = await axios.get(
      "https://api.themoviedb.org/3/movie/popular",
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Yzk3NTMyZmVkYmQyMDRhMzNjODdjZDJhYjNkMjkzZiIsIm5iZiI6MTcyMDI3NDg3MC43NzE4NDksInN1YiI6IjY2ODdiZWI2N2Q0NDMwOWM3ZDA4MTM2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w18YSWyJpcRrhVzMaPS_0DSs8_NG2_v_nAMg3YVmGJE`,
        },
      }
    );
    mengaturMovies(urlRespon.data.results);
    mengaturRekomendasi(urlRespon.data.results[0]);
  } catch (error) {
    console.error("Error fetching movies", error);
  }
};
