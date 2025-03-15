"use client";

import { useState } from "react";
import { Check, ChevronsUpDown, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const categories = [
  { value: "herramientas", label: "Herramientas" },
  { value: "lubricantes", label: "Lubricantes" },
  { value: "tornilleria", label: "Tornillería" },
  { value: "electricos", label: "Eléctricos" },
  { value: "seguridad", label: "Seguridad" },
  { value: "motores", label: "Motores" },
];

const statuses = [
  { value: "disponible", label: "Disponible" },
  { value: "stock-bajo", label: "Stock Bajo" },
  { value: "en-uso", label: "En Uso" },
  { value: "reparacion", label: "En Reparación" },
];

export function InventoryFilters() {
  const [openCategory, setOpenCategory] = useState(false);
  const [category, setCategory] = useState("");
  const [openStatus, setOpenStatus] = useState(false);
  const [status, setStatus] = useState("");

  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <div className="grid flex-1 gap-2">
        <Label htmlFor="search">Buscar</Label>
        <Input
          id="search"
          placeholder="Buscar por código o nombre..."
          className="h-10"
        />
      </div>
      <div className="grid gap-2">
        <Label>Categoría</Label>
        <Popover open={openCategory} onOpenChange={setOpenCategory}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openCategory}
              className="h-10 w-[200px] justify-between"
            >
              {category
                ? categories.find((c) => c.value === category)?.label
                : "Seleccionar categoría"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Buscar categoría..." />
              <CommandList>
                <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                <CommandGroup>
                  {categories.map((c) => (
                    <CommandItem
                      key={c.value}
                      value={c.value}
                      onSelect={(currentValue) => {
                        setCategory(
                          currentValue === category ? "" : currentValue
                        );
                        setOpenCategory(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          category === c.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {c.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div className="grid gap-2">
        <Label>Estado</Label>
        <Popover open={openStatus} onOpenChange={setOpenStatus}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openStatus}
              className="h-10 w-[200px] justify-between"
            >
              {status
                ? statuses.find((s) => s.value === status)?.label
                : "Seleccionar estado"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Buscar estado..." />
              <CommandList>
                <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                <CommandGroup>
                  {statuses.map((s) => (
                    <CommandItem
                      key={s.value}
                      value={s.value}
                      onSelect={(currentValue) => {
                        setStatus(currentValue === status ? "" : currentValue);
                        setOpenStatus(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          status === s.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {s.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div className="grid gap-2">
        <Label>Más filtros</Label>
        <Button variant="outline" className="h-10">
          <Filter className="mr-2 h-4 w-4" />
          Filtros avanzados
        </Button>
      </div>
    </div>
  );
}
