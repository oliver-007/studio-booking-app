import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IStudio } from "../../types";

interface IFilteredStudioList {
  isSearch: boolean;
  filteredStudioList: IStudio[];
  isSearchByRadius: boolean;
}

const initialState: IFilteredStudioList = {
  isSearch: false,
  filteredStudioList: [],
  isSearchByRadius: false,
};

const studioSlice = createSlice({
  name: "filteredStudioList",
  initialState,
  reducers: {
    setFilteredStudioList: (state, action: PayloadAction<IStudio[] | []>) => {
      state.isSearch = true;
      state.filteredStudioList = action.payload;
    },

    resetFilteredStudioList: (state) => {
      state.isSearch = false;
      state.filteredStudioList = [];
    },

    setIsSearch: (state, action: PayloadAction<boolean>) => {
      state.isSearch = action.payload;
    },

    setIsSearchByRadius: (state, action: PayloadAction<boolean>) => {
      state.isSearchByRadius = action.payload;
    },
  },
});

export const {
  setFilteredStudioList,
  resetFilteredStudioList,
  setIsSearch,
  setIsSearchByRadius,
} = studioSlice.actions;
export default studioSlice.reducer;
