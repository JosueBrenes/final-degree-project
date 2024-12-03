"use client";

import React, { useState } from "react";
import { FaFilePdf, FaCalculator, FaDownload } from "react-icons/fa";

const PayrollDashboard = () => {
  const [payroll, setPayroll] = useState([
    {
      id: "EMP-001",
      name: "Carlos Pérez",
      position: "General Manager",
      salary: 5000,
      bonus: 200,
      deductions: 300,
      netPay: 4900,
    },
    {
      id: "EMP-002",
      name: "María López",
      position: "Administrative Manager",
      salary: 4000,
      bonus: 150,
      deductions: 200,
      netPay: 3950,
    },
    {
      id: "EMP-003",
      name: "Jorge Castillo",
      position: "Operations Manager",
      salary: 4500,
      bonus: 250,
      deductions: 300,
      netPay: 4450,
    },
  ]);

  const totalSalary = payroll.reduce((acc, emp) => acc + emp.salary, 0);
  const totalBonus = payroll.reduce((acc, emp) => acc + emp.bonus, 0);
  const totalDeductions = payroll.reduce((acc, emp) => acc + emp.deductions, 0);
  const totalNetPay = payroll.reduce((acc, emp) => acc + emp.netPay, 0);

  return (
    <div className="p-6 bg-[#232F3E] text-gray-200 mt-20 md:mt-0">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-[#2E3A47] rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Payroll Summary</h2>
          <ul className="text-sm">
            <li className="flex justify-between">
              <span>Total Salary:</span> <span>${totalSalary.toFixed(2)}</span>
            </li>
            <li className="flex justify-between">
              <span>Total Bonuses:</span> <span>${totalBonus.toFixed(2)}</span>
            </li>
            <li className="flex justify-between">
              <span>Total Deductions:</span>{" "}
              <span>${totalDeductions.toFixed(2)}</span>
            </li>
            <li className="flex justify-between font-bold">
              <span>Total Net Pay:</span> <span>${totalNetPay.toFixed(2)}</span>
            </li>
          </ul>
          <button className="mt-4 w-full flex items-center justify-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            <FaCalculator className="mr-2" /> Calculate Payroll
          </button>
        </div>
        <div className="lg:col-span-2 p-4 bg-[#2E3A47] rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Payroll Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button className="w-full flex items-center justify-center bg-red-600 text-white py-2 rounded-lg hover:bg-red-700">
              <FaFilePdf className="mr-2" /> Generate Payroll PDF
            </button>
            <button className="w-full flex items-center justify-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
              <FaDownload className="mr-2" /> Export Payroll to Excel
            </button>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-4">Employee Payroll Details</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-300 bg-[#2E3A47] rounded-lg">
            <thead className="text-xs uppercase bg-[#394957] text-gray-200">
              <tr>
                <th className="px-6 py-3">Employee ID</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Position</th>
                <th className="px-6 py-3">Salary</th>
                <th className="px-6 py-3">Bonus</th>
                <th className="px-6 py-3">Deductions</th>
                <th className="px-6 py-3">Net Pay</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payroll.map((employee, index) => (
                <tr
                  key={employee.id}
                  className={`${
                    index % 2 === 0 ? "bg-[#2E3A47]" : "bg-[#3A4A57]"
                  } border-b border-gray-600`}
                >
                  <td className="px-6 py-4 font-medium text-gray-100">
                    {employee.id}
                  </td>
                  <td className="px-6 py-4">{employee.name}</td>
                  <td className="px-6 py-4">{employee.position}</td>
                  <td className="px-6 py-4">${employee.salary.toFixed(2)}</td>
                  <td className="px-6 py-4">${employee.bonus.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    ${employee.deductions.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 font-bold">
                    ${employee.netPay.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-center flex justify-center gap-4">
                    <button
                      title="Download Receipt"
                      className="text-blue-500 hover:text-blue-700"
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
    </div>
  );
};

export default PayrollDashboard;
