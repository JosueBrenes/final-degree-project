"use client";

import React, { useState } from "react";
import { FaFilePdf, FaFileExcel, FaEye, FaDownload } from "react-icons/fa";

const ReportsDashboard = () => {
  const [reportes, setReportes] = useState([
    {
      id: "REP-001",
      title: "Sales Report",
      date: "2023-12-01",
      format: "PDF",
      status: "Generated",
    },
    {
      id: "REP-002",
      title: "Employee Performance",
      date: "2023-12-02",
      format: "Excel",
      status: "Pending",
    },
    {
      id: "REP-003",
      title: "Annual Summary",
      date: "2023-12-03",
      format: "PDF",
      status: "Generated",
    },
  ]);

  return (
    <div className="p-6 bg-[#232F3E] text-gray-200 mt-20 md:mt-0">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <h1 className="text-xl font-semibold">Reports</h1>
        <div className="flex flex-wrap gap-4">
          <button className="flex items-center px-4 py-2 bg-red-600 text-white font-medium text-sm rounded-lg hover:bg-red-500">
            <FaFilePdf className="mr-2" /> Generate PDF
          </button>
          <button className="flex items-center px-4 py-2 bg-green-600 text-white font-medium text-sm rounded-lg hover:bg-green-500">
            <FaFileExcel className="mr-2" /> Generate Excel
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4">Generated Reports</h2>
        <table className="w-full text-sm text-left text-gray-300 bg-[#2E3A47] rounded-lg">
          <thead className="text-xs uppercase bg-[#394957] text-gray-200">
            <tr>
              <th className="px-6 py-3">Report ID</th>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Format</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reportes.map((reporte, index) => (
              <tr
                key={reporte.id}
                className={`${
                  index % 2 === 0 ? "bg-[#2E3A47]" : "bg-[#3A4A57]"
                } border-b border-gray-600`}
              >
                <td className="px-6 py-4 font-medium text-gray-100">
                  {reporte.id}
                </td>
                <td className="px-6 py-4">{reporte.title}</td>
                <td className="px-6 py-4">{reporte.date}</td>
                <td className="px-6 py-4">{reporte.format}</td>
                <td
                  className={`px-6 py-4 ${
                    reporte.status === "Generated"
                      ? "text-green-400"
                      : "text-yellow-400"
                  }`}
                >
                  {reporte.status}
                </td>
                <td className="px-6 py-4 flex justify-center gap-4">
                  <button
                    title="View Report"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEye />
                  </button>
                  <button
                    title="Download Report"
                    className="text-green-500 hover:text-green-700"
                  >
                    <FaDownload />
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

export default ReportsDashboard;
