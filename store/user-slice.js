import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      console.log(action.payload);
      state.userData = {
        email: action.payload.email,
        name:
          action.payload.name.firstName + " " + action.payload.name.lastName,
      };
    },

    logoutUser(state) {
      state.userData = null;
    },
  },
});

export const selectUserData = (state) => state.user?.userData;
export const isLoggedIn = (state) => !!state.user?.userData;

export const userActions = userSlice.actions;
export default userSlice;
