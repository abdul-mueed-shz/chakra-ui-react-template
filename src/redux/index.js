import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import messageReducer from "./slices/message";
import modulesReducer from "./slices/modules";

export const store = configureStore({
  reducer: {
    user: userReducer,
    message: messageReducer,
    modules: modulesReducer,
  },
});

export default store;
