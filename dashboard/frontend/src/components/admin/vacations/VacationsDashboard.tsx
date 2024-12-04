"use client";

import React from "react";

const VacationRequest = () => {
  return (
    <div className="p-6 bg-[#232F3E] text-gray-200 min-h-screen">
      <div className="bg-[#2E3A47] p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">
          Solicitar Vacaciones
        </h2>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="employee-name"
              className="block text-sm font-medium text-gray-400"
            >
              Nombre del Empleado
            </label>
            <input
              type="text"
              id="employee-name"
              className="block w-full px-4 py-2 mt-1 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ingrese su nombre completo"
            />
          </div>
          <div>
            <label
              htmlFor="start-date"
              className="block text-sm font-medium text-gray-400"
            >
              Fecha de Inicio
            </label>
            <input
              type="date"
              id="start-date"
              className="block w-full px-4 py-2 mt-1 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="end-date"
              className="block text-sm font-medium text-gray-400"
            >
              Fecha de Fin
            </label>
            <input
              type="date"
              id="end-date"
              className="block w-full px-4 py-2 mt-1 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="reason"
              className="block text-sm font-medium text-gray-400"
            >
              Motivo
            </label>
            <textarea
              id="reason"
              rows={4}
              className="block w-full px-4 py-2 mt-1 bg-gray-700 text-gray-200 border border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Escriba el motivo de la solicitud"
            ></textarea>
          </div>
          <button
            type="button"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium"
          >
            Enviar Solicitud
          </button>
        </form>
      </div>

      <div className="bg-[#2E3A47] p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-white">
          Estado de Solicitudes
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-200">
            <thead className="bg-gray-700 text-gray-400 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">ID Solicitud</th>
                <th className="px-6 py-3">Empleado</th>
                <th className="px-6 py-3">Fecha Inicio</th>
                <th className="px-6 py-3">Fecha Fin</th>
                <th className="px-6 py-3">Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-800 border-b border-gray-700">
                <td className="px-6 py-4">VAC-001</td>
                <td className="px-6 py-4">Carlos Pérez</td>
                <td className="px-6 py-4">2024-01-10</td>
                <td className="px-6 py-4">2024-01-20</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-yellow-300 text-gray-800 text-xs font-semibold rounded-lg">
                    Pendiente
                  </span>
                </td>
              </tr>
              <tr className="bg-gray-800 border-b border-gray-700">
                <td className="px-6 py-4">VAC-002</td>
                <td className="px-6 py-4">María López</td>
                <td className="px-6 py-4">2024-02-01</td>
                <td className="px-6 py-4">2024-02-10</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-green-500 text-gray-800 text-xs font-semibold rounded-lg">
                    Aprobado
                  </span>
                </td>
              </tr>
              <tr className="bg-gray-800">
                <td className="px-6 py-4">VAC-003</td>
                <td className="px-6 py-4">Jorge Castillo</td>
                <td className="px-6 py-4">2024-03-01</td>
                <td className="px-6 py-4">2024-03-10</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-red-500 text-gray-800 text-xs font-semibold rounded-lg">
                    Rechazado
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VacationRequest;
