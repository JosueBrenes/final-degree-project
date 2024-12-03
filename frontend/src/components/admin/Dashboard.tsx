"use client";

import React from "react";
import {
  FaUsers,
  FaFileInvoiceDollar,
  FaClipboardCheck,
  FaBoxOpen,
} from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="p-6 bg-[#232F3E] text-gray-200 mt-20 md:mt-0">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="p-4 bg-[#2E3A47] rounded-lg shadow-lg flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Employees</h3>
            <p className="text-2xl font-bold">125</p>
          </div>
          <FaUsers className="text-blue-400 text-3xl" />
        </div>
        <div className="p-4 bg-[#2E3A47] rounded-lg shadow-lg flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Pending Quotes</h3>
            <p className="text-2xl font-bold">35</p>
          </div>
          <FaFileInvoiceDollar className="text-green-400 text-3xl" />
        </div>
        <div className="p-4 bg-[#2E3A47] rounded-lg shadow-lg flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Completed Tasks</h3>
            <p className="text-2xl font-bold">85%</p>
          </div>
          <FaClipboardCheck className="text-purple-400 text-3xl" />
        </div>
        <div className="p-4 bg-[#2E3A47] rounded-lg shadow-lg flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Inventory Items</h3>
            <p className="text-2xl font-bold">400</p>
          </div>
          <FaBoxOpen className="text-orange-400 text-3xl" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-[#2E3A47] p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Employee Satisfaction</h3>
          <div className="bg-gray-800 h-64 rounded-md flex items-center justify-center">
            <p className="text-gray-400">[Insert Satisfaction Chart]</p>
          </div>
        </div>
        <div className="bg-[#2E3A47] p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Sales Performance</h3>
          <div className="bg-gray-800 h-64 rounded-md flex items-center justify-center">
            <p className="text-gray-400">[Insert Sales Chart]</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-[#2E3A47] p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">
            Recent Employee Activity
          </h3>
          <ul className="space-y-4">
            <li className="bg-[#394957] p-4 rounded-md flex justify-between">
              <span>Carlos Pérez completed training</span>
              <span className="text-green-400">Today</span>
            </li>
            <li className="bg-[#394957] p-4 rounded-md flex justify-between">
              <span>María López submitted a report</span>
              <span className="text-gray-400">2 Days Ago</span>
            </li>
          </ul>
        </div>
        <div className="bg-[#2E3A47] p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Inventory Updates</h3>
          <ul className="space-y-4">
            <li className="bg-[#394957] p-4 rounded-md flex justify-between">
              <span>New helmets added to safety equipment</span>
              <span className="text-green-400">+30</span>
            </li>
            <li className="bg-[#394957] p-4 rounded-md flex justify-between">
              <span>Low stock on Conveyor Belts</span>
              <span className="text-red-400">-10</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-[#2E3A47] p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Employee Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-xs uppercase text-gray-200 bg-[#394957]">
              <tr>
                <th className="px-6 py-3">Employee</th>
                <th className="px-6 py-3">Task Completed</th>
                <th className="px-6 py-3">Satisfaction</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-[#3A4A57]">
                <td className="px-6 py-4">Carlos Pérez</td>
                <td className="px-6 py-4">95%</td>
                <td className="px-6 py-4 text-green-400">High</td>
              </tr>
              <tr className="bg-[#2E3A47]">
                <td className="px-6 py-4">María López</td>
                <td className="px-6 py-4">88%</td>
                <td className="px-6 py-4 text-yellow-400">Medium</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
