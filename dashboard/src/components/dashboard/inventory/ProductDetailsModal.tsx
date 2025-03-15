import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  status: string;
  supplier: string;
  lastUpdated: string;
  minStockLevel: number;
}

interface ProductDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: InventoryItem | null;
  categories: string[];
  onAssignCategory: (productId: string, newCategory: string) => void;
}

export default function ProductDetailsModal({
  isOpen,
  onClose,
  product,
  categories,
  onAssignCategory,
}: ProductDetailsModalProps) {
  if (!product) {
    return null;
  }

  const handleCategoryChange = (newCategory: string) => {
    onAssignCategory(product.id, newCategory);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Product Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Name</Label>
            <div className="col-span-3">{product.name}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Category</Label>
            <Select
              value={product.category}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Quantity</Label>
            <div className="col-span-3">{product.quantity}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Status</Label>
            <div className="col-span-3">{product.status}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Supplier</Label>
            <div className="col-span-3">{product.supplier}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Last Updated</Label>
            <div className="col-span-3">{product.lastUpdated}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Min Stock Level</Label>
            <div className="col-span-3">{product.minStockLevel}</div>
          </div>
        </div>
        <Button onClick={onClose}>Close</Button>
      </DialogContent>
    </Dialog>
  );
}
