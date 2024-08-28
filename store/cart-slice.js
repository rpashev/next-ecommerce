import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      console.log(action);
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
      const { slug, updatedQuantity, size } = data;

      const existingItem = state.items.find(
        (item) => item.slug === slug && item.size === size
      );
      existingItem.quantity = updatedQuantity;
    },

    removeItem(state, action) {
      const slug = action.payload.slug;
      const size = action.payload.size;

      const index = state.items?.findIndex(
        (item) => item.slug === slug && item.size === size
      );

      state.items?.splice(index, 1);
    },

    setCart(state, action) {
      console.dir(action.payload?.items);
      state.items = action.payload.items || [];
    },
  },
});

export const selectTotalQuantity = (items) => {
  if (items?.length === 0) {
    return;
  }
  return items?.reduce((prevValue, current) => {
    prevValue += current.quantity;
    return prevValue;
  }, 0);
};

export const selectTotalPrice = (items) => {
  if (items?.length === 0) {
    return;
  }
  return items?.reduce((prevValue, current) => {
    prevValue += current.price * current.quantity;
    return prevValue;
  }, 0);
};

export const cartActions = cartSlice.actions;
export default cartSlice;
