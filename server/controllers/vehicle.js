import mongoose from "mongoose";
import Vehicles from "../mongodb/models/vehicles.js";
import User from "../mongodb/models/user.js";

// create
export const registerVehicle = async (req, res) => {
  const {
    email,
    vehicleName,
    vehicleType,
    madeBy,
    color,
    model,
    registrationNo,
  } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) throw new Error("User not found with this email");

    const newVehicle = await Vehicles.create({
      vehicleName,
      vehicleType,
      madeBy,
      color,
      model,
      registrationNo,
      creator: user._id,
    });

    user.registeredVehicles.push(newVehicle._id);
    await user.save();

    res.status(200).json("Vehicle registered successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// read
export const getAllVehiclesDetail = async (req, res) => {
  const { page } = req.query;
  try {
    // number of vehicles per page
    const LIMIT = 8;

    //start index of the every page
    const startIndex = (Number(page) - 1) * LIMIT;

    const total = await Vehicles.countDocuments();
    const vehicles = await Vehicles.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);
    res.status(200).json({
      data: vehicles,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch {
    (error) => {
      res.status(404).json({ message: error.message });
    };
  }
};

// update
export const updateVehicleDetail = async (req, res) => {
  const { id } = req.params;
  const { vehicleName, vehicleType, madeBy, color, model, registrationNo } =
    req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ message: `No vehicle exist with id: ${id}` });
    }

    await Vehicles.findByIdAndUpdate(
      { _id: id },
      {
        _id: id,
        vehicleName,
        vehicleType,
        madeBy,
        color,
        model,
        registrationNo,
      },
      {
        new: true,
      }
    );

    res.status(200).json({ message: "Vehical details updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete
export const deleteVehicleDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const vehicleToDelete = await Vehicles.findById({ _id: id }).populate(
      "creator"
    );

    if (!vehicleToDelete) throw new Error("Vehicle detail not found");

    await vehicleToDelete.remove();

    // remove vehicle from creator
    vehicleToDelete.creator.registeredVehicles.pull(vehicleToDelete);

    // remove creator from vehicle
    await vehicleToDelete.creator.save();

    res.status(200).json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
