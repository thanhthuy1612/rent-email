import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface LoadState {
  loadingPage: boolean;
}

const initialState: LoadState = {
  loadingPage: false,
};

export const loadSlice = createSlice({
  name: "load",
  initialState,
  reducers: {
    updateLoad: (state, action: PayloadAction<boolean>) => {
      state.loadingPage = action.payload;
    },
    resetStateLoad: () => initialState,
  },
});

export default loadSlice.reducer;

export const { updateLoad, resetStateLoad } = loadSlice.actions;
