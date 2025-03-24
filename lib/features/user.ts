import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface UserState {
  id?: string;
  userName?: string;
  balance?: number;
  apiToken?: string;
  scopes?: string;
  creationDate?: Date;
  modificationDate?: Date;
}

const initialState: UserState = {
  userName: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.userName = action.payload.userName;
      state.balance = action.payload.balance;
      state.apiToken = action.payload.apiToken;
      state.scopes = action.payload.scopes;
      state.creationDate = action.payload.creationDate;
      state.modificationDate = action.payload.modificationDate;
    },
    resetStateUser: () => initialState,
  },
});

export default userSlice.reducer;

export const { updateUser, resetStateUser } = userSlice.actions;
