import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // POINT: For sign-in user
    signInStart: (state) => {
      state.loading = false;
    },

    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = true;
      state.error = null;
    },

    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = true;
    },

    // POINT: For update user in the browser
    updateUserStart: (state) => {
      state.loading = true;
    },

    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },

    updateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    // POINT: For removal of user for localStorage
    deleteUserStart: (state) => {
      state.loading = true;
    },

    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },

    deleteUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    // POINT: For sign out user
    signOutUserStart: (state) => {
      state.loading = true;
    },
    signOutUserSuccess: (state, action) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    signOutUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} = userSlice.actions;

export default userSlice.reducer;
