"use client";

import React from "react";
import dynamic from "next/dynamic";
import InvoicePdf from "./InvoicePdf";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { Order } from "@/lib/definition";

const PDFDownloadLink = dynamic(
  () =>
    import("@react-pdf/renderer").then((mod) => ({
      default: mod.PDFDownloadLink,
    })),
  {
    ssr: false,
    loading: () => (
      <button className="lg:px-3 lg:py-1 rounded-xl border border-black w-36 lg:w-40">
        ...
      </button>
    ),
  }
);

interface InvoicePdfDwnldBtnProps {
  fileName: string;
  order: Order;
}

const InvoicePdfDwnldBtn = ({
  fileName = "Invoice",
  order,
}: InvoicePdfDwnldBtnProps) => {
  return (
    <div>
      <PDFDownloadLink
        document={<InvoicePdf order={order} />}
        fileName={fileName}
        style={{
          display: "flex",
          width: "fit-content",
          borderRadius: 13,
        }}
      >
        <button className="px-3 py-1 rounded-xl border border-black flex items-center gap-1 w-fit text-xs lg:text-base">
          <ArrowDownTrayIcon className="w-4 inline" />{" "}
          <span>Download invoice</span>
        </button>
      </PDFDownloadLink>
    </div>
  );
};

export default InvoicePdfDwnldBtn;
