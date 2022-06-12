import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  totalAmount: 0,
  totalPrice: 0,
  totalAfterDiscount: 0,
  selectAll: false,
};

const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add_cart: (state, action) => {
      let payload = action.payload;

      return { ...state, totalAmount: state.totalAmount + payload };
    },
  },
});

export const cartActions = slice.actions;
export const cartReducers = slice.reducer;
