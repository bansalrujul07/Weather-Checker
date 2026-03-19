import React from 'react';

function SearchBar({ city, setCity, handleSearch }) {
  return (
    <div className="flex gap-2 mb-4">
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
        className="px-4 py-2 rounded-lg text-black outline-none"
      />

      <button
        onClick={handleSearch}
        className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 opacity-55"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;