import { PlusIcon } from "@heroicons/react/24/outline";
import React, { FormEvent, useEffect, useState } from "react";
import ModalClient from "./dashboard/ModalClient";
import AddressForm from "./AddressForm";
import { useSession } from "next-auth/react";
import { processAddressData } from "./UserAddresses";
import { Address } from "@/lib/definition";

const AddNewAddress = () => {
  const { data: session, status, update } = useSession();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  useEffect(() => {
    if (status === "loading") return;
    setAddresses(session?.user.address as Address[]);
  }, [session?.user.address, status]);
  const openCreateModalHandler = () => {
    setOpenCreateModal(true);
  };

  const closeCreateModal = () => {
    setOpenCreateModal(false);
  };

  // adding a new address
  const addNewAddress = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const newAddressData = processAddressData(form);
    const updatedAddressArr = newAddressData.isDefault
      ? addresses.map((address) => ({
          ...address,
          isDefault: false,
        }))
      : addresses;

    update({ address: [...updatedAddressArr, newAddressData] });

    closeCreateModal();
  };

  return (
    <>
      {openCreateModal && (
        <ModalClient
          open={openCreateModal}
          close={closeCreateModal}
          internalCloseButton={true}
        >
          <AddressForm submitFunc={addNewAddress} />
        </ModalClient>
      )}

      <button
        onClick={openCreateModalHandler}
        className="flex items-center font-medium text-sm"
      >
        Add new <PlusIcon className="w-4 text-blue-600 inline" />
      </button>
    </>
  );
};

export default AddNewAddress;
