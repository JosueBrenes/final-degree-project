"use client";

import React, { useState } from "react";
import { FaFilter, FaSearch } from "react-icons/fa";

const LogsDashboard = () => {
  const logs = [
    {
      id: "LOG-001",
      user: "Admin",
      action: "Created new user",
      date: "2023-12-01",
      severity: "Info",
    },
    {
      id: "LOG-002",
      user: "John Doe",
      action: "Updated settings",
      date: "2023-12-02",
      severity: "Warning",
    },
    {
      id: "LOG-003",
      user: "Jane Smith",
      action: "Deleted a record",
      date: "2023-12-03",
      severity: "Critical",
    },
    {
      id: "LOG-004",
      user: "System",
      action: "Backup completed",
      date: "2023-12-04",
      severity: "Info",
    },
    {
      id: "LOG-005",
      user: "Admin",
      action: "Reset password",
      date: "2023-12-05",
      severity: "Warning",
    },
  ];

  const [filters, setFilters] = useState({
    user: "",
    severity: "",
    date: "",
  });

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div className="p-6 bg-[#232F3E] text-gray-200 mt-20 md:mt-0">
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <h1 className="text-xl font-semibold">Logs</h1>
        <button className="flex items-center px-4 py-2 bg-blue-700 text-white font-medium text-sm rounded-lg hover:bg-blue-600">
          <FaFilter className="mr-2" /> Apply Filters
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label
            htmlFor="user"
            className="block text-sm font-medium text-gray-400"
          >
            User
          </label>
          <input
            type="text"
            id="user"
            name="user"
            value={filters.user}
            onChange={handleFilterChange}
            className="mt-1 p-2 w-full bg-gray-700 text-white border border-gray-600 rounded-lg"
            placeholder="Search by user"
          />
        </div>
        <div>
          <label
            htmlFor="severity"
            className="block text-sm font-medium text-gray-400"
          >
            Severity
          </label>
          <select
            id="severity"
            name="severity"
            value={filters.severity}
            onChange={handleFilterChange}
            className="mt-1 p-2 w-full bg-gray-700 text-white border border-gray-600 rounded-lg"
          >
            <option value="">All</option>
            <option value="Info">Info</option>
            <option value="Warning">Warning</option>
            <option value="Critical">Critical</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-400"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={filters.date}
            onChange={handleFilterChange}
            className="mt-1 p-2 w-full bg-gray-700 text-white border border-gray-600 rounded-lg"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4">Logs</h2>
        <table className="w-full text-sm text-left text-gray-300 bg-[#2E3A47] rounded-lg">
          <thead className="text-xs uppercase bg-[#394957] text-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                Log ID
              </th>
              <th scope="col" className="px-6 py-3">
                User
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Severity
              </th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr
                key={log.id}
                className={`${
                  index % 2 === 0 ? "bg-[#2E3A47]" : "bg-[#3A4A57]"
                } border-b border-gray-600`}
              >
                <td className="px-6 py-4 font-medium text-gray-100">
                  {log.id}
                </td>
                <td className="px-6 py-4">{log.user}</td>
                <td className="px-6 py-4">{log.action}</td>
                <td className="px-6 py-4">{log.date}</td>
                <td
                  className={`px-6 py-4 ${
                    log.severity === "Critical"
                      ? "text-red-400"
                      : log.severity === "Warning"
                        ? "text-yellow-400"
                        : "text-green-400"
                  }`}
                >
                  {log.severity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LogsDashboard;
