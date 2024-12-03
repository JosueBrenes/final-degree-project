"use client";

import React, { useState } from "react";
import { FaTrash, FaEdit, FaPlus, FaPlane } from "react-icons/fa";
import EmployeesModal from "./EmployeesModal";

const EmployeesTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const employees = [
    {
      id: "EMP-001",
      name: "Carlos Pérez",
      position: "General Manager",
      department: "Management",
      status: "Active",
      startDate: "2015-01-15",
    },
    {
      id: "EMP-002",
      name: "María López",
      position: "Administrative/Financial Manager",
      department: "Administration",
      status: "Active",
      startDate: "2017-03-01",
    },
    {
      id: "EMP-003",
      name: "Jorge Castillo",
      position: "Operations Manager",
      department: "Operations",
      status: "Active",
      startDate: "2018-05-12",
    },
    {
      id: "EMP-004",
      name: "Luisa Sánchez",
      position: "BonAqua Manager",
      department: "Production",
      status: "Active",
      startDate: "2019-07-22",
    },
    {
      id: "EMP-005",
      name: "Ana Morales",
      position: "Administrative Assistant 3M/BonAqua",
      department: "Administration",
      status: "Active",
      startDate: "2020-08-15",
    },
    {
      id: "EMP-006",
      name: "Pedro Gutiérrez",
      position: "BonAqua Operator",
      department: "Production",
      status: "Active",
      startDate: "2021-02-10",
    },
    {
      id: "EMP-007",
      name: "Diego Vargas",
      position: "3M Operator",
      department: "Production",
      status: "Active",
      startDate: "2021-02-10",
    },
    {
      id: "EMP-008",
      name: "Clara Fernández",
      position: "Accounting Manager",
      department: "Finance",
      status: "Active",
      startDate: "2016-04-05",
    },
    {
      id: "EMP-009",
      name: "Laura Ortiz",
      position: "Receptionist",
      department: "Administration",
      status: "Active",
      startDate: "2022-06-25",
    },
    {
      id: "EMP-010",
      name: "Ricardo Gómez",
      position: "Workshop Manager",
      department: "Workshop",
      status: "Active",
      startDate: "2018-11-01",
    },
    {
      id: "EMP-011",
      name: "Juan Martínez",
      position: "Welder",
      department: "Workshop",
      status: "Active",
      startDate: "2020-09-14",
    },
    {
      id: "EMP-012",
      name: "Sofía Rojas",
      position: "Warehouse Manager",
      department: "Warehouse",
      status: "Active",
      startDate: "2017-02-28",
    },
    {
      id: "EMP-013",
      name: "Andrés Blanco",
      position: "Mechanics Manager",
      department: "Mechanics",
      status: "Active",
      startDate: "2019-10-10",
    },
    ...Array.from({ length: 19 }, (_, i) => ({
      id: `EMP-${14 + i}`,
      name: `Assistant ${i + 1}`,
      position: "Operator Assistant",
      department: "Production",
      status: "Active",
      startDate: `2023-${(i % 12) + 1}-15`,
    })),
  ];

  return (
    <div className="p-4 bg-[#232F3E] rounded-lg shadow-lg mt-20 md:mt-0">
      <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
        <div>
          <h1 className="text-lg font-semibold text-gray-100">Employees</h1>
          <p className="text-sm text-gray-400">
            Manage employees, their positions, and departments.
          </p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center px-4 py-2 bg-blue-700 text-white font-medium text-sm rounded-lg hover:bg-blue-600"
          >
            <FaPlus className="mr-2" /> Add Employee
          </button>
          <button
            onClick={() =>
              (window.location.href = "/admin/employees/vacations")
            }
            className="flex items-center px-4 py-2 bg-blue-700 text-white font-medium text-sm rounded-lg hover:bg-blue-600"
          >
            <FaPlane className="mr-2" />
            Vacations
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs uppercase text-gray-200 bg-[#2E3A47]">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Position</th>
              <th className="px-6 py-3">Department</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Start Date</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr
                key={employee.id}
                className={`${
                  index % 2 === 0 ? "bg-[#2E3A47]" : "bg-[#3A4A57]"
                } border-b border-gray-600`}
              >
                <td className="px-6 py-4 font-medium text-gray-100 whitespace-nowrap">
                  {employee.id}
                </td>
                <td className="px-6 py-4">{employee.name}</td>
                <td className="px-6 py-4">{employee.position}</td>
                <td className="px-6 py-4">{employee.department}</td>
                <td className="px-6 py-4">{employee.status}</td>
                <td className="px-6 py-4">{employee.startDate}</td>
                <td className="px-6 py-4 text-center flex justify-center gap-4">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && <EmployeesModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default EmployeesTable;
