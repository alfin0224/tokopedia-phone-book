import React from "react";
import { SearchInputContainer } from "./ContactElements";

interface SearchProps {
  searchQuery: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<SearchProps> = ({ searchQuery, handleSearch }) => {
  return (
    <SearchInputContainer>
      <input
        type="text"
        placeholder="Search contacts..."
        value={searchQuery}
        onChange={handleSearch}
      />
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>
    </SearchInputContainer>
  );
};

export default Search;
