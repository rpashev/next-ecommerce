import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart-slice";
import userSlice from "./user-slice";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const reducers = combineReducers({
  cart: cartSlice.reducer,
  user: userSlice.reducer,
});

const store = configureStore({
  reducer: persistReducer(
    {
      key: "root",
      storage,
    },
    reducers
  ),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
