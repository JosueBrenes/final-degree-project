"use client";

import React from "react";
import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function SatisfactionDashboard() {
  const highlights = [
    { label: "Overall Satisfaction", value: "80%", color: "bg-green-500" },
    { label: "Employee Engagement", value: "85%", color: "bg-blue-500" },
    { label: "Client Retention", value: "90%", color: "bg-yellow-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {highlights.map((item, index) => (
          <Card key={index} className={item.color}>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <CardTitle className="text-white">{item.label}</CardTitle>
                <p className="text-2xl font-bold text-white">{item.value}</p>
              </div>
              <TrendingUp className="w-12 h-12 text-white" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Evaluate Satisfaction</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="employee-name">Employee Name</Label>
              <Input
                id="employee-name"
                placeholder="Enter employee's full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="satisfaction-score">
                Satisfaction Score (0-100)
              </Label>
              <Input
                type="number"
                id="satisfaction-score"
                placeholder="Enter satisfaction score"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="comments">Comments</Label>
              <Textarea
                id="comments"
                placeholder="Provide additional feedback"
                rows={4}
              />
            </div>
            <Button className="w-full">Submit Evaluation</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
