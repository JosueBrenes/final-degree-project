"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  ChevronRight,
  ChevronDown,
  AlertTriangle,
  ArrowUpCircle,
  ArrowDownCircle,
  Search,
  QrCode,
  FileText,
  Clock,
  Users,
  Truck,
  MapPin,
  Filter,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import InventoryModal from "./InventoryModal";
import ProductDetailsModal from "./ProductDetailsModal";
import HistoryModal from "./HistoryModal";
import ConfigureAlertModal from "./ConfigureAlertModal";
import LowStockReportModal from "./LowStockReportModal";
import InventoryMovementModal from "./InventoryMovementModal";
import InventoryRotationReport from "./InventoryRotationReport";
import CategoryModal from "./CategoryModal";
import EditProductModal from "./EditProductModal";
import AssignToolModal from "./AssignToolModal";
import QrScannerModal from "./QrScannerModal";
import AuditHistoryModal from "./AuditHistoryModal";
import ReportGeneratorModal from "./ReportGeneratorModal";

// Datos del inventario mejorados con las características solicitadas
const inventoryItems = [
  {
    id: "HER-001",
    sku: "HER-LUB-001",
    name: "Aceite Lubricante Industrial",
    description: "Aceite sintético de alta resistencia para maquinaria pesada",
    category: "Lubricantes",
    quantity: 50,
    unit: "Litros",
    status: "Disponible",
    location: "Estante A-12",
    supplier: "Lubricantes Industriales S.A.",
    supplierContact: "supplier@example.com",
    lastUpdated: "2023-11-01",
    minStockLevel: 30,
    maxStockLevel: 100,
    expiryDate: "2025-06-30",
    price: 250.75,
    usageHistory: [
      {
        date: "2024-02-15",
        machine: "Torno CNC #123",
        employee: "Carlos Méndez",
        quantity: 2,
      },
      {
        date: "2024-01-20",
        machine: "Prensa Hidráulica #45",
        employee: "María Gómez",
        quantity: 1.5,
      },
    ],
    assignments: [],
    movements: [
      {
        date: "2024-01-10",
        type: "in",
        quantity: 20,
        employee: "Juan Pérez",
        note: "Reposición de inventario",
      },
      {
        date: "2024-01-15",
        type: "out",
        quantity: 10,
        employee: "Ana Rodríguez",
        note: "Mantenimiento programado",
      },
    ],
    qrCode:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
  },
  {
    id: "MAQ-001",
    sku: "MAQ-BOM-001",
    name: "Bomba Hidráulica Industrial",
    description: "Bomba de presión para sistemas hidráulicos industriales",
    category: "Maquinaria",
    quantity: 10,
    unit: "Unidades",
    status: "Stock Bajo",
    location: "Zona B-04",
    supplier: "Hidráulica Global S.A.",
    supplierContact: "ventas@hidraulicaglobal.com",
    lastUpdated: "2023-11-05",
    minStockLevel: 15,
    maxStockLevel: 30,
    expiryDate: null,
    price: 1850.0,
    usageHistory: [
      {
        date: "2024-01-10",
        machine: "Línea de Producción #2",
        employee: "Roberto Sánchez",
        quantity: 1,
      },
    ],
    assignments: [],
    movements: [
      {
        date: "2024-01-10",
        type: "in",
        quantity: 20,
        employee: "Juan Pérez",
        note: "Compra programada",
      },
      {
        date: "2024-01-15",
        type: "out",
        quantity: 10,
        employee: "Roberto Sánchez",
        note: "Reemplazo en línea #2",
      },
    ],
    qrCode:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
  },
  {
    id: "SEG-001",
    sku: "SEG-CAS-001",
    name: "Casco de Seguridad",
    description:
      "Casco de protección industrial certificado con ajuste universal",
    category: "Equipos de Seguridad",
    quantity: 100,
    unit: "Unidades",
    status: "Disponible",
    location: "Estante C-23",
    supplier: "Seguridad Industrial Integral",
    supplierContact: "contacto@seguridadintegral.com",
    lastUpdated: "2023-11-07",
    minStockLevel: 50,
    maxStockLevel: 150,
    expiryDate: "2026-12-31",
    price: 45.5,
    usageHistory: [],
    assignments: [
      {
        date: "2024-02-01",
        employee: "Luis Torres",
        returnDate: "2024-02-01",
        status: "Devuelto",
      },
      {
        date: "2024-02-15",
        employee: "Carmen Díaz",
        returnDate: null,
        status: "Asignado",
      },
    ],
    movements: [
      {
        date: "2024-01-10",
        type: "in",
        quantity: 20,
        employee: "Juan Pérez",
        note: "Compra trimestral",
      },
      {
        date: "2024-01-15",
        type: "out",
        quantity: 10,
        employee: "María López",
        note: "Asignación a personal nuevo",
      },
    ],
    qrCode:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
  },
  {
    id: "HER-002",
    sku: "HER-SOL-001",
    name: "Varillas de Soldadura",
    description: "Varillas para soldadura de acero inoxidable 3.2mm",
    category: "Herramientas",
    quantity: 5,
    unit: "Paquetes",
    status: "Stock Bajo",
    location: "Estante D-07",
    supplier: "Soldaduras Técnicas S.A.",
    supplierContact: "info@soldadurastecnicas.com",
    lastUpdated: "2023-11-08",
    minStockLevel: 20,
    maxStockLevel: 50,
    expiryDate: "2025-11-30",
    price: 120.25,
    usageHistory: [
      {
        date: "2024-02-10",
        machine: "Estructura metálica sector 5",
        employee: "José Ramírez",
        quantity: 2,
      },
    ],
    assignments: [],
    movements: [
      {
        date: "2024-01-10",
        type: "in",
        quantity: 20,
        employee: "Juan Pérez",
        note: "Compra programada",
      },
      {
        date: "2024-01-15",
        type: "out",
        quantity: 15,
        employee: "José Ramírez",
        note: "Proyecto sector 5",
      },
    ],
    qrCode:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
  },
  {
    id: "REP-001",
    sku: "REP-CIN-001",
    name: "Cinta Transportadora",
    description: "Cinta transportadora reforzada de 50cm ancho",
    category: "Repuestos",
    quantity: 15,
    unit: "Metros",
    status: "Stock Bajo",
    location: "Almacén E-15",
    supplier: "Cintas y Transportes S.A.",
    supplierContact: "ventas@cintastransporte.com",
    lastUpdated: "2023-11-10",
    minStockLevel: 25,
    maxStockLevel: 60,
    expiryDate: "2026-05-15",
    price: 85.0,
    usageHistory: [
      {
        date: "2024-01-25",
        machine: "Línea de Ensamblaje #3",
        employee: "Andrés Castro",
        quantity: 5,
      },
    ],
    assignments: [],
    movements: [
      {
        date: "2024-01-10",
        type: "in",
        quantity: 20,
        employee: "Juan Pérez",
        note: "Compra mensual",
      },
      {
        date: "2024-01-25",
        type: "out",
        quantity: 5,
        employee: "Andrés Castro",
        note: "Reparación línea #3",
      },
    ],
    qrCode:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
  },
];

interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  description: string;
  category: string;
  quantity: number;
  unit: string;
  status: string;
  location: string;
  supplier: string;
  supplierContact: string;
  lastUpdated: string;
  minStockLevel: number;
  maxStockLevel: number;
  expiryDate: string | null;
  price: number;
  usageHistory: {
    date: string;
    machine: string;
    employee: string;
    quantity: number;
  }[];
  assignments: {
    date: string;
    employee: string;
    returnDate: string | null;
    status: string;
  }[];
  movements: {
    date: string;
    type: "in" | "out";
    quantity: number;
    employee: string;
    note: string;
  }[];
  qrCode: string;
}

interface ExpandedCategories {
  [key: string]: boolean;
}

interface GroupedInventory {
  [key: string]: InventoryItem[];
}

export default function InventoryTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<InventoryItem | null>(
    null
  );
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [isProductDetailsModalOpen, setIsProductDetailsModalOpen] =
    useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isConfigureAlertModalOpen, setIsConfigureAlertModalOpen] =
    useState(false);
  const [isLowStockReportModalOpen, setIsLowStockReportModalOpen] =
    useState(false);
  const [expandedCategories, setExpandedCategories] =
    useState<ExpandedCategories>({});
  const [inventory, setInventory] = useState<InventoryItem[]>(inventoryItems);
  const [isInventoryMovementModalOpen, setIsInventoryMovementModalOpen] =
    useState(false);
  const [movementType, setMovementType] = useState<string | null>(null);
  const [isRotationReportOpen, setIsRotationReportOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>([
    "Lubricantes",
    "Maquinaria",
    "Equipos de Seguridad",
    "Herramientas",
    "Repuestos",
    "Tornillería",
    "Motores",
    "Químicos",
    "Eléctricos",
  ]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAssignToolModalOpen, setIsAssignToolModalOpen] = useState(false);
  const [isQrScannerModalOpen, setIsQrScannerModalOpen] = useState(false);
  const [isAuditHistoryModalOpen, setIsAuditHistoryModalOpen] = useState(false);
  const [isReportGeneratorModalOpen, setIsReportGeneratorModalOpen] =
    useState(false);
  const [activeView, setActiveView] = useState("tabla");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [expiryFilter, setExpiryFilter] = useState("Todos");
  const [locationFilter, setLocationFilter] = useState("Todos");
  const [supplierFilter, setSupplierFilter] = useState("Todos");

  const { toast } = useToast();

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // Filtrar inventario basado en múltiples criterios
  const filteredInventory = inventory.filter((item) => {
    // Filtro de búsqueda en múltiples campos
    const searchMatch =
      searchTerm === "" ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase());

    // Filtro de categoría
    const categoryMatch =
      selectedCategory === "Todos" || item.category === selectedCategory;

    // Filtro de estado
    const statusMatch =
      statusFilter === "Todos" || item.status === statusFilter;

    // Filtro de caducidad
    const today = new Date();
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(today.getMonth() + 3);

    let expiryMatch = true;
    if (expiryFilter === "Próximos a caducar" && item.expiryDate) {
      const expiryDate = new Date(item.expiryDate);
      expiryMatch = expiryDate <= threeMonthsFromNow && expiryDate >= today;
    } else if (expiryFilter === "Caducados" && item.expiryDate) {
      const expiryDate = new Date(item.expiryDate);
      expiryMatch = expiryDate < today;
    } else if (expiryFilter === "Sin caducidad") {
      expiryMatch = item.expiryDate === null;
    }

    // Filtro de ubicación
    const locationMatch =
      locationFilter === "Todos" || item.location === locationFilter;

    // Filtro de proveedor
    const supplierMatch =
      supplierFilter === "Todos" || item.supplier === supplierFilter;

    return (
      searchMatch &&
      categoryMatch &&
      statusMatch &&
      expiryMatch &&
      locationMatch &&
      supplierMatch
    );
  });

  // Agrupar por categoría para la vista de tabla
  const groupedInventory: GroupedInventory = filteredInventory.reduce(
    (acc: GroupedInventory, item: InventoryItem) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {}
  );

  // Obtener listas únicas para filtros
  const locations = [
    "Todos",
    ...new Set(inventory.map((item) => item.location)),
  ];
  const suppliers = [
    "Todos",
    ...new Set(inventory.map((item) => item.supplier)),
  ];
  const statuses = [
    "Todos",
    "Disponible",
    "Stock Bajo",
    "En Uso",
    "Dañado",
    "En Reparación",
  ];

  const handleProductClick = (product: InventoryItem) => {
    setSelectedProduct(product);
    setIsProductDetailsModalOpen(true);
  };

  const handleHistoryClick = (product: InventoryItem) => {
    setSelectedProduct(product);
    setIsHistoryModalOpen(true);
  };

  const handleConfigureAlert = (product: InventoryItem) => {
    setSelectedProduct(product);
    setIsConfigureAlertModalOpen(true);
  };

  const updateMinStockLevel = (
    productId: string,
    newMinStockLevel: number,
    newMaxStockLevel: number
  ) => {
    setInventory((prevInventory) =>
      prevInventory.map((item) =>
        item.id === productId
          ? {
              ...item,
              minStockLevel: newMinStockLevel,
              maxStockLevel: newMaxStockLevel,
            }
          : item
      )
    );

    // Registrar esta acción en el historial de auditoría
    logAuditAction(
      productId,
      "Actualización de niveles de stock",
      `Min: ${newMinStockLevel}, Max: ${newMaxStockLevel}`
    );
  };

  const handleInventoryMovement = (product: InventoryItem, type: string) => {
    setSelectedProduct(product);
    setMovementType(type);
    setIsInventoryMovementModalOpen(true);
  };

  // Actualizar inventario con más información de auditoría
  const updateInventory = (
    productId: string,
    quantity: number,
    type: string,
    employee: string,
    note: string
  ) => {
    const currentDate = new Date().toISOString().split("T")[0];

    setInventory((prevInventory) =>
      prevInventory.map((item) => {
        if (item.id === productId) {
          const newQuantity =
            type === "in" ? item.quantity + quantity : item.quantity - quantity;

          // Crear nuevo movimiento
          const newMovement = {
            date: currentDate,
            type: type as "in" | "out",
            quantity,
            employee,
            note,
          };

          return {
            ...item,
            quantity: newQuantity,
            status:
              newQuantity < item.minStockLevel ? "Stock Bajo" : "Disponible",
            lastUpdated: currentDate,
            movements: [...item.movements, newMovement],
          };
        }
        return item;
      })
    );

    // Registrar en historial de auditoría
    logAuditAction(
      productId,
      type === "in" ? "Entrada de Inventario" : "Salida de Inventario",
      `Cantidad: ${quantity}, Empleado: ${employee}, Nota: ${note}`
    );
  };

  // Registrar uso de un ítem en un equipo/máquina
  const logItemUsage = (
    productId: string,
    machine: string,
    employee: string,
    quantity: number
  ) => {
    const currentDate = new Date().toISOString().split("T")[0];

    setInventory((prevInventory) =>
      prevInventory.map((item) => {
        if (item.id === productId) {
          // Registrar el uso en el historial
          const newUsage = {
            date: currentDate,
            machine,
            employee,
            quantity,
          };

          // Actualizar la cantidad
          const newQuantity = item.quantity - quantity;

          return {
            ...item,
            quantity: newQuantity,
            status:
              newQuantity < item.minStockLevel ? "Stock Bajo" : "Disponible",
            lastUpdated: currentDate,
            usageHistory: [...item.usageHistory, newUsage],
            movements: [
              ...item.movements,
              {
                date: currentDate,
                type: "out",
                quantity,
                employee,
                note: `Usado en: ${machine}`,
              },
            ],
          };
        }
        return item;
      })
    );

    // Registrar en historial de auditoría
    logAuditAction(
      productId,
      "Uso de Ítem",
      `Máquina: ${machine}, Empleado: ${employee}, Cantidad: ${quantity}`
    );
  };

  // Asignar herramienta a un empleado
  const assignToolToEmployee = (
    productId: string,
    employee: string,
    expectedReturnDate: string | null
  ) => {
    const currentDate = new Date().toISOString().split("T")[0];

    setInventory((prevInventory) =>
      prevInventory.map((item) => {
        if (item.id === productId) {
          // Crear nueva asignación
          const newAssignment = {
            date: currentDate,
            employee,
            returnDate: null,
            status: "Asignado",
          };

          // Actualizar estado
          return {
            ...item,
            status: "En Uso",
            lastUpdated: currentDate,
            assignments: [...item.assignments, newAssignment],
          };
        }
        return item;
      })
    );

    // Registrar en historial de auditoría
    logAuditAction(
      productId,
      "Asignación de Herramienta",
      `Empleado: ${employee}, Fecha esperada de devolución: ${
        expectedReturnDate || "No especificada"
      }`
    );

    toast({
      title: "Herramienta Asignada",
      description: `La herramienta ha sido asignada a ${employee}.`,
    });
  };

  // Recibir devolución de herramienta
  const returnToolFromEmployee = (
    productId: string,
    assignmentIndex: number,
    condition: string
  ) => {
    const currentDate = new Date().toISOString().split("T")[0];

    setInventory((prevInventory) =>
      prevInventory.map((item) => {
        if (item.id === productId) {
          const updatedAssignments = [...item.assignments];

          if (updatedAssignments[assignmentIndex]) {
            updatedAssignments[assignmentIndex] = {
              ...updatedAssignments[assignmentIndex],
              returnDate: currentDate,
              status: "Devuelto",
            };
          }

          // Actualizar estado según la condición reportada
          let newStatus = "Disponible";
          if (condition === "Dañado") newStatus = "Dañado";
          else if (condition === "Requiere mantenimiento")
            newStatus = "En Reparación";

          return {
            ...item,
            status: newStatus,
            lastUpdated: currentDate,
            assignments: updatedAssignments,
          };
        }
        return item;
      })
    );

    // Registrar en historial de auditoría
    logAuditAction(
      productId,
      "Devolución de Herramienta",
      `Fecha de devolución: ${currentDate}, Condición: ${condition}`
    );

    toast({
      title: "Herramienta Devuelta",
      description: `La herramienta ha sido registrada como devuelta.`,
    });
  };

  // Lista de acciones de auditoría (se guardaría en base de datos real)
  const [auditHistory, setAuditHistory] = useState<
    {
      timestamp: string;
      productId: string;
      action: string;
      details: string;
      user: string;
    }[]
  >([]);

  // Registrar acción en el historial de auditoría
  const logAuditAction = (
    productId: string,
    action: string,
    details: string
  ) => {
    const timestamp = new Date().toISOString();
    const user = "Usuario Actual"; // En sistema real vendría del contexto de autenticación

    setAuditHistory((prev) => [
      ...prev,
      {
        timestamp,
        productId,
        action,
        details,
        user,
      },
    ]);
  };

  // Generar informes
  const generateReport = (
    reportType: string,
    dateRange: { start: string; end: string }
  ) => {
    // En un sistema real, esto conectaría con backend para generar informes completos
    toast({
      title: "Generando Informe",
      description: `El informe de ${reportType} se está procesando.`,
    });

    // Simulación de generación de informe
    setTimeout(() => {
      toast({
        title: "Informe Generado",
        description: `El informe de ${reportType} está listo para descargar.`,
      });
    }, 2000);
  };

  useEffect(() => {
    // Comprobar artículos con bajo stock y enviar alertas
    inventory.forEach((item) => {
      if (item.quantity < item.minStockLevel) {
        toast({
          title: "Alerta de Stock Bajo",
          description: `${item.name} está por debajo del nivel mínimo de stock (${item.quantity} < ${item.minStockLevel}).`,
          variant: "destructive",
        });
      }

      // Comprobar artículos próximos a caducar (si tienen fecha de caducidad)
      if (item.expiryDate) {
        const today = new Date();
        const expiryDate = new Date(item.expiryDate);
        const monthsDiff =
          (expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 30);

        if (monthsDiff <= 3 && monthsDiff > 0) {
          toast({
            title: "Alerta de Caducidad",
            description: `${item.name} caducará en menos de 3 meses (${item.expiryDate}).`,
            variant: "warning",
          });
        }
      }

      // Generar órdenes de reposición automáticas
      if (item.quantity <= item.minStockLevel * 0.5) {
        const orderQuantity = item.maxStockLevel - item.quantity;
        logAuditAction(
          item.id,
          "Orden de Reposición Automática",
          `Cantidad a ordenar: ${orderQuantity} ${item.unit}, Proveedor: ${item.supplier}`
        );
      }
    });
  }, [inventory, toast]);

  const addCategory = (categoryName: string, description: string) => {
    setCategories((prevCategories) => [...prevCategories, categoryName]);
    toast({
      title: "Categoría Añadida",
      description: `Nueva categoría "${categoryName}" ha sido añadida.`,
    });

    // Registrar en historial de auditoría
    logAuditAction(
      "SISTEMA",
      "Creación de Categoría",
      `Categoría: ${categoryName}, Descripción: ${description}`
    );
  };

  const assignProductToCategory = (productId: string, newCategory: string) => {
    setInventory((prevInventory) =>
      prevInventory.map((item) =>
        item.id === productId ? { ...item, category: newCategory } : item
      )
    );
    toast({
      title: "Producto Categorizado",
      description: `Producto asignado a la categoría "${newCategory}".`,
    });

    // Registrar en historial de auditoría
    logAuditAction(
      productId,
      "Cambio de Categoría",
      `Nueva categoría: ${newCategory}`
    );
  };

  const handleEditClick = (product: InventoryItem) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleEditProduct = (editedProduct: InventoryItem) => {
    setInventory((prevInventory) =>
      prevInventory.map((item) =>
        item.id === editedProduct.id ? editedProduct : item
      )
    );
    setIsEditModalOpen(false);
    toast({
      title: "Producto Actualizado",
      description: `${editedProduct.name} ha sido actualizado exitosamente.`,
    });

    // Registrar en historial de auditoría
    logAuditAction(
      editedProduct.id,
      "Edición de Producto",
      `Se actualizaron datos del producto: ${editedProduct.name}`
    );
  };

  const handleDeleteProduct = (productId: string) => {
    setInventory((prevInventory) =>
      prevInventory.filter((item) => item.id !== productId)
    );

    toast({
      title: "Producto Eliminado",
      description: "El producto ha sido eliminado del inventario.",
    });

    // Registrar en historial de auditoría
    logAuditAction(
      productId,
      "Eliminación de Producto",
      "Producto eliminado del inventario"
    );
  };

  const handleAssignToolClick = (product: InventoryItem) => {
    setSelectedProduct(product);
    setIsAssignToolModalOpen(true);
  };

  const handleScanQrCode = () => {
    setIsQrScannerModalOpen(true);
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Sistema de Inventario de Mantenimiento Industrial</CardTitle>
        <CardDescription>
          Gestione y supervise el inventario de mantenimiento industrial con
          control total.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          {/* Barra de herramientas principal */}
          <div className="flex flex-wrap justify-between gap-2 mb-4">
            <div className="flex flex-wrap gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por código, nombre..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <Button variant="outline" onClick={handleScanQrCode}>
                <QrCode className="mr-2 h-4 w-4" />
                Escanear Código QR
              </Button>

              <Button
                variant="outline"
                onClick={() => setIsAuditHistoryModalOpen(true)}
              >
                <FileText className="mr-2 h-4 w-4" />
                Historial de Auditoría
              </Button>

              <Button
                variant="outline"
                onClick={() => setIsReportGeneratorModalOpen(true)}
              >
                <FileText className="mr-2 h-4 w-4" />
                Generar Reportes
              </Button>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setIsRotationReportOpen(true)}
              >
                <Clock className="mr-2 h-4 w-4" />
                Rotación de Inventario
              </Button>

              <Button onClick={() => setIsModalOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Añadir Ítem
              </Button>
            </div>
          </div>

          {/* Pestañas de visualización */}
          <Tabs
            value={activeView}
            onValueChange={setActiveView}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="tabla">Vista de Tabla</TabsTrigger>
              <TabsTrigger value="filtros">Filtros Avanzados</TabsTrigger>
            </TabsList>

            {/* Sección de filtros avanzados */}
            <TabsContent value="filtros" className="border rounded-md p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Categoría</h3>
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Todos">
                        Todas las Categorías
                      </SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Estado</h3>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar estado" />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Caducidad</h3>
                  <Select value={expiryFilter} onValueChange={setExpiryFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filtrar por caducidad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Todos">Todos</SelectItem>
                      <SelectItem value="Próximos a caducar">
                        Próximos a caducar
                      </SelectItem>
                      <SelectItem value="Caducados">Caducados</SelectItem>
                      <SelectItem value="Sin caducidad">
                        Sin caducidad
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Ubicación</h3>
                  <Select
                    value={locationFilter}
                    onValueChange={setLocationFilter}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar ubicación" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Proveedor</h3>
                  <Select
                    value={supplierFilter}
                    onValueChange={setSupplierFilter}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar proveedor" />
                    </SelectTrigger>
                    <SelectContent>
                      {suppliers.map((supplier) => (
                        <SelectItem key={supplier} value={supplier}>
                          {supplier}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("Todos");
                      setStatusFilter("Todos");
                      setExpiryFilter("Todos");
                      setLocationFilter("Todos");
                      setSupplierFilter("Todos");
                    }}
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    Limpiar Filtros
                  </Button>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm text-muted-foreground">
                  {filteredInventory.length} resultados encontrados
                </p>
              </div>
            </TabsContent>

            {/* Vista de tabla principal */}
            <TabsContent value="tabla" className="p-0">
              <div className="flex justify-between mb-4">
                <div className="flex gap-2">
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Seleccionar categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Todos">
                        Todas las Categorías
                      </SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    onClick={() => setIsLowStockReportModalOpen(true)}
                  >
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Reporte de Stock Bajo
                  </Button>
                  <Button onClick={() => setIsCategoryModalOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" /> Añadir Categoría
                  </Button>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>SKU</TableHead>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Categoría</TableHead>
                      <TableHead>Cantidad</TableHead>
                      <TableHead>Unidad</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead>Ubicación</TableHead>
                      <TableHead>Proveedor</TableHead>
                      <TableHead>Últ. Actualización</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(selectedCategory === "Todos"
                      ? Object.entries(groupedInventory)
                      : [
                          [
                            selectedCategory,
                            groupedInventory[selectedCategory] || [],
                          ],
                        ]
                    ).map(([category, items]) => (
                      <React.Fragment key={category}>
                        {selectedCategory === "Todos" && (
                          <TableRow className="bg-muted/50">
                            <TableCell colSpan={10}>
                              <Button
                                variant="ghost"
                                onClick={() => toggleCategory(category)}
                              >
                                {expandedCategories[category] ? (
                                  <ChevronDown className="h-4 w-4 mr-2" />
                                ) : (
                                  <ChevronRight className="h-4 w-4 mr-2" />
                                )}
                                {category}
                              </Button>
                            </TableCell>
                          </TableRow>
                        )}
                        {(selectedCategory === "Todos"
                          ? expandedCategories[category]
                          : true) &&
                          (items as InventoryItem[]).map((item) => (
                            <TableRow
                              key={item.id}
                              className="cursor-pointer hover:bg-muted/30"
                              onClick={() => handleProductClick(item)}
                            >
                              <TableCell className="font-medium">
                                {item.sku}
                              </TableCell>
                              <TableCell>{item.name}</TableCell>
                              <TableCell>{item.category}</TableCell>
                              <TableCell>{item.quantity}</TableCell>
                              <TableCell>{item.unit}</TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    item.status === "Stock Bajo" ||
                                    item.status === "Dañado"
                                      ? "destructive"
                                      : item.status === "En Uso" ||
                                        item.status === "En Reparación"
                                      ? "secondary"
                                      : "default"
                                  }
                                >
                                  {item.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {item.location}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center">
                                  <Truck className="h-3 w-3 mr-1" />
                                  {item.supplier}
                                </div>
                              </TableCell>
                              <TableCell>{item.lastUpdated}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end space-x-1">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleHistoryClick(item);
                                    }}
                                    title="Ver historial"
                                  >
                                    <Clock className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleConfigureAlert(item);
                                    }}
                                    title="Configurar alertas"
                                  >
                                    <AlertTriangle className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleEditClick(item);
                                    }}
                                    title="Editar"
                                  >
                                    <Pencil className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteProduct(item.id);
                                    }}
                                    title="Eliminar"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleInventoryMovement(item, "in");
                                    }}
                                    title="Registrar entrada"
                                  >
                                    <ArrowUpCircle className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleInventoryMovement(item, "out");
                                    }}
                                    title="Registrar salida"
                                  >
                                    <ArrowDownCircle className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleAssignToolClick(item);
                                    }}
                                    title="Asignar a empleado"
                                  >
                                    <Users className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                      </React.Fragment>
                    ))}
                    {filteredInventory.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={10} className="h-24 text-center">
                          No se encontraron resultados.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>

      {/* Modales del sistema */}
      <InventoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        categories={categories}
        suppliers={suppliers}
        locations={locations}
        onAddItem={(newItem) => {
          setInventory([...inventory, newItem]);
          logAuditAction(
            "SISTEMA",
            "Nuevo Ítem Agregado",
            `SKU: ${newItem.sku}, Nombre: ${newItem.name}`
          );
        }}
      />
      <ProductDetailsModal
        isOpen={isProductDetailsModalOpen}
        onClose={() => setIsProductDetailsModalOpen(false)}
        product={selectedProduct}
        categories={categories}
        onAssignCategory={assignProductToCategory}
      />
      <HistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        product={selectedProduct}
      />
      <ConfigureAlertModal
        isOpen={isConfigureAlertModalOpen}
        onClose={() => setIsConfigureAlertModalOpen(false)}
        product={selectedProduct}
        onUpdateMinStockLevel={updateMinStockLevel}
      />
      <LowStockReportModal
        isOpen={isLowStockReportModalOpen}
        onClose={() => setIsLowStockReportModalOpen(false)}
        inventory={inventory}
      />
      <InventoryMovementModal
        isOpen={isInventoryMovementModalOpen}
        onClose={() => setIsInventoryMovementModalOpen(false)}
        product={selectedProduct}
        type={movementType}
        onUpdateInventory={updateInventory}
      />
      <InventoryRotationReport
        isOpen={isRotationReportOpen}
        onClose={() => setIsRotationReportOpen(false)}
        inventory={inventory}
      />
      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onAddCategory={addCategory}
      />
      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        product={selectedProduct}
        onEditProduct={handleEditProduct}
        categories={categories}
        suppliers={suppliers}
        locations={locations}
      />
      <AssignToolModal
        isOpen={isAssignToolModalOpen}
        onClose={() => setIsAssignToolModalOpen(false)}
        product={selectedProduct}
        onAssignTool={assignToolToEmployee}
        onReturnTool={returnToolFromEmployee}
      />
      <QrScannerModal
        isOpen={isQrScannerModalOpen}
        onClose={() => setIsQrScannerModalOpen(false)}
        inventory={inventory}
        onItemScanned={(itemId) => {
          const item = inventory.find((item) => item.id === itemId);
          if (item) {
            setSelectedProduct(item);
            setIsProductDetailsModalOpen(true);
          }
        }}
      />
      <AuditHistoryModal
        isOpen={isAuditHistoryModalOpen}
        onClose={() => setIsAuditHistoryModalOpen(false)}
        auditHistory={auditHistory}
        inventory={inventory}
      />
      <ReportGeneratorModal
        isOpen={isReportGeneratorModalOpen}
        onClose={() => setIsReportGeneratorModalOpen(false)}
        onGenerateReport={generateReport}
      />
    </Card>
  );
}
