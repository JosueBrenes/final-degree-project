"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface Candidate {
  id: string;
  name: string;
  position: string;
  score: number;
  experience: number;
  education: string;
}

const mockCandidates: Candidate[] = [
  {
    id: "C001",
    name: "John Doe",
    position: "Software Engineer",
    score: 85,
    experience: 5,
    education: "Bachelor's",
  },
  {
    id: "C002",
    name: "Jane Smith",
    position: "HR Manager",
    score: 92,
    experience: 8,
    education: "Master's",
  },
  {
    id: "C003",
    name: "Mike Johnson",
    position: "Marketing Specialist",
    score: 78,
    experience: 3,
    education: "Bachelor's",
  },
  {
    id: "C004",
    name: "Emily Brown",
    position: "Software Engineer",
    score: 88,
    experience: 6,
    education: "Master's",
  },
  {
    id: "C005",
    name: "David Lee",
    position: "HR Manager",
    score: 90,
    experience: 7,
    education: "Bachelor's",
  },
];

export default function RecruitmentReport() {
  const [candidates] = useState<Candidate[]>(mockCandidates);
  const [filteredCandidates, setFilteredCandidates] =
    useState<Candidate[]>(mockCandidates);
  const [minScore, setMinScore] = useState<number>(0);
  const [selectedPosition, setSelectedPosition] = useState<string>("All");
  const [minExperience, setMinExperience] = useState<number>(0);
  const [selectedEducation, setSelectedEducation] = useState<string>("All");

  const applyFilters = () => {
    setFilteredCandidates(
      candidates.filter(
        (candidate) =>
          candidate.score >= minScore &&
          (selectedPosition === "All" ||
            candidate.position === selectedPosition) &&
          candidate.experience >= minExperience &&
          (selectedEducation === "All" ||
            candidate.education === selectedEducation)
      )
    );
  };

  const exportToPDF = () => {
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    // Create header
    const headerRow = document.createElement("tr");
    ["ID", "Name", "Position", "Score", "Experience", "Education"].forEach(
      (text) => {
        const th = document.createElement("th");
        th.textContent = text;
        headerRow.appendChild(th);
      }
    );
    thead.appendChild(headerRow);

    // Create body
    filteredCandidates.forEach((c) => {
      const row = document.createElement("tr");
      [c.id, c.name, c.position, c.score, c.experience, c.education].forEach(
        (text) => {
          const td = document.createElement("td");
          td.textContent = String(text);
          row.appendChild(td);
        }
      );
      tbody.appendChild(row);
    });

    table.appendChild(thead);
    table.appendChild(tbody);

    const style = document.createElement("style");
    style.textContent = `
      table { border-collapse: collapse; width: 100%; }
      th, td { border: 1px solid black; padding: 8px; text-align: left; }
      th { background-color: #f2f2f2; }
    `;

    const win = window.open("", "_blank");
    win!.document.write(
      "<html><head><title>Recruitment Report</title></head><body>"
    );
    win!.document.write("<h1>Recruitment Report</h1>");
    win!.document.head.appendChild(style);
    win!.document.body.appendChild(table);
    win!.document.write("</body></html>");
    win!.document.close();
    win!.print();
  };

  const exportToCSV = () => {
    const headers = [
      "ID",
      "Name",
      "Position",
      "Score",
      "Experience",
      "Education",
    ];
    const csvContent = [
      headers.join(","),
      ...filteredCandidates.map((c) =>
        [c.id, c.name, c.position, c.score, c.experience, c.education].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "recruitment-report.csv");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recruitment Report</CardTitle>
        <CardDescription>
          Generate and export reports on candidate performance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4 mb-4">
          <div>
            <label
              htmlFor="minScore"
              className="block text-sm font-medium text-white"
            >
              Minimum Score
            </label>
            <Input
              id="minScore"
              type="number"
              value={minScore}
              onChange={(e) => setMinScore(Number(e.target.value))}
              className="mt-1"
            />
          </div>
          <div>
            <label
              htmlFor="position"
              className="block text-sm font-medium text-white"
            >
              Position
            </label>
            <Select
              value={selectedPosition}
              onValueChange={setSelectedPosition}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Positions</SelectItem>
                <SelectItem value="Software Engineer">
                  Software Engineer
                </SelectItem>
                <SelectItem value="HR Manager">HR Manager</SelectItem>
                <SelectItem value="Marketing Specialist">
                  Marketing Specialist
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label
              htmlFor="minExperience"
              className="block text-sm font-medium text-white"
            >
              Minimum Experience (years)
            </label>
            <Input
              id="minExperience"
              type="number"
              value={minExperience}
              onChange={(e) => setMinExperience(Number(e.target.value))}
              className="mt-1"
            />
          </div>
          <div>
            <label
              htmlFor="education"
              className="block text-sm font-medium text-white"
            >
              Education
            </label>
            <Select
              value={selectedEducation}
              onValueChange={setSelectedEducation}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select education" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Education Levels</SelectItem>
                <SelectItem value="Bachelor's">Bachelors</SelectItem>
                <SelectItem value="Master's">Masters</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={applyFilters} className="mb-4">
          Apply Filters
        </Button>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Experience</TableHead>
              <TableHead>Education</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCandidates.map((candidate) => (
              <TableRow key={candidate.id}>
                <TableCell>{candidate.id}</TableCell>
                <TableCell>{candidate.name}</TableCell>
                <TableCell>{candidate.position}</TableCell>
                <TableCell>{candidate.score}</TableCell>
                <TableCell>{candidate.experience} years</TableCell>
                <TableCell>{candidate.education}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 space-x-2">
          <Button onClick={exportToPDF}>Export to PDF</Button>
          <Button onClick={exportToCSV}>Export to CSV</Button>
        </div>
      </CardContent>
    </Card>
  );
}
