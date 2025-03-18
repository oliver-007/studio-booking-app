import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import responseMessageReducer from "./slices/responseMessageSlice";
import modalReducer from "./slices/modalSlice";
import filteredStudioListReducer from "./slices/studioSlice";
import searchInputQueryReducer from "./slices/searchInputSlice";

export const store = configureStore({
  reducer: {
    responseMessage: responseMessageReducer,
    modal: modalReducer,
    filteredStudioList: filteredStudioListReducer,
    searchInputQuery: searchInputQueryReducer,
  },
});

setupListeners(store.dispatch);

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
