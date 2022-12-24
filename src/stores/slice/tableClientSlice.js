import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getClientsApi, getClientDetailApi,deleteClientApi, getNumberClientDayApi, updateClientApi } from "../../utils/fetchApi";
import { STATUSCODES } from "../constans";

const tableClientSlice = createSlice({
  name: "clients",
  initialState: {
    listClient: [],
    clientDetail: null,
    error: null,
    isLoading: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClients.fulfilled, (state, action) => {
        state.listClient = action.payload.data;
        state.error = false;
        state.isLoading = false;
      })
      .addCase(getClients.rejected, (state) => {
        state.error = true;
        state.isLoading = false;
      })
      .addCase(getClients.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(getClientDetail.fulfilled, (state, action) => {
        state.clientDetail = action.payload.data;
        state.error = false;
        state.isLoading = false;
      })
      .addCase(getClientDetail.rejected, (state) => {
        state.error = true;
        state.isLoading = false;
      })
      .addCase(getClientDetail.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export const getClients = createAsyncThunk(
  "clients/getClients",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getClientsApi();

      if (response.status === STATUSCODES.SUCCESS_GET_UPDATE) {
        return response;
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getClientDetail = createAsyncThunk(
  "clients/getDetailClients",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getClientDetailApi(id);
      if (response.status === STATUSCODES.SUCCESS_GET_UPDATE) {
        return response;
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteClient = createAsyncThunk(
  "clients/getDetailClients",
  async (id, { rejectWithValue }) => {
    try {
      const response = await deleteClientApi(id);
      if (response.status === STATUSCODES.SUCCESS_GET_UPDATE) {
        return response;
      }
      return rejectWithValue(response);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateClient = createAsyncThunk(
  "clients/updateClient",
  async (data, { rejectWithValue }) => {
    try {
      const response = await updateClientApi(data);
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



export default tableClientSlice;
