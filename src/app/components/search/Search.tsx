import React from "react";

const Search = ({ setQuery, query, isFetching, noResults }: any) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <input
        type="text"
        value={query}
        name="search"
        autoFocus
        onChange={handleInputChange}
        placeholder="Type to search here..."
        className="bg-gray-700 rounded-2xl text-white focus:outline-gray-500 p-4 w-full"
      />

      {isFetching ? (
        <div className="pt-8">
          <p className="text-center text-white text-xl">Loading...</p>
        </div>
      ) : noResults ? (
        <div className="pt-8">
          <p className="text-center text-white text-xl">Not found</p>
        </div>
      ) : null}
    </div>
  );
};

export default Search;
