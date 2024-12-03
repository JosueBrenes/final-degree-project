"use client";

import React, { useState } from "react";
import {
  FaBars,
  FaHome,
  FaUsers,
  FaFileInvoice,
  FaUserTie,
  FaWarehouse,
  FaClipboardList,
  FaMoneyCheckAlt,
  FaChartLine,
  FaCalendarCheck,
  FaSmile,
} from "react-icons/fa";

const Sidebar: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <header className="sm:hidden fixed top-0 left-0 z-50 w-full bg-[#232F3E] ">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={toggleSidebar}
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-300 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <FaBars className="w-6 h-6" />
            <span className="sr-only">Open sidebar</span>
          </button>
          <img src="/img/logo_2.png" alt="Logo" className="h-14 w-auto" />
        </div>
      </header>

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-full overflow-y-auto transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 bg-[#232F3E]`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4">
          <a href="/admin" className="flex items-center ps-2.5 mb-5">
            <img
              src="/img/logo_2.png"
              className="h-14 me-3 sm:h-14"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
              Arce & Vargas
            </span>
          </a>
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="/admin"
                className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700"
              >
                <FaHome className="w-5 h-5" />
                <span className="ms-3">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="/admin/quotes"
                className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700"
              >
                <FaFileInvoice className="w-5 h-5" />
                <span className="ms-3">Quotes</span>
              </a>
            </li>
            <li>
              <a
                href="/admin/recruitment"
                className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700"
              >
                <FaUserTie className="w-5 h-5" />
                <span className="ms-3">Recruitment</span>
              </a>
            </li>
            <li>
              <a
                href="/admin/inventory"
                className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700"
              >
                <FaWarehouse className="w-5 h-5" />
                <span className="ms-3">Inventory</span>
              </a>
            </li>
            <li>
              <a
                href="/admin/employees"
                className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700"
              >
                <FaUsers className="w-5 h-5" />
                <span className="ms-3">Employees</span>
              </a>
            </li>
            <li>
              <a
                href="/admin/accounting"
                className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700"
              >
                <FaMoneyCheckAlt className="w-5 h-5" />
                <span className="ms-3">Accounting</span>
              </a>
            </li>
            <li>
              <a
                href="/admin/logs"
                className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700"
              >
                <FaClipboardList className="w-5 h-5" />
                <span className="ms-3">Logs</span>
              </a>
            </li>
            <li>
              <a
                href="/admin/reports"
                className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700"
              >
                <FaChartLine className="w-5 h-5" />
                <span className="ms-3">Reports</span>
              </a>
            </li>
            <li>
              <a
                href="/admin/payroll"
                className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700"
              >
                <FaFileInvoice className="w-5 h-5" />
                <span className="ms-3">Payroll</span>
              </a>
            </li>
            <li>
              <a
                href="/admin/satisfaction"
                className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700"
              >
                <FaSmile className="w-5 h-5" />
                <span className="ms-3">Satisfaction</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
