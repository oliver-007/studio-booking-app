import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { searchInputQuery: string; isAreaSelected: boolean } = {
  searchInputQuery: "",
  isAreaSelected: false,
};

const searchInputSlice = createSlice({
  name: "searchInput",
  initialState,
  reducers: {
    setSearchInputQuery: (state, action: PayloadAction<string>) => {
      state.searchInputQuery = action.payload;
    },

    setIsAreaSelected: (state, action: PayloadAction<boolean>) => {
      state.isAreaSelected = action.payload;
    },
  },
});

export const { setSearchInputQuery, setIsAreaSelected } =
  searchInputSlice.actions;
export default searchInputSlice.reducer;
