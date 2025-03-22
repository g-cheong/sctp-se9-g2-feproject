import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getFromDB: (state, action) => {
      state.cart = action.payload;
    },
    addToCart: (state, action) => {
      const index = state.cart.findIndex((cartProduct) => cartProduct.product.id === action.payload.product.id);

      if (index < 0) {
        //if doesnt exist push
        state.cart.push(action.payload);
      } else {
        //if exist update total and quantity
        state.cart[index].total += action.payload.total;
        state.cart[index].quantity += action.payload.quantity;
      }
    },
    addOneProduct: (state, action) => {
      const index = state.cart.findIndex((cartProduct) => cartProduct.id === action.payload.id);

      state.cart[index].quantity += 1;
      state.cart[index].total += state.cart[index].product.price;
    },
    deductOneProduct: (state, action) => {
      const index = state.cart.findIndex((cartProduct) => cartProduct.id === action.payload.id);

      if (state.cart[index].quantity === 1) {
        // remove when 0 left
        state.cart.splice(index, 1);
      } else {
        state.cart[index].quantity -= 1;
        state.cart[index].total -= state.cart[index].product.price;
      }
    },
    removeProduct: (state, action) => {
      const index = state.cart.findIndex((cartProduct) => cartProduct.id === action.payload.id);

      state.cart.splice(index, 1);
    },
    cartReset: (state) => {
      state.cart = [];
    },
  },
});

export const CART_ACTION = cartSlice.actions;

export default cartSlice.reducer;
