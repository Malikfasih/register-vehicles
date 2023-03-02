import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "./Spinner";
import { deleteRegVehicle } from "../redux/features/vehicleSlice";

const Table = ({ setCurrentId, setOpenModal }) => {
  const { registeredVehicles, loading } = useSelector((state) => state.vehicle);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.result?._id;
  const dispatch = useDispatch();

  // setting current Vehicle Id on this event
  const EditVehicleData = (id) => {
    setCurrentId(id);
    setOpenModal(true);
  };

  // calling event handler to delete current id data
  const DeleteVehicleData = (id) => {
    if (
      window.confirm("Are you sure you want to delete this vehicle details ?")
    ) {
      dispatch(deleteRegVehicle({ id }));
    }
  };

  // loading vehicles data
  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-700 ">
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Vehicle Name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Color
              </th>
              <th scope="col" className="px-6 py-3">
                Registration No
              </th>
              <th scope="col" className="px-6 py-3">
                Model
              </th>
              <th scope="col" className="px-6 py-3">
                Made By
              </th>
            </tr>
          </thead>
          <tbody>
            {registeredVehicles?.map((vehicle, _id) => (
              <>
                <tr
                  key={vehicle?._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {vehicle?.vehicleName}
                  </td>
                  <td className="px-6 py-4">{vehicle?.vehicleType}</td>

                  <td className="px-6 py-4">{vehicle?.model}</td>
                  <td className="px-6 py-4">{vehicle?.registrationNo}</td>
                  <td className="px-6 py-4">{vehicle?.color}</td>
                  <td className="px-6 py-4">{vehicle?.madeBy}</td>
                  <td className="px-6 py-4 ">
                    {userId === vehicle?.creator && (
                      <div className="flex justify-between">
                        <button
                          type="button"
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          onClick={() => EditVehicleData(vehicle?._id)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          onClick={() => DeleteVehicleData(vehicle?._id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
