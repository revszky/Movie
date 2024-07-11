import axios from 'axios';

interface Movie {
  release_date: string;
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  cast: CastMember[];
}

interface CastMember {
  name: string;
  character: string;
  profile_path: string;
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
    const movies = urlRespon.data.results;
    mengaturMovies(movies);
    mengaturRekomendasi(movies[0]);
  } catch (error) {
    console.error("Error fetching movies", error);
  }
};

export const fetchMovieDetails = async (movieId: number): Promise<Movie> => {
  try {
    const movieRes = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}`,
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Yzk3NTMyZmVkYmQyMDRhMzNjODdjZDJhYjNkMjkzZiIsIm5iZiI6MTcyMDI3NDg3MC43NzE4NDksInN1YiI6IjY2ODdiZWI2N2Q0NDMwOWM3ZDA4MTM2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w18YSWyJpcRrhVzMaPS_0DSs8_NG2_v_nAMg3YVmGJE`,
        },
      }
    );

    const castRes = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/credits`,
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Yzk3NTMyZmVkYmQyMDRhMzNjODdjZDJhYjNkMjkzZiIsIm5iZiI6MTcyMDI3NDg3MC43NzE4NDksInN1YiI6IjY2ODdiZWI2N2Q0NDMwOWM3ZDA4MTM2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w18YSWyJpcRrhVzMaPS_0DSs8_NG2_v_nAMg3YVmGJE`,
        },
      }
    );

    const movie = movieRes.data;
    const cast = castRes.data.cast.map((castMember: any) => ({
      name: castMember.name,
      character: castMember.character,
      profile_path: castMember.profile_path,
    }));

    return {
      ...movie,
      cast,
    };
  } catch (error) {
    console.error("Error fetching movie details", error);
    throw error;
  }
};
