import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ExpenseModal = ({ addExpense, ivaRate, retentionRate }) => {
  const [amount, setAmount] = useState("");
  const [supplier, setSupplier] = useState("");
  const [date, setDate] = useState("");

  const ivaAmount = amount ? (parseFloat(amount) * (ivaRate / 100)).toFixed(2) : "0.00";
  const retentionAmount = amount ? (parseFloat(amount) * (retentionRate / 100)).toFixed(2) : "0.00";
  const totalWithTaxes = amount ? (parseFloat(amount) + parseFloat(ivaAmount) - parseFloat(retentionAmount)).toFixed(2) : "0.00";

  const handleSubmit = () => {
    addExpense({
      id: `EXP-${Math.floor(Math.random() * 1000)}`,
      supplier,
      amount: parseFloat(amount),
      iva: parseFloat(ivaAmount),
      retention: parseFloat(retentionAmount),
      total: parseFloat(totalWithTaxes),
      type: "Egreso",
      date,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Agregar Egreso</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Registrar Egreso</DialogTitle>
        <Input type="text" placeholder="Proveedor" value={supplier} onChange={(e) => setSupplier(e.target.value)} />
        <Input type="number" placeholder="Monto" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        
        <p>IVA Aplicado: ${ivaAmount}</p>
        <p>Retención Aplicada: -${retentionAmount}</p>
        <p>Total con Impuestos: ${totalWithTaxes}</p>

        <DialogFooter>
          <Button onClick={handleSubmit}>Registrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExpenseModal;

