"use client";

import React from "react";

const SatisfactionDashboard = () => {
  const highlights = [
    { label: "Overall Satisfaction", value: "80%", color: "bg-green-500" },
    { label: "Employee Engagement", value: "85%", color: "bg-blue-500" },
    { label: "Client Retention", value: "90%", color: "bg-yellow-500" },
  ];

  return (
    <div className="p-6 bg-[#232F3E] text-gray-200 min-h-screen mt-20 md:mt-0">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {highlights.map((item, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg shadow-lg flex items-center justify-between ${item.color}`}
          >
            <div>
              <h3 className="text-lg font-semibold text-white">{item.label}</h3>
              <p className="text-2xl font-bold text-white">{item.value}</p>
            </div>
            <div>
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 11l3-3m0 0l3 3m-3-3v12"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-[#2E3A47] rounded-lg shadow-lg mb-8">
        <h2 className="text-lg font-semibold mb-4">Evaluate Satisfaction</h2>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="employee-name"
              className="block text-sm font-medium text-gray-400"
            >
              Employee Name
            </label>
            <input
              type="text"
              id="employee-name"
              className="block w-full px-4 py-2 mt-1 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter employee's full name"
            />
          </div>
          <div>
            <label
              htmlFor="satisfaction-score"
              className="block text-sm font-medium text-gray-400"
            >
              Satisfaction Score (0-100)
            </label>
            <input
              type="number"
              id="satisfaction-score"
              className="block w-full px-4 py-2 mt-1 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter satisfaction score"
            />
          </div>
          <div>
            <label
              htmlFor="comments"
              className="block text-sm font-medium text-gray-400"
            >
              Comments
            </label>
            <textarea
              id="comments"
              rows={4}
              className="block w-full px-4 py-2 mt-1 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Provide additional feedback"
            ></textarea>
          </div>
          <button
            type="button"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium"
          >
            Submit Evaluation
          </button>
        </form>
      </div>
    </div>
  );
};

export default SatisfactionDashboard;
