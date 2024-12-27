"use client";

import { Dialog, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ReactElement } from "react";

interface ModalClientProps {
  open: boolean;
  close: () => void;
  children: ReactElement;
  internalCloseButton?: boolean;
}

const ModalClient = ({
  open,
  close,
  children,
  internalCloseButton = false,
}: ModalClientProps) => {
  return (
    <Dialog
      open={open}
      as="div"
      className="relative z-30 focus:outline-none"
      onClose={close}
    >
      <div className="fixed inset-0 z-40 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="h-fit w-full max-w-md rounded-xl bg-white p-6  duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 shadow-xl"
          >
            {internalCloseButton && (
              <div
                role="button"
                onClick={close}
                className="absolute top-2 right-2 cursor-pointer"
              >
                <XMarkIcon className="w-4" />
              </div>
            )}
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ModalClient;
