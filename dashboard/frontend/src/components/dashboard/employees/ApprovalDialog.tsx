import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ApprovalRequest {
  id: string;
  employeeName: string;
  field: string;
  currentValue: string;
  requestedValue: string;
}

const mockRequests: ApprovalRequest[] = [
  {
    id: "REQ-001",
    employeeName: "John Doe",
    field: "Position",
    currentValue: "Junior Developer",
    requestedValue: "Senior Developer",
  },
  {
    id: "REQ-002",
    employeeName: "Jane Smith",
    field: "Department",
    currentValue: "IT",
    requestedValue: "Human Resources",
  },
  // Add more mock requests as needed
];

interface ApprovalDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ApprovalDialog({
  isOpen,
  onClose,
}: ApprovalDialogProps) {
  const [requests, setRequests] = useState<ApprovalRequest[]>(mockRequests);

  const handleApprove = (id: string) => {
    // Here you would typically make an API call to update the employee data
    console.log(`Approved request ${id}`);
    setRequests(requests.filter((req) => req.id !== id));
  };

  const handleReject = (id: string) => {
    // Here you would typically make an API call to notify the employee
    console.log(`Rejected request ${id}`);
    setRequests(requests.filter((req) => req.id !== id));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Approval Requests</DialogTitle>
          <DialogDescription>
            Review and approve or reject employee data change requests.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
          {requests.map((request) => (
            <div key={request.id} className="mb-4 p-2 border rounded">
              <p>
                <strong>{request.employeeName}</strong> requests to change their{" "}
                {request.field}:
              </p>
              <p>From: {request.currentValue}</p>
              <p>To: {request.requestedValue}</p>
              <div className="mt-2 flex justify-end space-x-2">
                <Button onClick={() => handleApprove(request.id)} size="sm">
                  Approve
                </Button>
                <Button
                  onClick={() => handleReject(request.id)}
                  variant="outline"
                  size="sm"
                >
                  Reject
                </Button>
              </div>
            </div>
          ))}
        </ScrollArea>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
