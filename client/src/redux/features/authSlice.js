import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../services/api";

// sign in user
export const signIn = createAsyncThunk("auth/signIn", async (signInData) => {
  try {
    const response = await api.signIn(signInData);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.log(error.message);
  }
});

// sign up user
export const signUp = createAsyncThunk("auth/signUp", async (signUpData) => {
  try {
    const response = await api.signUp(signUpData);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: "",
    userToken: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLogout: (state, action) => {
      localStorage.clear();
      state.user = null;
    },
  },
  extraReducers: {
    [signIn.pending]: (state) => {
      state.loading = true;
    },
    [signIn.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.userToken = payload.userToken;
    },
    [signIn.rejected]: (state) => {
      state.loading = false;
    },
    [signUp.pending]: (state, action) => {
      state.loading = true;
    },
    [signUp.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.userToken = payload.userToken;
    },
    [signUp.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { setUser, setLogout } = authSlice.actions;

export default authSlice.reducer;
