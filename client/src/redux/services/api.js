import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user")).token
    }`;
  }

  return req;
});

export const getAllRegVehicles = (page) => API.get(`/vehicle?page=${page}`);

export const registerVehicle = (vehicleData) =>
  API.post("/vehicle", vehicleData);

export const updateRegVehicle = (id, updatedVehicleData) =>
  API.patch(`/vehicle/${id}`, updatedVehicleData);

export const deleteRegVehicle = (id) => API.delete(`/vehicle/${id}`);

// routes for signin and signup
export const signIn = (signInData) => API.post("/user/signin", signInData);
export const signUp = (signUpData) => API.post("/user/signup", signUpData);
