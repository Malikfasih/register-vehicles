import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../components/Modal";
import ModalButton from "../components/ModalButton";
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";
import Table from "../components/Table";
import { getAllRegVehicles } from "../redux/features/vehicleSlice";

const Home = () => {
  const [openModal, setOpenModal] = useState(false);
  const [currentId, setCurrentId] = useState(0);
  const { currentPage } = useSelector((state) => state.vehicle);
  const dispatch = useDispatch();
  console.log("current id in home", currentId);

  // fetch Registered vehicles
  useEffect(() => {
    dispatch(getAllRegVehicles(currentPage));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <div className="flex justify-end my-6 mr-4">
          <ModalButton
            setOpenModal={setOpenModal}
            setCurrentId={setCurrentId}
          />
        </div>
        <Modal
          openModal={openModal}
          setOpenModal={setOpenModal}
          currentId={currentId}
          setCurrentId={setCurrentId}
        />
        <Table setCurrentId={setCurrentId} setOpenModal={setOpenModal} />
        <Pagination />
      </div>
    </div>
  );
};

export default Home;
