"use client";

import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

const RecruitmentTable = () => {
  const [vacancies, setVacancies] = useState([
    {
      id: "VAC-001",
      title: "Software Engineer",
      department: "IT",
      status: "Active",
      publishDate: "2023-12-10",
    },
    {
      id: "VAC-002",
      title: "HR Manager",
      department: "Human Resources",
      status: "Scheduled",
      publishDate: "2023-12-15",
    },
    {
      id: "VAC-003",
      title: "Marketing Specialist",
      department: "Marketing",
      status: "Draft",
      publishDate: null,
    },
  ]);

  const [applications, setApplications] = useState([
    {
      id: "APP-001",
      applicant: "John Doe",
      position: "Software Engineer",
      vacancyId: "VAC-001",
      status: "Pending",
      appliedDate: "2023-12-05",
    },
    {
      id: "APP-002",
      applicant: "Jane Smith",
      position: "HR Manager",
      vacancyId: "VAC-002",
      status: "Accepted",
      appliedDate: "2023-12-07",
    },
    {
      id: "APP-003",
      applicant: "David Brown",
      position: "Marketing Specialist",
      vacancyId: "VAC-003",
      status: "Rejected",
      appliedDate: "2023-12-09",
    },
  ]);

  return (
    <div className="space-y-6 mt-20 md:mt-0">
      <div className="bg-[#232F3E] p-6 rounded-lg shadow-lg">
        <h1 className="text-lg font-semibold text-gray-100">Vacancies</h1>
        <p className="text-sm text-gray-400 mb-4">
          Manage job postings, including creating and updating vacancies.
        </p>
        <form className="flex flex-wrap gap-4 mb-6">
          <input
            type="text"
            placeholder="Job Title"
            className="flex-1 min-w-[200px] p-2 rounded-lg bg-gray-700 text-white"
          />
          <input
            type="text"
            placeholder="Department"
            className="flex-1 min-w-[200px] p-2 rounded-lg bg-gray-700 text-white"
          />
          <input
            type="date"
            className="flex-1 min-w-[200px] p-2 rounded-lg bg-gray-700 text-white"
          />
          <button
            type="button"
            className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-600"
          >
            Publish
          </button>
        </form>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-xs uppercase text-gray-200 bg-[#2E3A47]">
              <tr>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Department</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Publish Date</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vacancies.map((vacancy, index) => (
                <tr
                  key={vacancy.id}
                  className={`${
                    index % 2 === 0 ? "bg-[#2E3A47]" : "bg-[#3A4A57]"
                  } border-b border-gray-600`}
                >
                  <td className="px-6 py-4">{vacancy.id}</td>
                  <td className="px-6 py-4">{vacancy.title}</td>
                  <td className="px-6 py-4">{vacancy.department}</td>
                  <td className="px-6 py-4">{vacancy.status}</td>
                  <td className="px-6 py-4">
                    {vacancy.publishDate || "Not Scheduled"}
                  </td>
                  <td className="px-6 py-4 text-center space-x-2">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      title="Edit Vacancy"
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      title="Delete Vacancy"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-[#232F3E] p-6 rounded-lg shadow-lg">
        <h1 className="text-lg font-semibold text-gray-100">Applications</h1>
        <p className="text-sm text-gray-400 mb-4">
          Review and manage applications submitted for job postings.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-xs uppercase text-gray-200 bg-[#2E3A47]">
              <tr>
                <th className="px-6 py-3">Application ID</th>
                <th className="px-6 py-3">Applicant</th>
                <th className="px-6 py-3">Position</th>
                <th className="px-6 py-3">Vacancy ID</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Applied Date</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, index) => (
                <tr
                  key={app.id}
                  className={`${
                    index % 2 === 0 ? "bg-[#2E3A47]" : "bg-[#3A4A57]"
                  } border-b border-gray-600`}
                >
                  <td className="px-6 py-4">{app.id}</td>
                  <td className="px-6 py-4">{app.applicant}</td>
                  <td className="px-6 py-4">{app.position}</td>
                  <td className="px-6 py-4">{app.vacancyId}</td>
                  <td className="px-6 py-4">{app.status}</td>
                  <td className="px-6 py-4">{app.appliedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentTable;
