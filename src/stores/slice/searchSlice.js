import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filters",
  initialState: {
    paramTask: {
      limit: 3,
      page: 1,
    },
  },
  reducers: {
    limitTask: (state, action) => {
      state.paramTask.limit = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.paramTask.page = action.payload;
    },
    setStatus: (state, action) => {
      if (action.payload === "") {
        delete state.paramTask.status;
      } else {
        state.paramTask = { ...state.paramTask, status: action.payload };
      }
    },
  },
});

export default filterSlice;
