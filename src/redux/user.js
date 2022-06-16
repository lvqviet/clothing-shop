import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  email: "",
  avatar: "",
  userName: "",
  fullName: "",
  isLogin: false,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      const { id, email, avatar, userName, fullName } = action.payload;

      return {
        ...state,
        isLogin: true,
        id,
        email,
        avatar,
        userName,
        fullName,
      };
    },
    logout: (state, action) => {
      return { ...state, isLogin: false };
    },
  },
});

export const userActions = slice.actions;
export const userReducers = slice.reducer;
