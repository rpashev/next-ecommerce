import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.slug === newItem.slug && item.size === newItem.size
      );
      if (!existingItem) {
        state.items.push(newItem);
      } else {
        existingItem.quantity += newItem.quantity;
      }
    },

    updateQuantity(state, action) {
      const data = action.payload;
      const { slug, quantity, size } = data;

      const existingItem = state.items.find(
        (item) => item.slug === slug && item.size === size
      );
      existingItem.quantity = quantity;
    },

    removeItem(state, action) {
      const slug = action.payload.slug;
      const size = action.payload.size;
      state.items = state.items.filter(
        (item) => item.slug !== slug && item.size !== size
      );
    },

    setCart(state, action) {
      state.items = action.payload.items;
    },
  },
});

export const selectTotalQuantity = (items) => {
  return items.reduce(
    prevValue,
    (current) => {
      prevValue += current.quantity;
    },
    0
  );
};

export const selectTotalPrice = (items) => {
  return items.reduce(
    prevValue,
    (current) => {
      prevValue += current.price * current.quantity;
    },
    0
  );
};

export const selectTotalProductPrice = (item) => {
  return item.price * item.quantity;
};

export const cartActions = cartSlice.actions;
export default cartSlice;
