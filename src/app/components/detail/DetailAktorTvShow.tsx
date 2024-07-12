import React from "react";

interface DetailAktorTvShowProps {
  cast: any[];
}

const DetailAktorTvShow: React.FC<DetailAktorTvShowProps> = ({ cast }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mt-4">Cast:</h2>
      <div className="flex flex-wrap mt-2">
        {cast.slice(0, 5).map((actor: any) => (
          <div key={actor.id} className="flex items-center mr-4 mb-4">
            <img
              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
              alt={actor.name}
              className="rounded-full w-16 h-16 object-cover"
            />
            <span className="ml-2">{actor.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailAktorTvShow;
