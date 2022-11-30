import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCategoriesApi } from "../../utils/fetchApi";
import { saveClientPredictApi } from "../../utils/fetchApi";
import { STATUSCODES } from "../constans";

const predictImgSlice = createSlice({
  name: "predict",
  initialState: {
    error: null,
    isLoading: null,
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
      });
  },
});

export const saveClientInfo = createAsyncThunk(
  "predict/saveClientInfo",
  async (data, { rejectWithValue }) => {
    try {
      const response = await saveClientPredictApi(data);
      console.log(response)
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
