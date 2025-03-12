import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user";
import loadSlice from "./features/load";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userSlice,
      load: loadSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
