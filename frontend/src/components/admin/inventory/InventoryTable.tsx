"use client";

import React, { useState } from "react";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import InventoryModal from "./InventoryModal";

const InventoryTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const inventoryItems = [
    { id: "ITM-001", name: "Industrial Lubricant", category: "Consumables", quantity: 50, status: "In Stock", supplier: "Supplier A", lastUpdated: "2023-11-01" },
    { id: "ITM-002", name: "Hydraulic Pump", category: "Machinery", quantity: 10, status: "In Stock", supplier: "Supplier B", lastUpdated: "2023-11-05" },
    { id: "ITM-003", name: "Safety Helmets", category: "Safety Equipment", quantity: 100, status: "In Stock", supplier: "Supplier C", lastUpdated: "2023-11-07" },
    { id: "ITM-004", name: "Welding Rods", category: "Tools", quantity: 200, status: "In Stock", supplier: "Supplier D", lastUpdated: "2023-11-08" },
    { id: "ITM-005", name: "Conveyor Belts", category: "Machinery Parts", quantity: 15, status: "Low Stock", supplier: "Supplier E", lastUpdated: "2023-11-10" },
    { id: "ITM-006", name: "Grease Gun", category: "Tools", quantity: 25, status: "In Stock", supplier: "Supplier Z", lastUpdated: "2023-11-25" },
    { id: "ITM-007", name: "Air Compressor", category: "Machinery", quantity: 5, status: "Low Stock", supplier: "Supplier F", lastUpdated: "2023-11-12" },
    { id: "ITM-008", name: "Fire Extinguisher", category: "Safety Equipment", quantity: 30, status: "In Stock", supplier: "Supplier G", lastUpdated: "2023-11-13" },
    { id: "ITM-009", name: "Pressure Gauges", category: "Instrumentation", quantity: 40, status: "In Stock", supplier: "Supplier H", lastUpdated: "2023-11-14" },
    { id: "ITM-010", name: "Toolbox Kit", category: "Tools", quantity: 60, status: "In Stock", supplier: "Supplier I", lastUpdated: "2023-11-15" },
    { id: "ITM-011", name: "Protective Gloves", category: "Safety Equipment", quantity: 120, status: "In Stock", supplier: "Supplier J", lastUpdated: "2023-11-16" },
    { id: "ITM-012", name: "Pipe Wrench", category: "Tools", quantity: 35, status: "In Stock", supplier: "Supplier K", lastUpdated: "2023-11-17" },
    { id: "ITM-013", name: "Electric Drill", category: "Tools", quantity: 20, status: "Low Stock", supplier: "Supplier L", lastUpdated: "2023-11-18" },
    { id: "ITM-014", name: "Lifting Chains", category: "Machinery Parts", quantity: 8, status: "In Stock", supplier: "Supplier M", lastUpdated: "2023-11-19" },
    { id: "ITM-015", name: "Oxygen Cylinders", category: "Consumables", quantity: 50, status: "In Stock", supplier: "Supplier N", lastUpdated: "2023-11-20" },
    { id: "ITM-016", name: "LED Work Lights", category: "Lighting", quantity: 25, status: "In Stock", supplier: "Supplier O", lastUpdated: "2023-11-21" },
    { id: "ITM-017", name: "Rubber Mats", category: "Safety Equipment", quantity: 70, status: "In Stock", supplier: "Supplier P", lastUpdated: "2023-11-22" },
    { id: "ITM-018", name: "Steel Cables", category: "Machinery Parts", quantity: 30, status: "In Stock", supplier: "Supplier Q", lastUpdated: "2023-11-23" },
    { id: "ITM-019", name: "HVAC Filters", category: "Consumables", quantity: 40, status: "In Stock", supplier: "Supplier R", lastUpdated: "2023-11-24" },
    { id: "ITM-020", name: "Hard Hats", category: "Safety Equipment", quantity: 90, status: "In Stock", supplier: "Supplier S", lastUpdated: "2023-11-26" },
    { id: "ITM-021", name: "Torque Wrenches", category: "Tools", quantity: 15, status: "Low Stock", supplier: "Supplier T", lastUpdated: "2023-11-27" },
    { id: "ITM-022", name: "Steel Bolts", category: "Consumables", quantity: 300, status: "In Stock", supplier: "Supplier U", lastUpdated: "2023-11-28" },
    { id: "ITM-023", name: "Insulated Jackets", category: "Safety Equipment", quantity: 50, status: "In Stock", supplier: "Supplier V", lastUpdated: "2023-11-29" },
    { id: "ITM-024", name: "Spare Valves", category: "Machinery Parts", quantity: 12, status: "In Stock", supplier: "Supplier W", lastUpdated: "2023-11-30" },
    { id: "ITM-025", name: "Bearing Grease", category: "Consumables", quantity: 80, status: "In Stock", supplier: "Supplier X", lastUpdated: "2023-12-01" },
  ];  

  return (
    <div className="p-4 bg-[#232F3E] rounded-lg shadow-lg mt-20 md:mt-0">
      <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
        <div>
          <h1 className="text-lg font-semibold text-gray-100">Inventory</h1>
          <p className="text-sm text-gray-400">Manage and review industrial maintenance inventory items.</p>
        </div>
        <button
          className="flex items-center px-4 py-2 bg-blue-700 text-white font-medium text-sm rounded-lg hover:bg-blue-600"
          onClick={() => setIsModalOpen(true)}
        >
          <FaPlus className="mr-2" /> Add Item
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-300">
          <thead className="text-xs uppercase text-gray-200 bg-[#2E3A47]">
            <tr>
              <th className="px-6 py-3">Item ID</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Quantity</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Supplier</th>
              <th className="px-6 py-3">Last Updated</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventoryItems.map((item, index) => (
              <tr
                key={item.id}
                className={`${
                  index % 2 === 0 ? "bg-[#2E3A47]" : "bg-[#3A4A57]"
                } border-b border-gray-600`}
              >
                <td className="px-6 py-4 font-medium text-gray-100 whitespace-nowrap">{item.id}</td>
                <td className="px-6 py-4">{item.name}</td>
                <td className="px-6 py-4">{item.category}</td>
                <td className="px-6 py-4">{item.quantity}</td>
                <td className={`px-6 py-4 ${item.status === "Low Stock" ? "text-red-400" : "text-green-400"}`}>{item.status}</td>
                <td className="px-6 py-4">{item.supplier}</td>
                <td className="px-6 py-4">{item.lastUpdated}</td>
                <td className="px-6 py-4 text-center flex justify-center gap-4">
                  <button className="text-blue-500 hover:text-blue-700" title="Edit">
                    <FaEdit />
                  </button>
                  <button className="text-red-500 hover:text-red-700" title="Delete">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <InventoryModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default InventoryTable;