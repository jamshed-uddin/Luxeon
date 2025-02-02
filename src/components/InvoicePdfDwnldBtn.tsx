"use client";

import React, { Suspense, useEffect, useState } from "react";

import InvoicePdf from "./InvoicePdf";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { Order } from "@/lib/definition";
import { PDFDownloadLink } from "@react-pdf/renderer";

interface InvoicePdfDwnldBtnProps {
  fileName: string;
  order: Order;
}

const InvoicePdfDwnldBtn = ({
  fileName = "Invoice",
  order,
}: InvoicePdfDwnldBtnProps) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      <Suspense
        fallback={
          <button className="lg:px-3 lg:py-1 rounded-xl border border-black w-36 lg:w-40">
            ...
          </button>
        }
      >
        {isClient && (
          <PDFDownloadLink
            document={<InvoicePdf order={order} />}
            fileName={fileName}
            style={{
              display: "flex",
              width: "fit-content",
              borderRadius: 13,
            }}
          >
            {" "}
            <button className="px-3 py-1 rounded-xl border border-black flex items-center gap-1 w-fit text-xs lg:text-base">
              <ArrowDownTrayIcon className="w-4 inline" />{" "}
              <span>Download invoice</span>
            </button>
          </PDFDownloadLink>
        )}
      </Suspense>
    </div>
  );
};

export default InvoicePdfDwnldBtn;
