import React from 'react';

function SearchBar({ city, setCity, handleSearch }) {
  return (
    <div className="flex gap-2 mb-4 w-full px-2 md:px-0">
      <input
        type="text"
        placeholder="Enter City Name..."
        value={city}
        onChange={(e) => setCity(e.target.value)} //updates city on every key
        onKeyDown={(e) => {
            if(e.key === "Enter"){        //pressing "Enter" key would also be used to search
                handleSearch();
                }
            }}
        className="px-4 py-2 rounded-lg text-black outline-none flex-1"
      />

      <button
        onClick={handleSearch}
        className="bg-white text-blue-600 px-3 md:px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 opacity-55 whitespace-nowrap"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;