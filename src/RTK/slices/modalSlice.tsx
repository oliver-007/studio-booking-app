import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IStudio } from "../../types";

interface IInitialState {
  isModalOpen: boolean;
  studio: IStudio | null;
}

const initialState: IInitialState = {
  isModalOpen: false,
  studio: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModal: (state, action: PayloadAction<IStudio | null>) => {
      state.isModalOpen = true;
      state.studio = action.payload;
    },

    closeModal: (state) => {
      state.isModalOpen = false;
      state.studio = null;
    },
  },
});

export const { setModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
