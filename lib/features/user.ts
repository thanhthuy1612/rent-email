import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface UserState {
  id?: string;
  userName?: string;
  email?: string;
  balance?: number;
  apiToken?: string;
  scopes?: string;
  creationDate?: Date;
  modificationDate?: Date;
  status?: string;
  isDeleted?: boolean;
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
      state.email = action.payload.email;
      state.balance = action.payload.balance;
      state.apiToken = action.payload.apiToken;
      state.scopes = action.payload.scopes;
      state.creationDate = action.payload.creationDate;
      state.modificationDate = action.payload.modificationDate;
      state.status = action.payload.status;
      state.isDeleted = action.payload.isDeleted;
    },
    updateApiToken: (state, action: PayloadAction<string>) => {
      state.apiToken = action.payload;
    },
    resetStateUser: () => initialState,
  },
});

export default userSlice.reducer;

export const { updateUser, updateApiToken, resetStateUser } = userSlice.actions;
