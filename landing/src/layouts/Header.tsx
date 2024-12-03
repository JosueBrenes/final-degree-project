"use client";

import React from "react";

const Header = () => {
  return (
    <header className="bg-[#2E3A47] py-6 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img
            src="/img/logo_2.png"
            alt="Arce y Vargas Logo"
            className="w-12 h-12 object-contain"
          />
          <h1 className="text-2xl font-bold text-white hidden md:block">
            Arce y Vargas
          </h1>
        </div>
        <nav className="space-x-6 hidden md:flex">
          <a
            href="#about"
            className="text-gray-300 hover:text-gray-100 transition-colors"
          >
            ¿Quiénes Somos?
          </a>
          <a
            href="#services"
            className="text-gray-300 hover:text-gray-100 transition-colors"
          >
            Servicios
          </a>
          <a
            href="#team"
            className="text-gray-300 hover:text-gray-100 transition-colors"
          >
            Equipo
          </a>
          <a
            href="#contact"
            className="text-gray-300 hover:text-gray-100 transition-colors"
          >
            Contacto
          </a>
        </nav>
        {/* Mobile Menu */}
        <div className="md:hidden relative">
          <button
            className="text-gray-300 focus:outline-none"
            aria-label="Open Menu"
            onClick={() =>
              document.getElementById("mobile-menu")?.classList.toggle("hidden")
            }
          >
            ☰
          </button>
          <div
            id="mobile-menu"
            className="absolute top-full right-0 mt-2 bg-[#2E3A47] rounded-lg shadow-lg hidden"
          >
            <ul className="flex flex-col p-4 space-y-2">
              <li>
                <a
                  href="#about"
                  className="block text-gray-300 hover:text-gray-100 transition-colors"
                >
                  ¿Quiénes Somos?
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="block text-gray-300 hover:text-gray-100 transition-colors"
                >
                  Servicios
                </a>
              </li>
              <li>
                <a
                  href="#team"
                  className="block text-gray-300 hover:text-gray-100 transition-colors"
                >
                  Equipo
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="block text-gray-300 hover:text-gray-100 transition-colors"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
