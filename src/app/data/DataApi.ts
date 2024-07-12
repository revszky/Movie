import axios from 'axios';

const apiKey = '9c97532fedbd204a33c87cd2ab3d293f';

const tokenKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5Yzk3NTMyZmVkYmQyMDRhMzNjODdjZDJhYjNkMjkzZiIsIm5iZiI6MTcyMDI3NDg3MC43NzE4NDksInN1YiI6IjY2ODdiZWI2N2Q0NDMwOWM3ZDA4MTM2YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w18YSWyJpcRrhVzMaPS_0DSs8_NG2_v_nAMg3YVmGJE';

const apiUrl = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${tokenKey}`,
  },
});

export const getMovieDetail = async (id: string) => {
  try {
    const response = await apiUrl.get(`/movie/${id}`, {
      params: {
        api_key: apiKey,
      },
    });
    return response.data;
  } catch (error) {
    console.error('getMovieDetail:', error);
    return null;
  }
};

export const getTvShowDetail = async (id: string) => {
  try {
    const response = await apiUrl.get(`/tv/${id}`, {
      params: {
        api_key: apiKey,
      },
    });
    return response.data;
  } catch (error) {
    console.error('getTvShowDetail:', error);
    return null;
  }
};


export const moviePopuler = async () => {
  try {
    const respon = await apiUrl.get('/movie/popular', {
      params: {
        api_key: apiKey,
      },
    });
    return respon.data.results.map((movie: any) => ({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      rating: movie.vote_average
    }));
  } catch (error) {
    console.error('movie:', error);
    return [];
  }
};

export const tvShows = async () => {
  try {
    const respon = await apiUrl.get('/tv/popular', {
      params: {
        api_key: apiKey,
      },
    });
    return respon.data.results.map((show: any) => ({
      id: show.id,
      name: show.name,
      poster_path: show.poster_path,
      rating: show.vote_average
    }));
  } catch (error) {
    console.error('tv shows:', error);
    return [];
  }
};
