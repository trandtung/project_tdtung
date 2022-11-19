import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCategoriesApi } from "../../utils/fetchApi";
import { STATUSCODES } from "../constans";

const cateSlice = createSlice({
  name: "category",
  initialState: {
    list: [],
    meta: [],
    error: null,
    isLoading: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.fulfilled, (state, action) => {
        state.list = action.payload;
        state.error = false;
        state.isLoading = false;
      })
      .addCase(getCategories.rejected, (state) => {
        state.error = true;
        state.isLoading = false;
      })
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export const getCategories = createAsyncThunk(
  "cates/getCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCategoriesApi();
      if (response.status === STATUSCODES.SUCCESS_GET_UPDATE) {
        return response.data.data;
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export default cateSlice;
