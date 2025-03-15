"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface HistoryEntry {
  date: string;
  type: "In" | "Out";
  quantity: number;
}

interface Product {
  name: string;
}

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

const mockHistory: HistoryEntry[] = [
  { date: "2023-11-10", type: "In", quantity: 50 },
  { date: "2023-11-05", type: "Out", quantity: 20 },
  { date: "2023-10-30", type: "In", quantity: 100 },
  { date: "2023-10-25", type: "Out", quantity: 30 },
];

export default function HistoryModal({
  isOpen,
  onClose,
  product,
}: HistoryModalProps) {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{product.name} Movement History</DialogTitle>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Quantity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockHistory.map((entry, index) => (
              <TableRow key={index}>
                <TableCell>{entry.date}</TableCell>
                <TableCell>{entry.type}</TableCell>
                <TableCell>{entry.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}
