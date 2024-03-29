import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.error = null;
      state.loading = false;
      state.currentUser = action.payload;
    },
    updateFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteStart: (state) => {
      state.loading = false;
      state.error = null;
    },
    deleteSuccess: (state,action) => {
      state.error = null;
      state.loading = false;
      state.currentUser = null;
    },
    deleteFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signOutSucess: (state, action) => {
      state.error = null;
      state.loading = false;
      state.currentUser = null;
    }
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateStart,
  updateFailure,
  updateSuccess,
  deleteStart,
  deleteFailure,
  deleteSuccess,
  signOutSucess
} = userSlice.actions;
export default userSlice.reducer;
