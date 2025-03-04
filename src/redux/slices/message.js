import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
  message: null,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setGlobalMessage: (state, action) => {
      state.message = action.payload.message;
    },
    setGlobalError: (state, action) => {
      state.error = action.payload.error;
    },
  },
});

export const { setGlobalMessage, setGlobalError } = messageSlice.actions;
export default messageSlice.reducer;
