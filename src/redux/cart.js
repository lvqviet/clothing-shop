import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  products: [],
  totalAmount: 0,
  totalPrice: 0,
};

const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    get_cart: (state, action) => {
      const { detail, _id } = action.payload;
      let totalAmount = 0,
        totalPrice = 0;

      detail.forEach((item) => {
        totalAmount += item.amount;
        totalPrice += item.product.price * item.amount;
      });

      let products = detail.map((e) => {
        return {
          product: e.product,
          amount: e.amount,
          size: e.size,
        };
      });

      return { ...state, totalAmount, totalPrice, products, id: _id };
    },
    add_to_cart: (state, action) => {
      const { product, amount, size } = action.payload;
      let cloneProducts = [...state.products];
      const findIndex = state.products.findIndex(
        (e) => e.product._id == product._id
      );

      if (findIndex == -1) {
        cloneProducts.push({ product, amount, size });
      } else if (state.products[findIndex].size == size) {
        cloneProducts = [...cloneProducts].map((item, index) => {
          if (index == findIndex)
            return { ...item, amount: item.amount + amount };
          return item;
        });
      } else {
        const index = state.products.findIndex(
          (e) => e.product._id == product._id && e.size == size
        );

        if (index != -1) {
          cloneProducts = [...cloneProducts].map((item, idx) => {
            if (index == idx) return { ...item, amount: item.amount + amount };
            return item;
          });
        } else cloneProducts.push({ product, amount, size });
      }

      const totalAmount = state.totalAmount + amount;
      const totalPrice = state.totalPrice + amount * product.price;

      return { ...state, totalAmount, totalPrice, products: cloneProducts };
    },
    delete_item: (state, action) => {
      const { item } = action.payload;
      const cloneProducts = state.products.filter(
        (e) => !(e.product._id == item.product._id && e.size == item.size)
      );

      const totalAmount = state.totalAmount - item.amount;
      const totalPrice = state.totalPrice - item.amount * item.product.price;

      return { ...state, totalAmount, totalPrice, products: cloneProducts };
    },
    increase_amount: (state, action) => {
      const { item } = action.payload;
      const cloneProducts = state.products.map((e) => {
        if (e.product._id == item.product._id && e.size == item.size)
          return { ...e, amount: e.amount + 1 };
        return e;
      });

      const totalAmount = state.totalAmount + 1;
      const totalPrice = state.totalPrice + item.product.price;

      return { ...state, totalAmount, totalPrice, products: cloneProducts };
    },
    decrease_amount: (state, action) => {
      const { item } = action.payload;
      const cloneProducts = state.products.map((e) => {
        if (e.product._id == item.product._id && e.size == item.size)
          return { ...e, amount: e.amount - 1 };
        return e;
      });

      const totalAmount = state.totalAmount - 1;
      const totalPrice = state.totalPrice - item.product.price;

      return { ...state, totalAmount, totalPrice, products: cloneProducts };
    },
    clear: (state, action) => {
      return { ...state, products: [], totalAmount: 0, totalPrice: 0 };
    },
  },
});

export const cartActions = slice.actions;
export const cartReducers = slice.reducer;
