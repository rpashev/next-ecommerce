import { createSlice } from "@reduxjs/toolkit";

const initialState = { items: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.slug === newItem.slug
      );
      if (!existingItem) {
        state.items.push(newItem);
      } else {
        existingItem.quantity += newItem.quantity;
      }
    },

    updateQuantity(state, action) {
      const slug = action.payload.slug;
      const quantity = action.payload.quantity;

      const existingItem = state.items.find((item) => item.slug === slug);
      existingItem.quantity = quantity;
    },

    removeItem(state, action) {
      const slug = action.payload.slug;
      state.items = state.items.filter((item) => item.slug !== slug);
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
