import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllRegVehicles,
  setCurrentPage,
} from "../redux/features/vehicleSlice";

const Pagination = () => {
  const dispatch = useDispatch();
  const { currentPage, numberOfpages } = useSelector((state) => state.vehicle);

  const handlePreviousClick = () => {
    dispatch(setCurrentPage(currentPage - 1));
    dispatch(getAllRegVehicles(currentPage - 1));
  };

  const handleNextClick = () => {
    dispatch(setCurrentPage(currentPage + 1));
    dispatch(getAllRegVehicles(currentPage + 1));
  };

  return (
    <div className="flex justify-end mt-4 mr-4">
      {currentPage !== 1 || currentPage === numberOfpages ? (
        <button
          type="button"
          className="flex rounded-full bg-gray-700 text-white text-lg p-3 font-semibold px-3 py-2"
          onClick={handlePreviousClick}
        >
          previous
        </button>
      ) : (
        <button
          className="flex rounded-full bg-gray-700 text-white text-lg p-3 font-semibold px-3 py-2"
          onClick={handleNextClick}
        >
          next
        </button>
      )}
    </div>
  );
};

export default Pagination;
