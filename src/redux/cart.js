import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  totalAmount: 0,
  totalPrice: 0,
};

const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add_cart: (state, action) => {
      const { product, amount, size } = action.payload;
      let cloneProducts = [...state.products];
      const findIndex = state.products.findIndex((e) => e._id == product._id);
      if (findIndex == -1) {
        cloneProducts.push({ product, amount, size });
      } else if (state.products[findIndex].size == size) {
        cloneProducts[findIndex].amount += 1;
      } else {
        const index = state.products.findIndex(
          (e) => e._id == product._id && e.size == size
        );
        cloneProducts[index].amount += 1;
      }

      const totalAmount = state.totalAmount + amount;
      const totalPrice = state.totalPrice + amount * product.price;

      return { ...state, totalAmount, totalPrice, products: cloneProducts };
    },
  },
});

export const cartActions = slice.actions;
export const cartReducers = slice.reducer;
