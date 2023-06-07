import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllRegVehicles,
  setCurrentPage,
} from "../redux/features/vehicleSlice";

const Pagination = () => {
  const dispatch = useDispatch();
  const { currentPage, numberOfPages, registeredVehicles } = useSelector(
    (state) => state.vehicle
  );

  const handlePreviousClick = () => {
    dispatch(setCurrentPage(currentPage - 1));
    dispatch(getAllRegVehicles(currentPage - 1));
  };

  const handleNextClick = () => {
    dispatch(setCurrentPage(currentPage + 1));
    dispatch(getAllRegVehicles(currentPage + 1));
  };

  return (
    <>
      {registeredVehicles.length ? (
        <div className="flex justify-end mt-4 mr-4">
          <button
            type="button"
            className="flex rounded-full bg-gray-700 w-32 text-white text-lg pl-7 mr-5 font-semibold py-2"
            onClick={handlePreviousClick}
            disabled={currentPage === 1 ? true : false}
          >
            previous
          </button>

          <button
            className="flex rounded-full bg-gray-700 w-32 text-white text-lg pl-12 font-semibold py-2"
            onClick={handleNextClick}
            disabled={currentPage === numberOfPages ? true : false}
          >
            next
          </button>
        </div>
      ) : null}
    </>
  );
};

export default Pagination;
