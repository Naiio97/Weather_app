import React, { ChangeEvent } from "react";

import { BsSearch } from "react-icons/bs";

type Props = {
  options: [];
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  onOptionSelect: (option: optionType) => void;
  searchCity: string;
};

const Search = ({ options, handleSearch, onOptionSelect, searchCity}: Props) => {

  return (
    <>
      <div className="search">
        <input
          id="city"
          name="city"
          type="text"
          value={searchCity}
          placeholder="Search for a city"
          onChange={(e) => handleSearch(e)}
        />
        <BsSearch />

        {options && options.length > 0 &&  (
          <ul>
            {options.map(
              (option: { name: string; country: string }, index: number) => (
                <li key={option.name + "-" + index}>
                  <button
                    className="list-button"
                    onClick={() => onOptionSelect(option)}
                  >
                    {option.name}, {option.country}
                  </button>
                </li>
              )
            )}
          </ul>
        )}
      </div>
    </>
  );
};

export default Search;
