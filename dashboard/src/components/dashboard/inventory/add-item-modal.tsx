"use client";

import { useState } from "react";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { es } from "date-fns/locale";

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

const units = [
  { value: "unidad", label: "Unidad" },
  { value: "par", label: "Par" },
  { value: "litro", label: "Litro" },
  { value: "metro", label: "Metro" },
  { value: "kg", label: "Kilogramo" },
  { value: "caja", label: "Caja" },
];

const suppliers = [
  {
    value: "herramientas-industriales",
    label: "Herramientas Industriales S.A.",
  },
  { value: "lubricantes-tecnicos", label: "Lubricantes Técnicos" },
  { value: "ferreteria-industrial", label: "Ferretería Industrial" },
  { value: "suministros-electricos", label: "Suministros Eléctricos" },
  { value: "equipos-proteccion", label: "Equipos de Protección Industrial" },
  { value: "motores-equipos", label: "Motores y Equipos Industriales" },
];

export function AddItemModal() {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("disponible");
  const [unit, setUnit] = useState("");
  const [supplier, setSupplier] = useState("");
  const [expiryDate, setExpiryDate] = useState<Date | undefined>(undefined);
  const [openCategory, setOpenCategory] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [openUnit, setOpenUnit] = useState(false);
  const [openSupplier, setOpenSupplier] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar el nuevo artículo
    console.log("Nuevo artículo guardado");
    setOpen(false);
    // Resetear el formulario
    setCategory("");
    setStatus("disponible");
    setUnit("");
    setSupplier("");
    setExpiryDate(undefined);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Agregar Artículo</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Artículo</DialogTitle>
          <DialogDescription>
            Complete los detalles del nuevo artículo para agregarlo al
            inventario.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="id">Código</Label>
                <Input id="id" placeholder="Ej: HER-001" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" placeholder="Nombre del artículo" required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Categoría</Label>
                <Popover open={openCategory} onOpenChange={setOpenCategory}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openCategory}
                      className="justify-between"
                    >
                      {category
                        ? categories.find((c) => c.value === category)?.label
                        : "Seleccionar categoría"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Buscar categoría..." />
                      <CommandList>
                        <CommandEmpty>
                          No se encontraron resultados.
                        </CommandEmpty>
                        <CommandGroup>
                          {categories.map((c) => (
                            <CommandItem
                              key={c.value}
                              value={c.value}
                              onSelect={(currentValue) => {
                                setCategory(currentValue);
                                setOpenCategory(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  category === c.value
                                    ? "opacity-100"
                                    : "opacity-0"
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
                      className="justify-between"
                    >
                      {status
                        ? statuses.find((s) => s.value === status)?.label
                        : "Seleccionar estado"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Buscar estado..." />
                      <CommandList>
                        <CommandEmpty>
                          No se encontraron resultados.
                        </CommandEmpty>
                        <CommandGroup>
                          {statuses.map((s) => (
                            <CommandItem
                              key={s.value}
                              value={s.value}
                              onSelect={(currentValue) => {
                                setStatus(currentValue);
                                setOpenStatus(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  status === s.value
                                    ? "opacity-100"
                                    : "opacity-0"
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
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="stock">Stock Actual</Label>
                <Input id="stock" type="number" min="0" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="minStock">Stock Mínimo</Label>
                <Input id="minStock" type="number" min="0" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="maxStock">Stock Máximo</Label>
                <Input id="maxStock" type="number" min="0" required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Unidad de Medida</Label>
                <Popover open={openUnit} onOpenChange={setOpenUnit}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openUnit}
                      className="justify-between"
                    >
                      {unit
                        ? units.find((u) => u.value === unit)?.label
                        : "Seleccionar unidad"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Buscar unidad..." />
                      <CommandList>
                        <CommandEmpty>
                          No se encontraron resultados.
                        </CommandEmpty>
                        <CommandGroup>
                          {units.map((u) => (
                            <CommandItem
                              key={u.value}
                              value={u.value}
                              onSelect={(currentValue) => {
                                setUnit(currentValue);
                                setOpenUnit(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  unit === u.value ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {u.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Ubicación</Label>
                <Input id="location" placeholder="Ej: A-12-3" required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Proveedor</Label>
                <Popover open={openSupplier} onOpenChange={setOpenSupplier}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openSupplier}
                      className="justify-between"
                    >
                      {supplier
                        ? suppliers.find((s) => s.value === supplier)?.label
                        : "Seleccionar proveedor"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Buscar proveedor..." />
                      <CommandList>
                        <CommandEmpty>
                          No se encontraron resultados.
                        </CommandEmpty>
                        <CommandGroup>
                          {suppliers.map((s) => (
                            <CommandItem
                              key={s.value}
                              value={s.value}
                              onSelect={(currentValue) => {
                                setSupplier(currentValue);
                                setOpenSupplier(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  supplier === s.value
                                    ? "opacity-100"
                                    : "opacity-0"
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
                <Label>Fecha de Caducidad</Label>
                <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "justify-between text-left font-normal",
                        !expiryDate && "text-muted-foreground"
                      )}
                    >
                      {expiryDate
                        ? format(expiryDate, "PPP", { locale: es })
                        : "Seleccionar fecha"}
                      <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={expiryDate}
                      onSelect={(date) => {
                        setExpiryDate(date);
                        setOpenCalendar(false);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="notes">Notas</Label>
              <Textarea
                id="notes"
                placeholder="Información adicional sobre el artículo"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">Guardar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
