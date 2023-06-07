import React from "react";

// register button
const ModalButton = ({ setOpenModal, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      {user?.result ? (
        <button
          className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
          onClick={() => {
            setCurrentId(0);
            setOpenModal(true);
          }}
        >
          Register Vehicle
        </button>
      ) : (
        <button
          className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
          disabled
        >
          Register Vehicle
        </button>
      )}
    </div>
  );
};

export default ModalButton;
