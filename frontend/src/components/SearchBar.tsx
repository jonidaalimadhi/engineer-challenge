import { useState } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/outline";
import { SearchBarProps } from "../types";

import validateSearchInput from "../utils/validateSearchInput";

const SearchBar = ({ value, setSearchCallback }: SearchBarProps) => {
  const [error, setError] = useState<boolean>(false);
  return (
    <div className="w-1/2 h-9 mb-10">
      <div className="flex relative border-2 w-2/3 h-9 border-gray-200 rounded">
        <input
          id="search-bar-input"
          type="text"
          data-testid="search-bar"
          className="px-4 py-2 w-10/12 text-gray-900 bg-pale-gray text-xs focus:outline-none"
          placeholder="Search by name.."
          onChange={(e) =>
            validateSearchInput(e.target.value)
              ? (setSearchCallback(e.target.value), setError(false))
              : setError(true)
          }
          value={value}
        />
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          Your input search can only contain letters and spaces.
        </p>
      )}
    </div>
  );
};

export default SearchBar;
