import React from "react";
import SrcMovieItem from "../results/SrcMovieItem";
import SrcTvShowItem from "../results/SrcTvShowItem";

interface SearchFoundProps {
  results: any[];
}

const SearchFound: React.FC<SearchFoundProps> = ({ results }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
        {results.map((result) =>
          result.title ? (
            <SrcMovieItem key={result.id} srcMovie={result} />
          ) : (
            <SrcTvShowItem key={result.id} srcTvShow={result} />
          )
        )}
      </div>
    </div>
  );
};

export default SearchFound;
