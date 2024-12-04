"use client";

import Header from "@/layouts/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/layouts/Footer";
import ServicesSection from "@/components/ServicesSection";
import MapSection from "@/components/MapSection";
import ClientsSection from "@/components/ClientsSection"; 

const InformativePage = () => {
  return (
    <div className="bg-[#232F3E] text-gray-200 min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ClientsSection /> 
      <MapSection />
      <Footer />
    </div>
  );
};

export default InformativePage;
