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
import { useToast } from "@/hooks/use-toast";
import InventoryModal from "./InventoryModal";
import ProductDetailsModal from "./ProductDetailsModal";
import HistoryModal from "./HistoryModal";
import ConfigureAlertModal from "./ConfigureAlertModal";
import LowStockReportModal from "./LowStockReportModal";
import InventoryMovementModal from "./InventoryMovementModal";
import InventoryRotationReport from "./InventoryRotationReport";

const inventoryItems = [
  {
    id: "ITM-001",
    name: "Industrial Lubricant",
    category: "Consumables",
    quantity: 50,
    status: "In Stock",
    supplier: "Supplier A",
    lastUpdated: "2023-11-01",
    minStockLevel: 30,
    movements: [
      { date: "2024-01-10", type: "in", quantity: 20 },
      { date: "2024-01-15", type: "out", quantity: 10 },
    ],
  },
  {
    id: "ITM-002",
    name: "Hydraulic Pump",
    category: "Machinery",
    quantity: 10,
    status: "Low Stock",
    supplier: "Supplier B",
    lastUpdated: "2023-11-05",
    minStockLevel: 15,
    movements: [
      { date: "2024-01-10", type: "in", quantity: 20 },
      { date: "2024-01-15", type: "out", quantity: 10 },
    ],
  },
  {
    id: "ITM-003",
    name: "Safety Helmets",
    category: "Safety Equipment",
    quantity: 100,
    status: "In Stock",
    supplier: "Supplier C",
    lastUpdated: "2023-11-07",
    minStockLevel: 50,
    movements: [
      { date: "2024-01-10", type: "in", quantity: 20 },
      { date: "2024-01-15", type: "out", quantity: 10 },
    ],
  },
  {
    id: "ITM-004",
    name: "Welding Rods",
    category: "Tools",
    quantity: 5,
    status: "Low Stock",
    supplier: "Supplier D",
    lastUpdated: "2023-11-08",
    minStockLevel: 20,
    movements: [
      { date: "2024-01-10", type: "in", quantity: 20 },
      { date: "2024-01-15", type: "out", quantity: 10 },
    ],
  },
  {
    id: "ITM-005",
    name: "Conveyor Belts",
    category: "Machinery Parts",
    quantity: 15,
    status: "Low Stock",
    supplier: "Supplier E",
    lastUpdated: "2023-11-10",
    minStockLevel: 25,
    movements: [
      { date: "2024-01-10", type: "in", quantity: 20 },
      { date: "2024-01-15", type: "out", quantity: 10 },
    ],
  },
];

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  status: string;
  supplier: string;
  lastUpdated: string;
  minStockLevel: number;
  movements: { date: string; type: "in" | "out"; quantity: number }[];
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
  const [selectedCategory, setSelectedCategory] = useState("All");
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

  const { toast } = useToast();

  const categories = [...new Set(inventory.map((item) => item.category))];

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const groupedInventory: GroupedInventory = inventory.reduce(
    (acc: GroupedInventory, item: InventoryItem) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {}
  );

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

  const updateMinStockLevel = (productId: string, newMinStockLevel: number) => {
    setInventory((prevInventory) =>
      prevInventory.map((item) =>
        item.id === productId
          ? { ...item, minStockLevel: newMinStockLevel }
          : item
      )
    );
  };

  const handleInventoryMovement = (product: InventoryItem, type: string) => {
    setSelectedProduct(product);
    setMovementType(type);
    setIsInventoryMovementModalOpen(true);
  };

  const updateInventory = (
    productId: string,
    quantity: number,
    type: string
  ) => {
    setInventory((prevInventory) =>
      prevInventory.map((item) => {
        if (item.id === productId) {
          const newQuantity =
            type === "in" ? item.quantity + quantity : item.quantity - quantity;
          return {
            ...item,
            quantity: newQuantity,
            status: newQuantity < item.minStockLevel ? "Low Stock" : "In Stock",
          };
        }
        return item;
      })
    );
  };

  useEffect(() => {
    // Check for low stock items and send alerts
    inventory.forEach((item) => {
      if (item.quantity < item.minStockLevel) {
        toast({
          title: "Low Stock Alert",
          description: `${item.name} is below the minimum stock level.`,
          variant: "destructive",
        });
      }
    });
  }, [inventory, toast]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory</CardTitle>
        <CardDescription>
          Manage and review industrial maintenance inventory items.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4">
          <div className="flex gap-2">
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Categories</SelectItem>
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
              Low Stock Report
            </Button>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Item
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(selectedCategory === "All"
              ? Object.entries(groupedInventory)
              : [[selectedCategory, groupedInventory[selectedCategory] || []]]
            ).map(([category, items]) => (
              <React.Fragment key={category}>
                {selectedCategory === "All" && (
                  <TableRow className="bg-muted/50">
                    <TableCell colSpan={8}>
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
                {(selectedCategory === "All"
                  ? expandedCategories[category]
                  : true) &&
                  (items as InventoryItem[]).map((item) => (
                    <TableRow
                      key={item.id}
                      className="cursor-pointer"
                      onClick={() => handleProductClick(item)}
                    >
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            item.status === "Low Stock"
                              ? "destructive"
                              : "default"
                          }
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.supplier}</TableCell>
                      <TableCell>{item.lastUpdated}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="mr-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleHistoryClick(item);
                          }}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="mr-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleConfigureAlert(item);
                          }}
                        >
                          <AlertTriangle className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="mr-2">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="mr-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleInventoryMovement(item, "in");
                          }}
                        >
                          <ArrowUpCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="mr-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleInventoryMovement(item, "out");
                          }}
                        >
                          <ArrowDownCircle className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => setIsRotationReportOpen(true)}>
                          Generate Rotation Report
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <InventoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <ProductDetailsModal
        isOpen={isProductDetailsModalOpen}
        onClose={() => setIsProductDetailsModalOpen(false)}
        product={selectedProduct}
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
    </Card>
  );
}
