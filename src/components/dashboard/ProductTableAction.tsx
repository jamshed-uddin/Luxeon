"use client";

import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useState } from "react";

import ModalClient from "./ModalClient";

const ProductTableAction = ({ productId }: { productId: string }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <>
      {modalOpen && (
        <ModalClient open={modalOpen} close={closeModal}>
          <div className="space-y-3">
            <h3 className="text-lg font-medium">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-end gap-4">
              <button className="font-medium text-red-600">Confirm</button>
              <button className="font-medium" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </ModalClient>
      )}
      <div className="flex items-center gap-8">
        <Link href={`/products/${productId}`}>
          <EyeIcon className="w-4" />
        </Link>
        <Link href={`/dashboard/edit-product/${productId}`}>
          <PencilIcon className="w-4" />
        </Link>
        <button onClick={openModal}>
          <TrashIcon className="w-4" />
        </button>
      </div>
    </>
  );
};

export default ProductTableAction;
