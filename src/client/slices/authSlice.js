import { createSlice } from '@reduxjs/toolkit';

// INITIAL STATE
const initialState = {
  fetching: false,
  token: null,
  type: null, // 'google-oauth' or 'local'
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    loginUser: {
      reducer: (state, { payload }) => {
        state.fetching = true;
        state.token = payload;
      },
    },
    loginUserSuccess: {
      reducer: (state, { payload }) => {
        state.fetching = false;
        state.token = payload.jwt;
      },
    },
    loginUserFailure: {
      reducer: (state) => {
        state.fetching = false;
      },
    },
    logoutUser: {
      reducer: (state) => {
        state.fetching = true;
      },
    },
    logoutUserSuccess: {
      reducer: (state) => {
        state.fetching = false;
        state.token = null;
        state.error = false;
      },
    },
    logoutUserFailure: {
      reducer: (state) => {
        state.fetching = false;
      },
    },
    registerUser: {
      reducer: (state) => {
        state.fetching = true;
      },
    },
    registerUserSuccess: {
      reducer: (state, { payload }) => {
        state.fetching = false;
        state.token = payload.jwt;
      },
    },
    registerUserFailure: {
      reducer: (state) => {
        state.fetching = false;
      },
    },
    resettingAuthState: {
      reducer: (state) => {
        state.fetching = false;
        state.token = null;
        state.error = false;
      },
    },
  },
});

export const {
  loginUser,
  loginUserSuccess,
  loginUserFailure,
  logoutUser,
  logoutUserSuccess,
  logoutUserFailure,
  registerUser,
  registerUserSuccess,
  registerUserFailure,
} = authSlice.actions;

export default authSlice.reducer;
