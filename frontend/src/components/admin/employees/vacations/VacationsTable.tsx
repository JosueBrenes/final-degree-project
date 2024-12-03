"use client";

import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

const VacationsTable = () => {
  const vacationRequests = [
    {
      id: "VAC-001",
      employee: "Carlos Pérez",
      startDate: "2023-12-15",
      endDate: "2023-12-22",
      daysRequested: 7,
      status: "Pending",
    },
    {
      id: "VAC-002",
      employee: "María López",
      startDate: "2024-01-10",
      endDate: "2024-01-15",
      daysRequested: 5,
      status: "Approved",
    },
    {
      id: "VAC-003",
      employee: "Jorge Castillo",
      startDate: "2023-12-01",
      endDate: "2023-12-05",
      daysRequested: 4,
      status: "Rejected",
    },
  ];

  return (
    <div className="p-4 bg-[#232F3E] rounded-lg shadow-lg mt-20 md:mt-0">
      <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
        <div>
          <h1 className="text-lg font-semibold text-gray-100">Vacations</h1>
          <p className="text-sm text-gray-400">
            Manage vacation requests, including approvals and cancellations.
          </p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs uppercase text-gray-200 bg-[#2E3A47]">
            <tr>
              <th className="px-6 py-3">Request ID</th>
              <th className="px-6 py-3">Employee</th>
              <th className="px-6 py-3">Start Date</th>
              <th className="px-6 py-3">End Date</th>
              <th className="px-6 py-3">Days Requested</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {vacationRequests.map((request, index) => (
              <tr
                key={request.id}
                className={`${
                  index % 2 === 0 ? "bg-[#2E3A47]" : "bg-[#3A4A57]"
                } border-b border-gray-600`}
              >
                <td className="px-6 py-4">{request.id}</td>
                <td className="px-6 py-4">{request.employee}</td>
                <td className="px-6 py-4">{request.startDate}</td>
                <td className="px-6 py-4">{request.endDate}</td>
                <td className="px-6 py-4">{request.daysRequested}</td>
                <td className="px-6 py-4">{request.status}</td>
                <td className="px-6 py-4 flex space-x-3">
                  <button
                    className="text-green-500 hover:text-green-400 focus:outline-none"
                    title="Approve"
                  >
                    <FaCheck size={18} />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-400 focus:outline-none"
                    title="Reject"
                  >
                    <FaTimes size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VacationsTable;
