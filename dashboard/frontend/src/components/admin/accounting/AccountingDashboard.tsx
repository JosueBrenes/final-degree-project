"use client";

import React from "react";
import {
  FaChartPie,
  FaFileInvoiceDollar,
  FaDollarSign,
  FaClipboardList,
} from "react-icons/fa";

const AccountingDashboard = () => {
  const transactions = [
    {
      id: "TXN-001",
      description: "Salary Payment",
      date: "2023-12-01",
      amount: "$50,000",
      status: "Completed",
    },
    {
      id: "TXN-002",
      description: "Electricity Bill",
      date: "2023-12-05",
      amount: "$1,200",
      status: "Completed",
    },
    {
      id: "TXN-003",
      description: "Office Supplies",
      date: "2023-12-08",
      amount: "$450",
      status: "Pending",
    },
    {
      id: "TXN-004",
      description: "Software Subscription",
      date: "2023-12-10",
      amount: "$3,500",
      status: "Completed",
    },
  ];

  return (
    <div className="p-6 bg-[#232F3E] text-gray-200 mt-20 md:mt-0">
      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <h1 className="text-xl font-semibold">Accounting Dashboard</h1>
        <button className="flex items-center px-4 py-2 bg-blue-700 text-white font-medium text-sm rounded-lg hover:bg-blue-600">
          <FaFileInvoiceDollar className="mr-2" /> Generate Report
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow">
          <FaChartPie className="text-4xl mb-2 text-blue-500" />
          <h3 className="text-lg font-medium">Total Expenses</h3>
          <p className="text-xl font-semibold">$68,950</p>
        </div>
        <div className="flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow">
          <FaChartPie className="text-4xl mb-2 text-green-500" />
          <h3 className="text-lg font-medium">Completed Transactions</h3>
          <p className="text-xl font-semibold">3</p>
        </div>
        <div className="flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow">
          <FaDollarSign className="text-4xl mb-2 text-yellow-400" />
          <h3 className="text-lg font-medium">Pending Payments</h3>
          <p className="text-xl font-semibold">$450</p>
        </div>
        <div className="flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow">
          <FaClipboardList className="text-4xl mb-2 text-red-500" />
          <h3 className="text-lg font-medium">Total Transactions</h3>
          <p className="text-xl font-semibold">{transactions.length}</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
        <table className="w-full text-sm text-left text-gray-300 bg-[#2E3A47] rounded-lg">
          <thead className="text-xs uppercase bg-[#394957] text-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                Transaction ID
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn, index) => (
              <tr
                key={txn.id}
                className={`${
                  index % 2 === 0 ? "bg-[#2E3A47]" : "bg-[#3A4A57]"
                } border-b border-gray-600`}
              >
                <td className="px-6 py-4">{txn.id}</td>
                <td className="px-6 py-4">{txn.description}</td>
                <td className="px-6 py-4">{txn.date}</td>
                <td className="px-6 py-4">{txn.amount}</td>
                <td
                  className={`px-6 py-4 ${
                    txn.status === "Pending"
                      ? "text-yellow-400"
                      : "text-green-400"
                  }`}
                >
                  {txn.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountingDashboard;