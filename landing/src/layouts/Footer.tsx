"use client";

import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#2E3A47] py-6 text-center">
      <div className="container mx-auto px-6">
        <p className="text-gray-400 mb-4">
          &copy; 2024 Arce y Vargas. Todos los derechos reservados.
        </p>
        <div className="flex justify-center space-x-6">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-600 transition-colors"
          >
            <FaFacebook size={24} />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-pink-500 transition-colors"
          >
            <FaInstagram size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
