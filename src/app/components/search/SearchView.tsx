import React, { useState, useEffect } from "react";
import SrcUpcomingMovieItem from "../results/SrcUpcomingMovieItem";
import SrcUpcomingTvShowItem from "../results/SrcUpcomingTvShowItem";

interface SearchViewProps {
  upcomingMoviesList: any[];
  upcomingTvShowsList: any[];
  itemsToShow: number;
  nameMovies?: string;
  nameTvShows?: string;
}

const SearchView: React.FC<SearchViewProps> = ({
  upcomingMoviesList,
  upcomingTvShowsList,
  itemsToShow,
  nameMovies,
  nameTvShows,
}) => {
  const [titleMovies, setTitleMovies] = useState<string>("");
  const [titleTvShows, setTitleTvShows] = useState<string>("");

  useEffect(() => {
    if (nameMovies) {
      setTitleMovies(nameMovies);
    } else {
      setTitleMovies("Upcoming Movies");
    }
  }, [nameMovies]);

  useEffect(() => {
    if (nameTvShows) {
      setTitleTvShows(nameTvShows);
    } else {
      setTitleTvShows("Upcoming TV Shows");
    }
  }, [nameTvShows]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center py-4">
        <h1 className="text-white text-xl">{titleMovies}</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4 pt-6">
          {upcomingMoviesList.slice(0, itemsToShow).map((movie) => (
            <SrcUpcomingMovieItem key={movie.id} comingMovie={movie} />
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-4">
        <h2 className="text-white text-xl">{titleTvShows}</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4 pt-6">
          {upcomingTvShowsList.slice(0, itemsToShow).map((tvShow) => (
            <SrcUpcomingTvShowItem key={tvShow.id} comingTvShow={tvShow} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchView;
