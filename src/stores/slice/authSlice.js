import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { STATUSCODES } from "../constans";

import {
  loginApi,
  updatePasswordApi,
  registerUser,
} from "../../utils/fetchApi";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: "",
    },
    accessToken: null,
    errorLogin: "",
    errorRegister: "",
    errorChangePassword: "",
  },
  reducers: {
    changePasswordFailed: (state, action) => {
      state.errorChangePassword = action.payload;
    },
    logOut: (state) => {
      state.initialState = null;
    },
  },
  extraReducers: (buider) => {
    buider
      .addCase(signin.fulfilled, (state, action) => {
        state.login.currentUser = action.payload;
        state.accessToken = action.payload.accessToken;
        state.login.isFetching = false;
      })
      .addCase(signin.rejected, (state, action) => {
        state.errorLogin = action.payload;
      })
      .addCase(signin.pending, (state) => {
        state.login.isFetching = true;
      })

      .addCase(changePassword.rejected, (state, action) => {
        state.errorChangePassword = action.payload;
      })

      .addCase(register.rejected, (state, action) => {
        state.errorRegister = action.payload;
      });
  },
});

export const signin = createAsyncThunk(
  "user/signin",
  async (user, { rejectWithValue }) => {
    try {
      const response = await loginApi(user);
      if (response.accessToken) {
        return response;
      }
      return rejectWithValue(response.response.data.error.message);
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const changePassword = createAsyncThunk(
  "user/updateUser",
  async (user, { rejectWithValue }) => {
    try {
      const response = await updatePasswordApi(user);
      if (response.status === STATUSCODES.SUCCESS_GET_UPDATE) {
        return response.data;
      }
      return rejectWithValue(response.data.error.message);
    } catch (error) {
      return rejectWithValue(error.data.error.message);
    }
  }
);

export const register = createAsyncThunk(
  "user/register",
  async (user, { rejectWithValue }) => {
    try {
      const response = await registerUser(user);
      if (response.status === STATUSCODES.SUCCESS_ADD) {
        return response.data;
      }
      return rejectWithValue(response.data.error.message);
    } catch (error) {
      return rejectWithValue(error.data.error.message);
    }
  }
);

export const {
  signOut,
  loginStart,
  loginFailed,
  loginSuccess,
  registerFailed,
  changePasswordFailed,
} = authSlice.actions;
export default authSlice;
