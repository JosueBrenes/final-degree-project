import { useEffect, useState } from "react";

const PaymentStatus = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const storedPayments = JSON.parse(localStorage.getItem("scheduledPayments")) || [];
    setPayments(storedPayments);
  }, []);

  const handleConfirmPayment = (month) => {
    const updatedPayments = payments.map((p) =>
      p.month === month ? { ...p, status: "Ready to Execute" } : p
    );
    setPayments(updatedPayments);
    localStorage.setItem("scheduledPayments", JSON.stringify(updatedPayments));
  };

  return (
    <div>
      <h2>Scheduled Payments Status</h2>
      {payments.length > 0 ? (
        <ul>
          {payments.map((p) => (
            <li key={p.month}>
              {p.month} - {p.status} (Execution: {p.executionDate})
              {p.status === "Scheduled" && (
                <button onClick={() => handleConfirmPayment(p.month)}>Confirm Payment</button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No scheduled payments.</p>
      )}
    </div>
  );
};

export default PaymentStatus;
