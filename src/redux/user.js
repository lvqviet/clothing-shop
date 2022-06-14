import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  email: "",
  avatar: "",
  userName: "",
  isLogin: false,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      const { id, email, avatar, userName } = action.payload;

      return {
        ...state,
        isLogin: true,
        id,
        email,
        avatar,
        userName,
      };
    },
    logout: (state, action) => {
      return { ...state, isLogin: false };
    },
  },
});

export const userActions = slice.actions;
export const userReducers = slice.reducer;
