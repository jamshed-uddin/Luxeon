"use client";

import React from "react";
import dynamic from "next/dynamic";
import InvoicePdf from "./InvoicePdf";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { Order } from "@/lib/definition";

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => (
      <button className="px-3 py-1 rounded-xl border border-black w-44">
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
        <button className="px-3 py-1 rounded-xl border border-black flex items-center gap-1 w-44">
          <ArrowDownTrayIcon className="w-4 inline" />{" "}
          <span>Download invoice</span>
        </button>
      </PDFDownloadLink>
    </div>
  );
};

export default InvoicePdfDwnldBtn;
