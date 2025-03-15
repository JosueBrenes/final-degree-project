"use client";

import { Button } from "@/components/ui/button";
import { Wrapper } from "@/components/utils/Wrapper";
import { InventoryFilters } from "@/components/dashboard/inventory/inventory-filters";
import { InventoryTable } from "@/components/dashboard/inventory/inventory-table";
import { AddItemModal } from "@/components/dashboard/inventory/add-item-modal";

export default function InventoryPage() {
  return (
    <Wrapper>
      <div className="flex min-h-screen flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Inventario</h2>
            <div className="flex items-center space-x-2">
              <Button variant="outline">Exportar</Button>
              <AddItemModal />
            </div>
          </div>
          <div className="space-y-4">
            <InventoryFilters />
            <InventoryTable />
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
