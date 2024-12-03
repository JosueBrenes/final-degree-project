"use client";

import React from "react";

const EmployeesModal = ({ onClose }) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 px-4 sm:px-6 lg:px-8"
    >
      <div className="bg-[#232F3E] rounded-lg shadow-lg max-w-md w-full mx-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-600">
          <h3 className="text-lg font-semibold text-white">Add New Employee</h3>
          <button
            type="button"
            className="text-gray-400 hover:text-gray-300"
            onClick={onClose}
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <form className="p-4">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-400"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 p-2 w-full bg-gray-700 text-white border border-gray-600 rounded-lg"
              placeholder="Enter employee name"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="position"
              className="block text-sm font-medium text-gray-400"
            >
              Position
            </label>
            <select
              id="position"
              className="mt-1 p-2 w-full bg-gray-700 text-white border border-gray-600 rounded-lg"
            >
              <option value="">Select Position</option>
              <option value="General Manager">General Manager</option>
              <option value="Administrative Manager">Administrative Manager</option>
              <option value="Operator Assistant">Operator Assistant</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="department"
              className="block text-sm font-medium text-gray-400"
            >
              Department
            </label>
            <input
              type="text"
              id="department"
              className="mt-1 p-2 w-full bg-gray-700 text-white border border-gray-600 rounded-lg"
              placeholder="Enter department"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-gray-400"
            >
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              className="mt-1 p-2 w-full bg-gray-700 text-white border border-gray-600 rounded-lg"
            />
          </div>
          <button
            type="button"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeesModal;
