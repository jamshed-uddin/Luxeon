"use client";

import React, { useState } from "react";
import ModalClient from "./dashboard/ModalClient";

const DeleteAccount = () => {
  const [openModal, setOpenModal] = useState(false);

  const closeModal = () => {
    setOpenModal(false);
  };

  const openModalHandler = () => {
    setOpenModal(true);
  };

  return (
    <>
      <ModalClient open={openModal} close={closeModal}>
        <div className="space-y-3">
          <h3 className="text-lg font-medium">
            Are you sure you want to delete your account?
          </h3>
          <div className="flex justify-end gap-4">
            <button className="font-medium text-red-600">Confirm</button>
            <button className="font-medium" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      </ModalClient>
      <div className="flex justify-end pt-16">
        <button
          onClick={openModalHandler}
          className="text-xl font-medium text-red-600"
        >
          Delete account
        </button>
      </div>
    </>
  );
};

export default DeleteAccount;
