"use client";

import React from "react";

const ServicesSection = () => {
  return (
    <section id="services" className="py-12 bg-[#2E3A47]">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-6">
          Nuestros Servicios
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#394957] rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Consultoría</h3>
            <p className="text-gray-400">
              Soluciones personalizadas para tus necesidades.
            </p>
          </div>
          <div className="p-6 bg-[#394957] rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">
              Desarrollo de Software
            </h3>
            <p className="text-gray-400">
              Aplicaciones innovadoras para maximizar tu productividad.
            </p>
          </div>
          <div className="p-6 bg-[#394957] rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Capacitación</h3>
            <p className="text-gray-400">
              Preparamos equipos para enfrentar retos tecnológicos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
