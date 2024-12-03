"use client";

import React from "react";

const InventoryModal = ({ onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-50 px-4">
      <div className="bg-[#232F3E] rounded-lg shadow-lg max-w-md w-full sm:w-96">
        <div className="flex items-center justify-between p-4 border-b border-gray-600">
          <h3 className="text-lg font-semibold text-white">Add New Item</h3>
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
            <label className="block text-sm font-medium text-gray-400">Name</label>
            <input
              type="text"
              className="mt-1 p-2 w-full bg-gray-700 text-white border border-gray-600 rounded-lg"
              placeholder="Enter item name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400">Category</label>
            <input
              type="text"
              className="mt-1 p-2 w-full bg-gray-700 text-white border border-gray-600 rounded-lg"
              placeholder="Enter category"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400">Quantity</label>
            <input
              type="number"
              className="mt-1 p-2 w-full bg-gray-700 text-white border border-gray-600 rounded-lg"
              placeholder="Enter quantity"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400">Supplier</label>
            <input
              type="text"
              className="mt-1 p-2 w-full bg-gray-700 text-white border border-gray-600 rounded-lg"
              placeholder="Enter supplier"
            />
          </div>
          <button
            type="button"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Save Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default InventoryModal;
