"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const StorageLocations = () => {
  const [locations, setLocations] = useState<string[]>([]);
  const [newLocation, setNewLocation] = useState("");

  const handleAddLocation = () => {
    if (!newLocation.trim()) return;
    setLocations([...locations, newLocation]);
    setNewLocation("");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Ubicaciones de Almacenamiento</h2>
      <div className="flex gap-2 mb-4">
        <Input 
          value={newLocation} 
          onChange={(e) => setNewLocation(e.target.value)} 
          placeholder="Nombre de la ubicación" 
        />
        <Button onClick={handleAddLocation}>Agregar</Button>
      </div>
      <ul>
        {locations.map((location, index) => (
          <li key={index} className="mb-2">{location}</li>
        ))}
      </ul>
    </div>
  );
};

export default StorageLocations;
