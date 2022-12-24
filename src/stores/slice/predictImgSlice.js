import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addFeedBackApi, getCategoriesApi, getListImageApi } from "../../utils/fetchApi";
import { saveClientPredictApi,saveManyImageApi } from "../../utils/fetchApi";
import { STATUSCODES } from "../constans";

const predictImgSlice = createSlice({
  name: "predict",
  initialState: {
    error: null,
    isLoading: null,
    listImage:null
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveClientInfo.fulfilled, (state, action) => {
        state.error = false;
        state.isLoading = false;
      })
      .addCase(saveClientInfo.rejected, (state) => {
        state.error = true;
        state.isLoading = false;
      })
      .addCase(saveClientInfo.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getListImage.fulfilled, (state, action) => {
        state.error = false;
        state.isLoading = false;
        state.listImage= action.payload.data
      })
      .addCase(getListImage.rejected, (state) => {
        state.error = true;
        state.isLoading = false;
      })
      .addCase(getListImage.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export const saveClientInfo = createAsyncThunk(
  "predict/saveClientInfo",
  async (data, { rejectWithValue }) => {
    try {
      const response = await saveClientPredictApi(data);
      // console.log(response)
      if (response.status === STATUSCODES.SUCCESS_GET_UPDATE) {
        return response;
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const saveManyImage = createAsyncThunk(
  "predict/saveManyImage",
  async (data, { rejectWithValue }) => {
    try {
      // console.log(data)
      const response = await saveManyImageApi(data);
      // console.log(response)
      if (response.status === STATUSCODES.SUCCESS_GET_UPDATE) {
        return response;
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getListImage = createAsyncThunk(
  "predict/getListImage",
  async (data, { rejectWithValue }) => {
    try {
      // console.log(data)
      const response = await getListImageApi(data);
      // console.log(response)
      if (response.status === STATUSCODES.SUCCESS_GET_UPDATE) {
        return response;
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addFeedback = createAsyncThunk(
  "predict/getListImage",
  async (data, { rejectWithValue }) => {
    try {
      const response = await addFeedBackApi(data);
      if (response.status === STATUSCODES.SUCCESS_GET_UPDATE) {
        return response;
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export default predictImgSlice;
