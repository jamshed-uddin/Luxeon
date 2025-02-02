"use client";

import clsx from "clsx";
import React, { useState } from "react";
import SectionTitle from "../SectionTitle";

const faqs = [
  {
    question: "What makes Luxeon furniture unique?",
    answer:
      "At Luxeon, we craft elegant, one-of-a-kind furniture pieces using premium materials and expert craftsmanship. Each design blends functionality with timeless aesthetics to create furniture that stands out.",
  },
  {
    question: "Do you offer custom furniture designs?",
    answer:
      "Yes! We specialize in custom furniture tailored to your specific needs. Whether it's a unique size, material, or design, we work with you to bring your vision to life.",
  },
  {
    question: "What materials do you use in your furniture?",
    answer:
      "We use high-quality solid wood, metal, marble, and premium upholstery fabrics to ensure durability, elegance, and comfort in every piece.",
  },
  {
    question: "Do you provide nationwide delivery?",
    answer:
      "Yes, we offer delivery across the country. Shipping times vary depending on your location and the type of furniture ordered.",
  },
  {
    question: "How can I care for my Luxeon furniture?",
    answer:
      "To maintain the beauty of your furniture, clean surfaces with a soft, damp cloth, avoid direct sunlight exposure, and use coasters for drinks. We also offer maintenance tips based on the material of your furniture.",
  },
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className="my-container">
      <SectionTitle>Frequently asked questions</SectionTitle>
      <div className="mt-7">
        {faqs.map((faq, index) => (
          <div key={index} className=" pb-3 border-b border-black">
            <button
              className="w-full text-left text-lg font-medium flex justify-between items-center py-3 rounded-lg transition-all"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span className="text-xl">{openIndex === index ? "−" : "+"}</span>
            </button>
            <div
              className={clsx(
                "overflow-hidden transition-all duration-300",
                openIndex === index
                  ? "max-h-40 opacity-100 mt-2"
                  : "max-h-0 opacity-0"
              )}
            >
              <p className="py-3 text-gray-700">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
