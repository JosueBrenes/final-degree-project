import { useState, useEffect } from "react";

interface PaymentSchedulerProps {
  isOpen: boolean;
  onClose: () => void;
  payrollData: any; // Recibe los datos de la planilla generada
}

const PaymentScheduler = ({ isOpen, onClose, payrollData }: PaymentSchedulerProps) => {
  const [month, setMonth] = useState(payrollData.month || "");
  const [executionDate, setExecutionDate] = useState("");
  const [payments, setPayments] = useState([]);

  // Load scheduled payments from localStorage on initialization
  useEffect(() => {
    const storedPayments = JSON.parse(localStorage.getItem("scheduledPayments")) || [];
    setPayments(storedPayments);
  }, []);

  const handleSchedulePayment = () => {
    if (!month || !executionDate) {
      alert("Please select a month and an execution date.");
      return;
    }

    // Check if a payment is already scheduled for this month
    const existingPayment = payments.find((p) => p.month === month);
    if (existingPayment) {
      alert("A payment is already scheduled for this month.");
      return;
    }

    const newPayment = { month, executionDate, status: "Scheduled", ...payrollData };
    const updatedPayments = [...payments, newPayment];
    setPayments(updatedPayments);
    localStorage.setItem("scheduledPayments", JSON.stringify(updatedPayments));
    onClose();
  };

  return (
    <div>
      <h2>Schedule Payment</h2>
      <div>
        <label>
          Month:
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            disabled
          />
        </label>
      </div>
      <div>
        <label>
          Execution Date:
          <input
            type="date"
            value={executionDate}
            onChange={(e) => setExecutionDate(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleSchedulePayment}>Schedule Payment</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default PaymentScheduler;