import mongoose from "mongoose";

const VehicleSchema = new mongoose.Schema({
  vehicleName: { type: String, required: true },
  vehicleType: { type: String, required: true },
  madeBy: { type: String, required: true },
  color: { type: String, required: true },
  model: { type: String, required: true },
  registrationNo: { type: Number, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("Vehicle", VehicleSchema);
