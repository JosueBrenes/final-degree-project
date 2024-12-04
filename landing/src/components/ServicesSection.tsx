"use client";

import React from "react";

const ServicesSection = () => {
  return (
    <section id="services" className="py-12 bg-[#2E3A47]">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-6">
          Nuestras Divisiones
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-[#394957] rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Limpieza Industrial</h3>
            <ul className="text-gray-400 list-disc pl-4 space-y-2">
              <li>Limpieza de edificaciones</li>
              <li>Plantas de manufactura</li>
              <li>Tanques de agua potable y contra incendio</li>
              <li>Manejo de residuos certificados</li>
            </ul>
          </div>
          <div className="p-6 bg-[#394957] rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Hidrocarburos</h3>
            <ul className="text-gray-400 list-disc pl-4 space-y-2">
              <li>Reparación de terreno</li>
              <li>Sistema de bombeo</li>
              <li>Automatización</li>
              <li>Fundaciones</li>
            </ul>
          </div>
          <div className="p-6 bg-[#394957] rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">
              Obra Civil Industrial
            </h3>
            <ul className="text-gray-400 list-disc pl-4 space-y-2">
              <li>Estructuras livianas</li>
              <li>Mampostería y epóxicos</li>
              <li>Diseño e instalación de canoas</li>
              <li>Fundaciones y nivelaciones</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
