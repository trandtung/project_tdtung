import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCategoriesApi, getFeedBackApi, getNumberClientDayApi, getTotalClientApi, getTotalImgApi } from "../../utils/fetchApi";
import { STATUSCODES } from "../constans";

const homeslice = createSlice({
  name: "home",
  initialState: {
    listFeedback: [],
    columnClient:[],
    totalClient:null,
    totalImg:null,
    error: null,
    isLoading: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedback.fulfilled, (state, action) => {
        state.listFeedback = action.payload.data;
        state.error = false;
        state.isLoading = false;
      })
      .addCase(getFeedback.rejected, (state) => {
        state.error = true;
        state.isLoading = false;
      })
      .addCase(getFeedback.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getTotalClient.fulfilled, (state, action) => {
        state.totalClient = action.payload.data;
        state.error = false;
        state.isLoading = false;
      })
      .addCase(getTotalClient.rejected, (state) => {
        state.error = true;
        state.isLoading = false;
      })
      .addCase(getTotalClient.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getTotalImg.fulfilled, (state, action) => {
        state.totalImg = action.payload.data;
        state.error = false;
        state.isLoading = false;
      })
      .addCase(getTotalImg.rejected, (state) => {
        state.error = true;
        state.isLoading = false;
      })
      .addCase(getTotalImg.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export const getFeedback = createAsyncThunk(
  "homeslice/getFeedback",
  async (data, { rejectWithValue }) => {
    try {
      const response = await getFeedBackApi();
      if (response.status === STATUSCODES.SUCCESS_GET_UPDATE) {
        return response;
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getNumberClientDay = createAsyncThunk(
  "clients/getDetailClients",
  async (day, { rejectWithValue }) => {
    try {
      // console.log(day)
      const response = await getNumberClientDayApi(day);
      if (response.status === STATUSCODES.SUCCESS_GET_UPDATE) {
        return response;
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getTotalClient = createAsyncThunk(
  "clients/getTotalClient",
  async (day, { rejectWithValue }) => {
    try {
      // console.log(day)
      const response = await getTotalClientApi();
      if (response.status === STATUSCODES.SUCCESS_GET_UPDATE) {
        return response;
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getTotalImg = createAsyncThunk(
  "clients/getTotalImg",
  async (day, { rejectWithValue }) => {
    try {
      // console.log(day)
      const response = await getTotalImgApi();
      if (response.status === STATUSCODES.SUCCESS_GET_UPDATE) {
        return response;
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export default homeslice;
