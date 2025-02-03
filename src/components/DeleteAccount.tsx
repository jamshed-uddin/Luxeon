"use client";

import React, { FormEvent, useState } from "react";
import ModalClient from "./dashboard/ModalClient";
import { signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { requestClient } from "@/lib/requestClient";
import Button from "./Button";

const inputStyle =
  "border-[1.2px] text-sm   border-gray-600 placeholder:text-gray-600 rounded-lg  focus:outline focus:outline-1 focus:outline-black p-1.5 w-full box-border";

const DeleteAccount = () => {
  const { data: session } = useSession();
  const [openModal, setOpenModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const closeModal = () => {
    setOpenModal(false);
  };

  const openModalHandler = () => {
    setOpenModal(true);
  };

  const deleteAccount = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await requestClient(`/users/${session?.user._id}`, {
        method: "delete",
        body: JSON.stringify({ password: currentPassword }),
      });
      signOut({ redirectTo: "/" });
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ModalClient open={openModal} close={closeModal}>
        <div className="space-y-3">
          <h3 className="text-lg font-medium">
            Are you sure you want to delete your account?
          </h3>
          <form onSubmit={deleteAccount}>
            <input
              type={"text"}
              name={"password"}
              className={inputStyle}
              placeholder={"Enter your password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
            <div className="flex justify-end  mt-4">
              <div className="flex  gap-2">
                <Button
                  disabled={loading}
                  loading={loading}
                  type="submit"
                  className=" text-red-600"
                >
                  Confirm
                </Button>
                <Button
                  type="button"
                  className="font-medium"
                  onClick={closeModal}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </form>
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
