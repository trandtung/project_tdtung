import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { STATUSCODES } from "../constans";
import {
  getTasksApi,
  addTaskApi,
  removeTaskApi,
  updateTaskApi,
} from "../../utils/fetchApi";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    meta: [],
    removeTasks: [],
    loading: null,
    error: null,
  },
  reducers: {
    removeTasks: (state, action) => {
      state.removeTasks = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.fulfilled, (state, action) => {
        state.items = action.payload.data;
        state.meta = action.payload.meta;
        state.loading = false;
        state.error = false;
      })
      .addCase(getTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTasks.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })

      .addCase(addTask.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(addTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(removeTask.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(removeTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeTask.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
      })
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateTask.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async (data, { rejectWithValue }) => {
    try {
      const response = await getTasksApi(data);
      if (response.status === STATUSCODES.SUCCESS_GET_UPDATE) {
        return response.data;
      }
      return rejectWithValue(response.data.error.message);
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (task, { rejectWithValue }) => {
    try {
      const res = await addTaskApi(task);
      if (res.status === 201) return res.data;
      return rejectWithValue(res.response.data.error.message);
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const removeTask = createAsyncThunk(
  "tasks/removeTask",
  async (idtask, { rejectWithValue }) => {
    try {
      const res = await removeTaskApi(idtask);
      if (res.status === STATUSCODES.SUCCESS_DELETE) return res.data;
      return rejectWithValue(res.response.data.error.message);
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (dataUpdate, { rejectWithValue }) => {
    try {
      const res = await updateTaskApi(dataUpdate);
      if (res.status === STATUSCODES.SUCCESS_GET_UPDATE) return res.data;
      return rejectWithValue(res.response.data.error.message);
    } catch (error) {
      return rejectWithValue(error.response.data.error.message);
    }
  }
);
export default taskSlice;
