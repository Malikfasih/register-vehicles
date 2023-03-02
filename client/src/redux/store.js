import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice";
import vehicleReducer from "./features/vehicleSlice";

export default configureStore({
  reducer: {
    auth: AuthReducer,
    vehicle: vehicleReducer,
  },
});
