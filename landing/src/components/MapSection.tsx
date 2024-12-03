"use client";

import React from "react";

const MapSection = () => {
  return (
    <section id="location" className="py-12">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Nuestra Ubicación</h2>
        <p className="text-gray-400 max-w-3xl mx-auto mb-8">
          Encuéntranos en el corazón de San José, Costa Rica.
        </p>
        <div className="relative overflow-hidden rounded-lg shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2699.5675101208867!2d-84.03006338996701!3d9.964377004148252!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0e5c88c220711%3A0xda916197e9e9d719!2sArce%20y%20Vargas%20Mantenimiento%20Industria!5e0!3m2!1ses-419!2scr!4v1733268035285!5m2!1ses-419!2scr"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            className="rounded-lg"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
