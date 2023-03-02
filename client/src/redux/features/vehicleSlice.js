import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../services/api";

// create
export const registerVehicle = createAsyncThunk(
  "vehicle/registerVehicle",
  async ({ vehicleData }) => {
    console.log("registerVehicle", vehicleData);
    try {
      const response = await api.registerVehicle(vehicleData);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

// read
export const getAllRegVehicles = createAsyncThunk(
  "vehicle/getAllRegVehicles",
  async (page) => {
    try {
      const response = await api.getAllRegVehicles(page);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

// delete
export const deleteRegVehicle = createAsyncThunk(
  "vehicle/deleteRegVehicle",
  async ({ id }) => {
    console.log("logs id from delete action", id);
    try {
      const response = await api.deleteRegVehicle(id);
      console.log("logs response", response.data);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

// update
export const updateRegVehicle = createAsyncThunk(
  "vehicle/updateRegVehicle",
  async ({ vehicleData }) => {
    const { _id: id } = vehicleData;
    console.log("this updated vehicle data", vehicleData);
    console.log("this updated id", id);

    try {
      const response = await api.updateRegVehicle(id, vehicleData);
      console.log("response data of update", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const vehicleSlice = createSlice({
  name: "vehicle",
  initialState: {
    registeredVehicles: [],
    currentPage: 1,
    numberOfPages: null,
    error: "",
    loading: false,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: {
    [registerVehicle.pending]: (state, action) => {
      state.loading = true;
    },
    [registerVehicle.fulfilled]: (state, action) => {
      state.loading = false;
      state.registeredVehicles = [...state, action.payload];
    },
    [registerVehicle.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getAllRegVehicles.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllRegVehicles.fulfilled]: (state, action) => {
      state.loading = false;
      state.registeredVehicles = action.payload.data;
      state.numberOfPages = action.payload.numberOfPages;
      state.currentPage = action.payload.currentPage;
    },
    [getAllRegVehicles.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [deleteRegVehicle.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteRegVehicle.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.registeredVehicles = state.registeredVehicles.filter(
          (vehicle) => vehicle._id !== id
        );
      }
    },
    [deleteRegVehicle.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateRegVehicle.pending]: (state, action) => {
      state.loading = true;
    },
    [updateRegVehicle.fulfilled]: (state, action) => {
      state.loading = false;
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.registeredVehicles = state.registeredVehicles.map((vehicle) =>
          vehicle._id === id ? action.payload : vehicle
        );
      }
    },
    [updateRegVehicle.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});

export const { setCurrentPage } = vehicleSlice.actions;

export default vehicleSlice.reducer;
