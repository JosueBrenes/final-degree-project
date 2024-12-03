"use client";

import React from "react";

const HeroSection = () => {
  return (
    <section
      className="relative h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative text-center text-white px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Bienvenidos a Arce y Vargas
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
          Innovación, excelencia y tecnología al servicio de tus necesidades.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
