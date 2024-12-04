"use client";

import React from "react";
import { FaAward, FaUsers, FaCode } from "react-icons/fa";

const AboutSection = () => {
  return (
    <section id="about" className="py-12">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">¿Quiénes Somos?</h2>
        <p className="text-gray-400 max-w-3xl mx-auto mb-8">
          Llevamos más de 20 años en el mercado nacional, contando con la
          experiencia y el personal necesario para realizar labores específicas
          en el sector empresarial. Nos especializamos en el mantenimiento
          industrial, cumpliendo con todas las medidas de seguridad necesarias.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#2E3A47] rounded-lg shadow-lg hover:scale-105 transition-transform">
            <FaAward className="text-4xl text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Excelencia</h3>
            <p className="text-gray-400">
              Buscamos ser una solución de calidad para nuestros clientes con
              enfoque en mantenimiento industrial preventivo y correctivo.
            </p>
          </div>
          <div className="p-6 bg-[#2E3A47] rounded-lg shadow-lg hover:scale-105 transition-transform">
            <FaUsers className="text-4xl text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Equipo Profesional</h3>
            <p className="text-gray-400">
              Capacitados en salud y seguridad ocupacional, nuestro equipo está
              preparado para enfrentar desafíos.
            </p>
          </div>
          <div className="p-6 bg-[#2E3A47] rounded-lg shadow-lg hover:scale-105 transition-transform">
            <FaCode className="text-4xl text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Innovación</h3>
            <p className="text-gray-400">
              Nos adaptamos a las necesidades cambiantes del mercado para
              garantizar soluciones efectivas y actuales.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
