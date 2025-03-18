import { useEffect } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { StudiosData } from "../../data";
import { useAppDispatch, useAppSelector } from "../../RTK/store";
import {
  resetFilteredStudioList,
  setFilteredStudioList,
} from "../../RTK/slices/studioSlice";
import {
  setIsAreaSelected,
  setSearchInputQuery,
} from "../../RTK/slices/searchInputSlice";

const SearchByArea = () => {
  const { searchInputQuery } = useAppSelector(
    (state) => state.searchInputQuery
  );
  const debouncedQuery = useDebounce(searchInputQuery, 500);
  const dispatch = useAppDispatch();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchInputQuery(e.target.value));
  };

  // filtering studio according to search query
  useEffect(() => {
    if (debouncedQuery) {
      const filteredStudio = StudiosData.filter((studio) => {
        return studio.Location.Area.toLowerCase().includes(
          debouncedQuery.toLowerCase()
        );
      });
      dispatch(setFilteredStudioList(filteredStudio));
    } else {
      dispatch(resetFilteredStudioList());
      dispatch(setIsAreaSelected(false));
    }
  }, [debouncedQuery]);

  return (
    <div>
      <input
        type="text"
        value={searchInputQuery}
        onChange={handleSearch}
        className="rounded-full px-4 py-2 shadow-inner shadow-gray-400 bg-white outline-none "
        placeholder="search by area..."
      />
    </div>
  );
};

export default SearchByArea;
