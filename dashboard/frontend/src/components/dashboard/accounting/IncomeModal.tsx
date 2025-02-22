import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const IncomeModal = ({ addIncome, ivaRate }) => {
  const [amount, setAmount] = useState("");
  const [client, setClient] = useState("");
  const [date, setDate] = useState("");
  
  const ivaAmount = amount ? (parseFloat(amount) * (ivaRate / 100)).toFixed(2) : "0.00";
  const totalWithIVA = amount ? (parseFloat(amount) + parseFloat(ivaAmount)).toFixed(2) : "0.00";

  const handleSubmit = () => {
    addIncome({
      id: `FAC-${Math.floor(Math.random() * 1000)}`,
      client,
      amount: parseFloat(amount),
      iva: parseFloat(ivaAmount),
      total: parseFloat(totalWithIVA),
      type: "Ingreso",
      date,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Agregar Ingreso</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Registrar Ingreso</DialogTitle>
        <Input type="text" placeholder="Cliente" value={client} onChange={(e) => setClient(e.target.value)} />
        <Input type="number" placeholder="Monto" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        
        <p>IVA Aplicado: ${ivaAmount}</p>
        <p>Total con IVA: ${totalWithIVA}</p>

        <DialogFooter>
          <Button onClick={handleSubmit}>Registrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default IncomeModal;

