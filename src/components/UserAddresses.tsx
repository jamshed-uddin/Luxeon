"use client";

import { useSession } from "next-auth/react";
import React, { FormEvent, useEffect, useState } from "react";
import ModalClient from "./dashboard/ModalClient";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import AddressForm from "./AddressForm";
import { Address } from "@/lib/definition";

import AddNewAddress from "./AddNewAddress";
import { AddressCardSkeleton } from "./Skeletons";
import SectionTitle from "./SectionTitle";

// making a formdata to js object
export const processAddressData = (data: HTMLFormElement) => {
  const formData = new FormData(data);
  const rawData = Object.fromEntries(formData);
  const address = {
    ...rawData,
    isDefault:
      data.querySelector<HTMLInputElement>('input[name="isDefault"]')
        ?.checked || false,
  };

  return address;
};

const UserAddresses = () => {
  const { data, status, update } = useSession();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAdrsForEdit, setSelectedAdrsForEdit] =
    useState<Address | null>(null);

  useEffect(() => {
    if (status === "loading") return;
    setAddresses(data?.user.address as Address[]);
  }, [data?.user.address, status]);

  const openEditModalHandler = () => {
    setOpenEditModal(true);
  };

  const closeEditModal = () => {
    setSelectedAdrsForEdit(null);
    setOpenEditModal(false);
  };

  // updating an address
  const updateAddress = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = e.currentTarget;
    const addressData: Address = processAddressData(data);

    const newAddressArr = addresses.map((address) =>
      address._id === addressData._id
        ? addressData
        : {
            ...address,
            isDefault: addressData.isDefault ? false : address.isDefault,
          }
    );

    update({ address: newAddressArr });
    closeEditModal();
  };

  const deleteAnAddress = (id: string) => {
    const filteredAddress = addresses.filter((address) => address._id !== id);

    update({ address: filteredAddress });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4">
      <div className="">
        <SectionTitle className="text-xl">Addresses</SectionTitle>
      </div>

      <div className="space-y-3 lg:col-span-3">
        <div className="flex justify-end ">
          <AddNewAddress />
        </div>
        {status === "loading" ? (
          <AddressCardSkeleton amount={2} />
        ) : (
          <div className="my-2 space-y-3">
            {openEditModal && selectedAdrsForEdit && (
              <ModalClient
                open={openEditModal}
                close={closeEditModal}
                internalCloseButton={true}
              >
                <AddressForm
                  addressData={selectedAdrsForEdit}
                  submitFunc={updateAddress}
                />
              </ModalClient>
            )}
            {!addresses?.length ? (
              <div>
                <h2>No address added yet.</h2>
              </div>
            ) : (
              addresses?.map((address, index) => (
                <div
                  key={index}
                  className="border border-gray-300 rounded-lg px-2 py-5  relative"
                >
                  <p>
                    {" "}
                    {[
                      address?.name,
                      address?.addressLine,
                      address?.street,
                      address?.city && ` ${address?.city}(${address?.zipCode})`,
                      address?.country,
                    ]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                  <p className="text-sm flex items-center gap-3 font-medium absolute top-1 right-2 ">
                    {address.isDefault && (
                      <span className="border border-gray-400 px-2 rounded-xl text-xs">
                        Default
                      </span>
                    )}

                    {/* edit address button */}
                    <button
                      className="text-blue-600"
                      onClick={() => {
                        openEditModalHandler();
                        setSelectedAdrsForEdit(address);
                      }}
                    >
                      <PencilSquareIcon className="w-4" />
                    </button>
                    {/* delete address button */}
                    <button
                      className="text-blue-600"
                      onClick={() => deleteAnAddress(address._id as string)}
                    >
                      <TrashIcon className="w-4" />
                    </button>
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAddresses;
