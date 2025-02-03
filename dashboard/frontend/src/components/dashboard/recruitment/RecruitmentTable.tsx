"use client";

import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Filter, Bell } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

export default function RecruitmentTable() {
  const { toast } = useToast();
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
      experience: 5,
      educationLevel: "Bachelor",
      location: "New York",
      scores: { technical: 0, communication: 0, problemSolving: 0, total: 0 },
    },
    {
      id: "APP-002",
      applicant: "Jane Smith",
      position: "HR Manager",
      vacancyId: "VAC-002",
      status: "Accepted",
      appliedDate: "2023-12-07",
      experience: 8,
      educationLevel: "Master",
      location: "Chicago",
      scores: { technical: 0, communication: 0, problemSolving: 0, total: 0 },
    },
    {
      id: "APP-003",
      applicant: "David Brown",
      position: "Marketing Specialist",
      vacancyId: "VAC-003",
      status: "Rejected",
      appliedDate: "2023-12-09",
      experience: 3,
      educationLevel: "Bachelor",
      location: "Los Angeles",
      scores: { technical: 0, communication: 0, problemSolving: 0, total: 0 },
    },
    {
      id: "APP-004",
      applicant: "Emily Johnson",
      position: "Software Engineer",
      vacancyId: "VAC-001",
      status: "Pending",
      appliedDate: "2023-12-11",
      experience: 2,
      educationLevel: "Associate",
      location: "San Francisco",
      scores: { technical: 0, communication: 0, problemSolving: 0, total: 0 },
    },
    {
      id: "APP-005",
      applicant: "Michael Lee",
      position: "HR Manager",
      vacancyId: "VAC-002",
      status: "Pending",
      appliedDate: "2023-12-12",
      experience: 6,
      educationLevel: "Bachelor",
      location: "Boston",
      scores: { technical: 0, communication: 0, problemSolving: 0, total: 0 },
    },
  ]);

  const [newVacancy, setNewVacancy] = useState({
    title: "",
    department: "",
    publishDate: "",
  });

  const [editingVacancy, setEditingVacancy] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [isEvaluationDialogOpen, setIsEvaluationDialogOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [evaluationScores, setEvaluationScores] = useState({
    technical: 0,
    communication: 0,
    problemSolving: 0,
    total: 0,
  });

  const [errors, setErrors] = useState({});

  const [filters, setFilters] = useState({
    experience: "",
    educationLevel: "",
    location: "",
  });

  const [filteredApplications, setFilteredApplications] =
    useState(applications);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date().toISOString().split("T")[0];
      setVacancies((prevVacancies) =>
        prevVacancies.map((vacancy) =>
          vacancy.status === "Scheduled" && vacancy.publishDate <= currentDate
            ? { ...vacancy, status: "Active" }
            : vacancy
        )
      );
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    applyFilters();
  }, [applications, filters]); //Fixed unnecessary dependency

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVacancy({ ...newVacancy, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditingVacancy({ ...editingVacancy, [name]: value });
  };

  const validateForm = (vacancy) => {
    const newErrors = {};
    if (!vacancy.title.trim()) newErrors.title = "Job Title is required";
    if (!vacancy.department.trim())
      newErrors.department = "Department is required";
    if (!vacancy.publishDate)
      newErrors.publishDate = "Publish Date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePublish = (e) => {
    e.preventDefault();
    if (validateForm(newVacancy)) {
      const currentDate = new Date().toISOString().split("T")[0];
      const publishDate = newVacancy.publishDate;
      const newVacancyData = {
        id: `VAC-${vacancies.length + 1}`.padStart(7, "0"),
        ...newVacancy,
        status: publishDate > currentDate ? "Scheduled" : "Active",
      };

      setVacancies([...vacancies, newVacancyData]);
      setNewVacancy({ title: "", department: "", publishDate: "" });

      if (publishDate > currentDate) {
        toast({
          title: "Vacancy Scheduled",
          description: `The vacancy "${newVacancyData.title}" has been scheduled for publication on ${newVacancy.publishDate}.`,
        });
      } else {
        toast({
          title: "Vacancy Published",
          description: `The vacancy "${newVacancyData.title}" has been successfully published.`,
        });
      }
    } else {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = (id) => {
    setVacancies(vacancies.filter((vacancy) => vacancy.id !== id));
    toast({
      title: "Vacancy Deleted",
      description: "The vacancy has been successfully deleted.",
    });
  };

  const handleEdit = (vacancy) => {
    setEditingVacancy(vacancy);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (validateForm(editingVacancy)) {
      const currentDate = new Date().toISOString().split("T")[0];
      const updatedVacancy = {
        ...editingVacancy,
        status:
          editingVacancy.publishDate > currentDate ? "Scheduled" : "Active",
      };

      setVacancies(
        vacancies.map((v) => (v.id === updatedVacancy.id ? updatedVacancy : v))
      );
      setIsEditDialogOpen(false);

      if (updatedVacancy.status === "Scheduled") {
        toast({
          title: "Vacancy Scheduled",
          description: `The vacancy "${updatedVacancy.title}" has been scheduled for publication on ${updatedVacancy.publishDate}.`,
        });
      } else {
        toast({
          title: "Vacancy Updated",
          description: "The vacancy has been successfully updated.",
        });
      }
    } else {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
    }
  };

  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const applyFilters = () => {
    let filtered = applications;

    if (filters.experience) {
      filtered = filtered.filter(
        (app) => app.experience >= Number.parseInt(filters.experience)
      );
    }

    if (filters.educationLevel) {
      filtered = filtered.filter(
        (app) => app.educationLevel === filters.educationLevel
      );
    }

    if (filters.location) {
      filtered = filtered.filter((app) => app.location === filters.location);
    }

    setFilteredApplications(filtered);
  };

  const simulateNewApplication = () => {
    const newApplication = {
      id: `APP-${applications.length + 1}`.padStart(7, "0"),
      applicant: "New Applicant",
      position: "Software Engineer",
      vacancyId: "VAC-001",
      status: "Pending",
      appliedDate: new Date().toISOString().split("T")[0],
      experience: 3,
      educationLevel: "Bachelor",
      location: "Remote",
    };

    setApplications([...applications, newApplication]);
    setFilteredApplications([...filteredApplications, newApplication]);

    const newNotification = {
      title: "New Application Received",
      message: `${newApplication.applicant} applied for ${newApplication.position}`,
    };

    setNotifications([...notifications, newNotification]);

    toast({
      title: "New Application",
      description: `${newApplication.applicant} has applied for ${newApplication.position}`,
    });
  };

  const handleScoreChange = (criteria, value) => {
    const updatedScores = {
      ...evaluationScores,
      [criteria]: Number(value),
    };
    updatedScores.total = updatedScores.technical + updatedScores.communication + updatedScores.problemSolving;
  
    setEvaluationScores(updatedScores);
  };

  const handleSaveEvaluation = () => {
    setApplications((prevApplications) =>
      prevApplications.map((app) =>
        app.id === selectedApplication.id
          ? { ...app, scores: evaluationScores }
          : app
      )
    );
    setIsEvaluationDialogOpen(false);
  };

  const sortedApplications = [...applications].sort((a, b) => b.scores.total - a.scores.total);

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
          <form onSubmit={handlePublish} className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-[200px]">
              <Input
                type="text"
                name="title"
                placeholder="Job Title"
                value={newVacancy.title}
                onChange={handleInputChange}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>
            <div className="flex-1 min-w-[200px]">
              <Input
                type="text"
                name="department"
                placeholder="Department"
                value={newVacancy.department}
                onChange={handleInputChange}
              />
              {errors.department && (
                <p className="text-red-500 text-sm mt-1">{errors.department}</p>
              )}
            </div>
            <div className="flex-1 min-w-[200px]">
              <Input
                type="date"
                name="publishDate"
                value={newVacancy.publishDate}
                onChange={handleInputChange}
              />
              {errors.publishDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.publishDate}
                </p>
              )}
            </div>
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
                    <Button
                      variant="ghost"
                      size="icon"
                      className="mr-2"
                      onClick={() => handleEdit(vacancy)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(vacancy.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleEvaluateCandidate(app)}>
                      Evaluar
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
          <div className="flex justify-end mb-4 space-x-2">
            <Button onClick={() => setIsFilterDialogOpen(true)}>
              <Filter className="mr-2 h-4 w-4" /> Filter Applications
            </Button>
            <Button
              onClick={() => setIsNotificationModalOpen(true)}
              variant="outline"
            >
              <Bell className="mr-2 h-4 w-4" />
              {notifications.length > 0 && (
                <Badge variant="destructive" className="ml-1">
                  {notifications.length}
                </Badge>
              )}
            </Button>
          </div>
          <Button onClick={simulateNewApplication} className="mb-4">
            Simulate New Application
          </Button>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Application ID</TableHead>
                <TableHead>Applicant</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Vacancy ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Applied Date</TableHead>
                <TableHead>Experience (Years)</TableHead>
                <TableHead>Education Level</TableHead>
                <TableHead>Location</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">{app.id}</TableCell>
                  <TableCell>{app.applicant}</TableCell>
                  <TableCell>{app.position}</TableCell>
                  <TableCell>{app.vacancyId}</TableCell>
                  <TableCell>{app.status}</TableCell>
                  <TableCell>{app.appliedDate}</TableCell>
                  <TableCell>{app.experience}</TableCell>
                  <TableCell>{app.educationLevel}</TableCell>
                  <TableCell>{app.location}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Vacancy</DialogTitle>
          </DialogHeader>
          {editingVacancy && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Input
                  id="title"
                  name="title"
                  value={editingVacancy.title}
                  onChange={handleEditInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Input
                  id="department"
                  name="department"
                  value={editingVacancy.department}
                  onChange={handleEditInputChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Input
                  id="publishDate"
                  name="publishDate"
                  type="date"
                  value={editingVacancy.publishDate}
                  onChange={handleEditInputChange}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleSaveEdit}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isFilterDialogOpen} onOpenChange={setIsFilterDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Filter Applications</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="experience" className="text-right">
                Minimum Experience (Years)
              </Label>
              <Input
                id="experience"
                type="number"
                value={filters.experience}
                onChange={(e) =>
                  handleFilterChange("experience", e.target.value)
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="educationLevel" className="text-right">
                Education Level
              </Label>
              <Select
                onValueChange={(value) =>
                  handleFilterChange("educationLevel", value)
                }
                value={filters.educationLevel}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select education level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Any">Any</SelectItem>
                  <SelectItem value="Associate">Associate</SelectItem>
                  <SelectItem value="Bachelor">Bachelor</SelectItem>
                  <SelectItem value="Master">Master</SelectItem>
                  <SelectItem value="Doctorate">Doctorate</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input
                id="location"
                value={filters.location}
                onChange={(e) => handleFilterChange("location", e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsFilterDialogOpen(false)}>
              Apply Filters
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={isNotificationModalOpen}
        onOpenChange={setIsNotificationModalOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Notifications</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {notifications.length === 0 ? (
              <p>No new notifications</p>
            ) : (
              notifications.map((notification, index) => (
                <div key={index} className="bg-muted p-3 rounded-md">
                  <p className="font-semibold">{notification.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {notification.message}
                  </p>
                </div>
              ))
            )}
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                setNotifications([]);
                setIsNotificationModalOpen(false);
              }}
            >
              Clear All
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEvaluationDialogOpen} onOpenChange={setIsEvaluationDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Evaluar Candidato</DialogTitle>
          </DialogHeader>
          {selectedApplication && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label>Habilidad Técnica</Label>
                <Input
                  type="number"
                  value={evaluationScores.technical}
                  onChange={(e) => handleScoreChange("technical", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label>Comunicación</Label>
                <Input
                  type="number"
                  value={evaluationScores.communication}
                  onChange={(e) => handleScoreChange("communication", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label>Resolución de Problemas</Label>
                <Input
                  type="number"
                  value={evaluationScores.problemSolving}
                  onChange={(e) => handleScoreChange("problemSolving", e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label>Total</Label>
                <p>{evaluationScores.total}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleSaveEvaluation}>Guardar Evaluación</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
