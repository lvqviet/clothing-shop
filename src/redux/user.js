import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      return { ...state, isLogin: true };
    },
    logout: (state, action) => {
      return { ...state, isLogin: false };
    },
  },
});

export const userActions = slice.actions;
export const userReducers = slice.reducer;
