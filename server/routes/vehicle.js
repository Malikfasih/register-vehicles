import express from "express";
import {
  registerVehicle,
  getAllVehiclesDetail,
  updateVehicleDetail,
  deleteVehicleDetail,
} from "../controllers/vehicle.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getAllVehiclesDetail);
router.post("/", auth, registerVehicle);
router.patch("/:id", auth, updateVehicleDetail);
router.delete("/:id", auth, deleteVehicleDetail);

export default router;
