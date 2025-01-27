"use client";

import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function RecruitmentTable() {
  const [vacancies, setVacancies] = useState([
    {
      id: "VAC-001",
      title: "Software Engineer",
      department: "IT",
      status: "Active",
      publishDate: "2023-12-10",
    },
    {
      id: "VAC-002",
      title: "HR Manager",
      department: "Human Resources",
      status: "Scheduled",
      publishDate: "2023-12-15",
    },
    {
      id: "VAC-003",
      title: "Marketing Specialist",
      department: "Marketing",
      status: "Draft",
      publishDate: null,
    },
  ]);

  const [applications, setApplications] = useState([
    {
      id: "APP-001",
      applicant: "John Doe",
      position: "Software Engineer",
      vacancyId: "VAC-001",
      status: "Pending",
      appliedDate: "2023-12-05",
    },
    {
      id: "APP-002",
      applicant: "Jane Smith",
      position: "HR Manager",
      vacancyId: "VAC-002",
      status: "Accepted",
      appliedDate: "2023-12-07",
    },
    {
      id: "APP-003",
      applicant: "David Brown",
      position: "Marketing Specialist",
      vacancyId: "VAC-003",
      status: "Rejected",
      appliedDate: "2023-12-09",
    },
  ]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Vacancies</CardTitle>
          <CardDescription>
            Manage job postings, including creating and updating vacancies.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-wrap gap-4 mb-6">
            <Input
              type="text"
              placeholder="Job Title"
              className="flex-1 min-w-[200px]"
            />
            <Input
              type="text"
              placeholder="Department"
              className="flex-1 min-w-[200px]"
            />
            <Input type="date" className="flex-1 min-w-[200px]" />
            <Button type="submit">Publish</Button>
          </form>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Publish Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vacancies.map((vacancy) => (
                <TableRow key={vacancy.id}>
                  <TableCell className="font-medium">{vacancy.id}</TableCell>
                  <TableCell>{vacancy.title}</TableCell>
                  <TableCell>{vacancy.department}</TableCell>
                  <TableCell>{vacancy.status}</TableCell>
                  <TableCell>
                    {vacancy.publishDate || "Not Scheduled"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" className="mr-2">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Applications</CardTitle>
          <CardDescription>
            Review and manage applications submitted for job postings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Application ID</TableHead>
                <TableHead>Applicant</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Vacancy ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Applied Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">{app.id}</TableCell>
                  <TableCell>{app.applicant}</TableCell>
                  <TableCell>{app.position}</TableCell>
                  <TableCell>{app.vacancyId}</TableCell>
                  <TableCell>{app.status}</TableCell>
                  <TableCell>{app.appliedDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
