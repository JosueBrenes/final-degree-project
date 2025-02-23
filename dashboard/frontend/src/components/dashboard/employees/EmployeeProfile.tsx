"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle } from "lucide-react";

interface EmployeeData {
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
}

const employeeData: EmployeeData = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 234 567 8900",
  position: "Junior Developer",
  department: "IT Department",
};

export default function EmployeeProfile() {
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);
  const [selectedField, setSelectedField] = useState<keyof EmployeeData | "">(
    ""
  );
  const [showAlert, setShowAlert] = useState(false);

  const {
    register: registerRequest,
    handleSubmit: handleSubmitRequest,
    reset,
  } = useForm<{ request: string }>();

  const onSubmitRequest = (data: { request: string }) => {
    console.log(
      "Change request submitted for",
      selectedField,
      ":",
      data.request
    );
    setIsRequestDialogOpen(false);
    setSelectedField("");
    reset();
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 5000);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Employee Profile</CardTitle>
        <CardDescription>
          View your personal and work information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.entries(employeeData).map(([key, value]) => (
            <div key={key}>
              <Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
              <p>{value}</p>
            </div>
          ))}
        </div>
        {showAlert && (
          <Alert className="mt-4">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
              Your request to change {selectedField} has been sent to the
              manager.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Link href="/dashboard/profile/salary">
          <Button variant="outline">View Salary Details</Button>
        </Link>
        <Dialog
          open={isRequestDialogOpen}
          onOpenChange={setIsRequestDialogOpen}
        >
          <DialogTrigger asChild>
            <Button>Request Changes</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Request Profile Changes</DialogTitle>
              <DialogDescription>
                Select the information you want to change and describe your
                request.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmitRequest(onSubmitRequest)}>
              <div className="space-y-4">
                <Select
                  onValueChange={(value) =>
                    setSelectedField(value as keyof EmployeeData)
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select field to change" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(employeeData).map((key) => (
                      <SelectItem key={key} value={key}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedField && (
                  <Textarea
                    {...registerRequest("request", { required: true })}
                    placeholder={`Describe the changes you're requesting for ${selectedField}...`}
                    className="min-h-[100px]"
                  />
                )}
              </div>
              <DialogFooter className="mt-4">
                <Button type="submit" disabled={!selectedField}>
                  Submit Request
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
