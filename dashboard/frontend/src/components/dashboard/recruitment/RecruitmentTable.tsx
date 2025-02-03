"use client";

import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import InterviewScheduler, { Interview } from "@/components/dashboard/recruitment/InterviewScheduler";

export default function RecruitmentTable() {
  const [vacancies] = useState([
    { 
      id: "VAC-001", 
      title: "Software Engineer", 
      department: "IT", 
      status: "Active", 
      publishDate: "2023-12-10" 
    },
    { 
      id: "VAC-002", 
      title: "HR Manager", 
      department: "Human Resources", 
      status: "Scheduled", publishDate: "2023-12-15" },
    { 
      id: "VAC-003", 
      title: "Marketing Specialist", 
      department: "Marketing", 
      status: "Draft", 
      publishDate: null },
  ]);

  const [applications, setApplications] = useState([
    { 
      id: "APP-001", 
      applicant: "John Doe", 
      position: "Software Engineer", 
      vacancyId: "VAC-001", 
      status: "Pending", 
      appliedDate: "2023-12-05" 
    },
    { 
      id: "APP-002", 
      applicant: "Jane Smith", 
      position: "HR Manager", 
      vacancyId: "VAC-002", 
      status: "Accepted", 
      appliedDate: "2023-12-07" 
    },
    { id: "APP-003", 
      applicant: "David Brown", 
      position: "Marketing Specialist", 
      vacancyId: "VAC-003", 
      status: "Rejected", 
      appliedDate: "2023-12-09" 
    },
  ]);

  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [showInterviewForm, setShowInterviewForm] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<typeof applications[0] | null>(null);

  const handleInterviewScheduled = (newInterview: Interview) => {
    setInterviews(prev => [...prev, newInterview]);
    console.log("Entrevista agendada:", newInterview);
  };

  const handleInterviewSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    if (!selectedApplication) return;

    const newInterview: Interview = {
      id: `INT-${interviews.length + 1}`,
      applicationId: selectedApplication.id,
      dateTime: (formData.get("datetime") as string) || "",
      interviewer: (formData.get("interviewer") as string) || "",
      location: (formData.get("location") as string) || "",
      status: "Scheduled",
    };

    setInterviews([...interviews, newInterview]);
    setShowInterviewForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Vacancies Table */}
      <Card>
        <CardHeader>
          <CardTitle>Vacancies</CardTitle>
          <CardDescription>Manage job postings, including creating and updating vacancies.</CardDescription>
        </CardHeader>
        <CardContent>
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
                  <TableCell>{vacancy.id}</TableCell>
                  <TableCell>{vacancy.title}</TableCell>
                  <TableCell>{vacancy.department}</TableCell>
                  <TableCell>{vacancy.status}</TableCell>
                  <TableCell>{vacancy.publishDate || "Not Scheduled"}</TableCell>
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

      {/* Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle>Applications</CardTitle>
          <CardDescription>Review and manage applications submitted for job postings.</CardDescription>
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
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell>{app.id}</TableCell>
                  <TableCell>{app.applicant}</TableCell>
                  <TableCell>{app.position}</TableCell>
                  <TableCell>{app.vacancyId}</TableCell>
                  <TableCell>
                    <select
                      value={app.status}
                      onChange={(e) =>
                        setApplications(applications.map(a =>
                          a.id === app.id ? { ...a, status: e.target.value } : a
                        ))
                      }
                      className="bg-transparent border rounded px-2 py-1"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </TableCell>
                  <TableCell>{app.appliedDate}</TableCell>
                  <TableCell>
                    {app.status === "Accepted" && (
                      <Button onClick={() => {
                        setSelectedApplication(app);
                        setShowInterviewForm(true);
                      }}>
                        Schedule Interview
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Scheduled Interviews Section */}
      <Card>
        <CardHeader>
          <CardTitle>Scheduled Interviews</CardTitle>
          <CardDescription>View and manage upcoming interviews with candidates.</CardDescription>
        </CardHeader>
        <CardContent>
          <InterviewScheduler
            applications={applications}
            scheduledInterviews={interviews}
            onInterviewScheduled={handleInterviewScheduled}
          />
        </CardContent>
      </Card>

      {/* Interview Scheduling Form */}
      {showInterviewForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Schedule Interview</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleInterviewSubmit} className="space-y-4">
                <Input value={selectedApplication?.applicant} disabled />
                <Input value={selectedApplication?.position} disabled />
                <Input type="datetime-local" name="datetime" required />
                <Input type="text" name="interviewer" required />
                <Input type="text" name="location" required />
                <div className="flex gap-2 justify-end">
                  <Button type="button" variant="outline" onClick={() => setShowInterviewForm(false)}>Cancel</Button>
                  <Button type="submit">Schedule</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
