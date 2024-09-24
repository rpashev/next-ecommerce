import { createSelector, createSlice } from "@reduxjs/toolkit";

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
      state.items = action.payload.items || [];
    },
  },
});

export const selectTotalQuantity = (state) => {
  if (state.cart.items?.length === 0) {
    return;
  }
  return state?.cart?.items?.reduce((prevValue, current) => {
    prevValue += +current.quantity;
    return prevValue;
  }, 0);
};

export const selectTotalPrice = (state) => {
  if (state.cart.items?.length === 0) {
    return;
  }
  return state.cart.items?.reduce((prevValue, current) => {
    prevValue += +current.price * +current.quantity;
    return prevValue;
  }, 0);
};
export const selectSingleItem = createSelector(
  [(state) => state.cart?.items, (_, slug) => slug, (_, __, size) => size],
  (cart, slug, size) => {
    if (cart?.length === 0) {
      return null;
    }
    let existingItems = cart.filter((item) => item.slug === slug);
    if (!existingItems?.length) return null;

    let existingItem = size
      ? existingItems?.filter((item) => item.size === size)[0]
      : existingItems[0];
    return existingItem ? existingItem : null;
  }
);

export const cartActions = cartSlice.actions;
export default cartSlice;
