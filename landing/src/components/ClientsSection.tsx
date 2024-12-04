"use client";

import React from "react";

const ClientsSection = () => {
  const clients = [
    { name: "Bridgestone", logo: "/img/clients/bridgestone.png" },
    { name: "Cargill", logo: "/img/clients/cargill.png" },
    { name: "Caja Costarricense de Seguro Social", logo: "/img/clients/ccss.png" },
    { name: "3M", logo: "/img/clients/3m.png" },
    { name: "Sigma", logo: "/img/clients/sigma.png" },
    { name: "Coca-Cola FEMSA", logo: "/img/clients/coca-cola.png" },
    { name: "Del Monte", logo: "/img/clients/del-monte.png" },
    { name: "Fructa Costa Rica", logo: "/img/clients/fructa.png" },
    { name: "Unilever", logo: "/img/clients/unilever.png" },
    { name: "FIFCO", logo: "/img/clients/fifco.png" },
    { name: "Cardinal Health", logo: "/img/clients/cardinal-health.png" },
  ];

  return (
    <section id="clients" className="py-12">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Clientes Satisfechos</h2>
        <p className="text-gray-400 max-w-3xl mx-auto mb-8">
          Algunas de las empresas líderes que confían en nosotros.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {clients.map((client, index) => (
            <div
              key={index}
              className="p-8 bg-[#394957] rounded-lg shadow-md flex items-center justify-center"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="w-32 h-auto object-contain"
                title={client.name}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
