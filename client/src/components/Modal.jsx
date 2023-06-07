import React, { useState, useEffect } from "react";
import {
  getAllRegVehicles,
  registerVehicle,
  updateRegVehicle,
} from "../redux/features/vehicleSlice";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
  email: "",
  vehicleName: "",
  vehicleType: "",
  madeBy: "",
  color: "",
  model: "",
  registrationNo: "",
};

const Modal = ({ openModal, setOpenModal, currentId, setCurrentId }) => {
  const [vehicleData, setVehicleData] = useState(initialState);
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const { currentPage } = useSelector((state) => state.vehicle);

  // find vehicle that want to be updata/delete
  const vehicle = useSelector((state) =>
    currentId
      ? state.vehicle.registeredVehicles.find(
          (vehicle) => vehicle._id === currentId
        )
      : null
  );

  // updating vehicle that is targeted
  useEffect(() => {
    if (vehicle) setVehicleData({ ...vehicle });
  }, [vehicle]);

  // performing update and create operation
  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId !== 0) {
      dispatch(updateRegVehicle({ currentId, vehicleData }));
      setCurrentId(0);
    } else {
      dispatch(registerVehicle({ vehicleData }));
    }
    dispatch(getAllRegVehicles(currentPage));
    setOpenModal(false);
    setVehicleData(initialState);
  };

  return (
    <>
      <div
        id="registeration-modal"
        tabIndex="-1"
        aria-hidden="true"
        className={
          openModal === true
            ? "fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
            : "hidden"
        }
      >
        <div className="relative w-full h-full max-w-md md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-hide="registeration-modal"
              onClick={() => {
                setVehicleData(initialState);
                setOpenModal(false);
              }}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-6 lg:px-8">
              <h3 className="mb-4 text-xl text-center font-medium text-gray-900 dark:text-white">
                {currentId
                  ? "Editing Vehicle Details"
                  : "Register Your Vehicle"}
              </h3>
              <form className="space-y-6" onSubmit={handleSubmit} action="#">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Your email"
                    defaultValue={
                      currentId ? user?.result?.email : vehicleData.email
                    }
                    required
                    onChange={(e) =>
                      setVehicleData({
                        ...vehicleData,
                        email: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label htmlFor="underline_select" className="">
                    Select Vehicle Type
                  </label>
                  <select
                    id="underline_select"
                    className="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
                    onChange={(e) =>
                      setVehicleData({
                        ...vehicleData,
                        vehicleType: e.target.value,
                      })
                    }
                  >
                    <option defaultValue>
                      {currentId ? vehicle.vehicleType : ""}
                    </option>
                    <option>Bus</option>
                    <option>Car</option>
                    <option>Jeep</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="vehicleName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Vehicle Name
                  </label>
                  <input
                    type="text"
                    name="vehicleName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Vehicle name"
                    defaultValue={
                      currentId ? vehicle.vehicleName : vehicleData.name
                    }
                    onChange={(e) =>
                      setVehicleData({
                        ...vehicleData,
                        vehicleName: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="model"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Vehicle Model
                  </label>
                  <input
                    type="number"
                    name="model"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="model"
                    defaultValue={currentId ? vehicle.model : vehicleData.model}
                    onChange={(e) =>
                      setVehicleData({
                        ...vehicleData,
                        model: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="registrationNo"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Registration No
                  </label>
                  <input
                    type="number"
                    name="registrationNo"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="registration no"
                    defaultValue={
                      currentId
                        ? vehicle.registrationNo
                        : vehicleData.registrationNo
                    }
                    onChange={(e) =>
                      setVehicleData({
                        ...vehicleData,
                        registrationNo: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="color"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Color
                  </label>
                  <input
                    type="text"
                    name="color"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="color"
                    defaultValue={currentId ? vehicle.color : vehicleData.color}
                    onChange={(e) =>
                      setVehicleData({
                        ...vehicleData,
                        color: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="madeBy"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Made By
                  </label>
                  <input
                    type="text"
                    name="madeBy"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="company name"
                    defaultValue={
                      currentId ? vehicle.madeBy : vehicleData.madeBy
                    }
                    onChange={(e) =>
                      setVehicleData({
                        ...vehicleData,
                        madeBy: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  {currentId ? "Edit" : "Register"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
