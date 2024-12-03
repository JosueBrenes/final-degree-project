"use client";

import React from "react";
import { FaAward, FaUsers, FaCode } from "react-icons/fa";

const AboutSection = () => {
  return (
    <section id="about" className="py-12">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">¿Quiénes Somos?</h2>
        <p className="text-gray-400 max-w-3xl mx-auto mb-8">
          En Arce y Vargas, nos especializamos en soluciones tecnológicas de
          alto impacto. Nuestro compromiso es transformar ideas en realidades a
          través de la innovación.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#2E3A47] rounded-lg shadow-lg hover:scale-105 transition-transform">
            <FaAward className="text-4xl text-yellow-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Excelencia</h3>
            <p className="text-gray-400">
              Destacamos en calidad y soluciones innovadoras.
            </p>
          </div>
          <div className="p-6 bg-[#2E3A47] rounded-lg shadow-lg hover:scale-105 transition-transform">
            <FaUsers className="text-4xl text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Equipo Profesional</h3>
            <p className="text-gray-400">
              Expertos calificados en diversas áreas.
            </p>
          </div>
          <div className="p-6 bg-[#2E3A47] rounded-lg shadow-lg hover:scale-105 transition-transform">
            <FaCode className="text-4xl text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Innovación</h3>
            <p className="text-gray-400">
              Siempre a la vanguardia tecnológica.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
