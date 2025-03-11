import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface UserState {
  name: string;
  phone: string;
}

const initialState: UserState = {
  name: "",
  phone: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
    resetStateUser: () => initialState,
  },
});

export default userSlice.reducer;

export const { updateUser, resetStateUser } = userSlice.actions;
