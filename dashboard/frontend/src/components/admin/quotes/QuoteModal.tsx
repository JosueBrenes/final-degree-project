"use client";

import React from "react";

const QuoteModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4">
      <div className="bg-[#232F3E] rounded-lg shadow-lg w-full max-w-lg">
        <div className="flex items-center justify-between p-4 border-b border-gray-600">
          <h3 className="text-lg font-semibold text-white">Create New Quote</h3>
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
        <form className="p-6 space-y-4">
          <div>
            <label
              htmlFor="client"
              className="block text-sm font-medium text-gray-400"
            >
              Client
            </label>
            <input
              type="text"
              id="client"
              className="mt-1 p-2 w-full bg-gray-700 text-white border border-gray-600 rounded-lg"
              placeholder="Enter client name"
            />
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
              className="mt-1 p-2 w-full bg-gray-700 text-white border border-gray-600 rounded-lg"
            />
          </div>
          <div>
            <label
              htmlFor="total"
              className="block text-sm font-medium text-gray-400"
            >
              Total
            </label>
            <input
              type="number"
              id="total"
              className="mt-1 p-2 w-full bg-gray-700 text-white border border-gray-600 rounded-lg"
              placeholder="$0.00"
            />
          </div>
          <button
            type="button"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Add Quote
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuoteModal;
