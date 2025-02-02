"use client";

import { Address } from "@/lib/definition";
import React, { FormEvent } from "react";

type InputType = {
  name: keyof Address;
  label: string;
  placeholder: string;
  isRequired?: boolean;
};

const addressInputs: InputType[] = [
  {
    name: "name",
    label: "Name",
    placeholder: "Enter your name",
  },
  {
    name: "addressLine",
    label: "Address line",
    placeholder: "Enter your addressLine",
  },
  {
    name: "street",
    label: "Street",
    placeholder: "Enter your street",
    isRequired: true,
  },
  {
    name: "city",
    label: "City",
    placeholder: "Enter your city",
    isRequired: true,
  },
  {
    name: "country",
    label: "County",
    placeholder: "Enter you country",
    isRequired: true,
  },

  {
    name: "zipCode",
    label: "Zipcode",
    placeholder: "Enter your zipcode",
    isRequired: true,
  },
  {
    name: "isDefault",
    label: "Set as default address",
    placeholder: "Default address",
  },
];

interface AddressFormProps {
  addressData?: Address;
  submitFunc: (e: FormEvent<HTMLFormElement>) => void;
}

const inputStyle =
  "border-[1.2px] text-sm   border-gray-600 placeholder:text-gray-600 rounded-lg  focus:outline focus:outline-1 focus:outline-black p-1.5 w-full box-border";

const labelStyle = " font-medium block mb-1";

const AddressForm = ({ addressData, submitFunc }: AddressFormProps) => {
  return (
    <form onSubmit={submitFunc}>
      <div className="space-y-3">
        {addressData?._id && (
          <input
            type={"text"}
            name={"_id"}
            defaultValue={addressData ? addressData._id : ""}
            hidden
          />
        )}
        {addressInputs.map((input) => (
          <div key={input.name} className="space-y-1">
            {input.name === "isDefault" ? (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name={input.name}
                  className="mb-1"
                  defaultChecked={addressData ? addressData[input.name] : false}
                />
                <label className={labelStyle} htmlFor="password">
                  {input.label}
                </label>
              </div>
            ) : (
              <>
                <label className={labelStyle} htmlFor="password">
                  {input.label}
                </label>
                <div className="relative">
                  <input
                    type={"text"}
                    name={input.name}
                    className={inputStyle}
                    placeholder={input.placeholder}
                    defaultValue={addressData ? addressData[input.name] : ""}
                    required={input.isRequired}
                  />
                </div>{" "}
              </>
            )}
          </div>
        ))}
      </div>
      <div className="my-2 flex justify-end">
        <button
          type="submit"
          className="border border-black px-3 py-1 rounded-xl"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
