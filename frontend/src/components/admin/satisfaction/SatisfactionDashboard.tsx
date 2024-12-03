"use client";

import React from "react";

const SatisfactionDashboard = () => {
  const satisfactionSummary = [
    { type: "Employee Satisfaction", value: "85%" },
    { type: "Client Satisfaction", value: "75%" },
  ];

  const recentSurveys = [
    { id: "SUR-001", type: "Employee", date: "2023-12-01", score: 88 },
    { id: "SUR-002", type: "Client", date: "2023-12-05", score: 72 },
    { id: "SUR-003", type: "Employee", date: "2023-12-07", score: 90 },
    { id: "SUR-004", type: "Client", date: "2023-12-10", score: 78 },
  ];

  return (
    <div className="p-6 bg-[#232F3E] text-gray-200 mt-20 md:mt-0">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="p-4 bg-[#2E3A47] rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Satisfaction Summary</h2>
          <ul className="text-sm space-y-2">
            {satisfactionSummary.map((item, index) => (
              <li
                key={index}
                className="flex justify-between bg-[#394957] p-3 rounded-md"
              >
                <span className="truncate">{item.type}:</span>
                <span className="font-bold">{item.value}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 bg-[#2E3A47] rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Recent Surveys</h2>
          <div className="overflow-x-auto">
            <ul className="text-sm space-y-2">
              {recentSurveys.map((survey) => (
                <li
                  key={survey.id}
                  className="flex justify-between bg-[#394957] p-3 rounded-md"
                >
                  <div className="truncate">
                    <span className="font-medium">{survey.type}</span> -{" "}
                    <span>{survey.date}</span>
                  </div>
                  <span className="font-bold">{survey.score}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SatisfactionDashboard;
