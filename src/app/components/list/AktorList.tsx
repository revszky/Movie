import React from "react";

interface DetailAktorProps {
  cast: any[];
}

const AktorList: React.FC<DetailAktorProps> = ({ cast }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="self-start p-6">
        <h2 className="text-2xl font-bold mt-4 text-white">Cast:</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
        {cast.slice(0, 5).map((actor: any) => (
          <div
            key={actor.id}
            className="flex flex-col items-center justify-center"
          >
            <img
              src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
              alt={actor.name}
              className="w-[100px] h-[150px] md:w-[200px] md:h-[300px]"
            />

            <div className="p-4 text-white">
              <p className="text-center">{actor.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AktorList;
