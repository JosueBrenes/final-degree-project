"use client";

import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import QuoteModal from "./QuoteModal";

const QuotesTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const quotes = [
    {
      id: "COT-001",
      client: "John Doe",
      date: "2023-12-01",
      total: "$500.00",
      status: "Pending",
      items: 3,
    },
    {
      id: "COT-002",
      client: "Jane Smith",
      date: "2023-12-02",
      total: "$1,200.00",
      status: "Approved",
      items: 5,
    },
    {
      id: "COT-003",
      client: "ACME Corp",
      date: "2023-12-03",
      total: "$3,450.00",
      status: "Rejected",
      items: 8,
    },
  ];

  return (
    <div className="relative shadow-md sm:rounded-lg bg-[#232F3E] p-4 mt-20 md:mt-0">
      <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
        <div>
          <h1 className="text-lg font-semibold text-gray-100">Quotes</h1>
          <p className="text-sm text-gray-400">
            Browse a list of quotes, including client details, status, and total amounts.
          </p>
        </div>
        <button
  onClick={() => setIsModalOpen(true)}
  className="flex items-center px-2 py-2 bg-blue-700 text-white font-medium text-sm rounded-lg hover:bg-blue-600 w-fit"
>
  <FaPlus className="mr-2 text-sm" />
  Add Quote
</button>

      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs uppercase text-gray-200 bg-[#2E3A47]">
            <tr>
              <th className="px-6 py-3">Quote ID</th>
              <th className="px-6 py-3">Client</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Total</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Items</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((quote, index) => (
              <tr
                key={quote.id}
                className={`${
                  index % 2 === 0 ? "bg-[#2E3A47]" : "bg-[#3A4A57]"
                } border-b border-gray-600`}
              >
                <td className="px-6 py-4">{quote.id}</td>
                <td className="px-6 py-4">{quote.client}</td>
                <td className="px-6 py-4">{quote.date}</td>
                <td className="px-6 py-4">{quote.total}</td>
                <td className="px-6 py-4">{quote.status}</td>
                <td className="px-6 py-4">{quote.items}</td>
                <td className="px-6 py-4 text-center space-x-2">
                  <button className="text-blue-500 hover:text-blue-700" title="Edit Quote">
                    <FaEdit />
                  </button>
                  <button className="text-red-500 hover:text-red-700" title="Delete Quote">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && <QuoteModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default QuotesTable;
