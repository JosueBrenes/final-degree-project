"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface Application {
  id: string;
  applicant: string;
  position: string;
  vacancyId: string;
  status: string;
  appliedDate: string;
}

export interface Interview {
  id: string;
  applicationId: string;
  dateTime: string;
  interviewer: string;
  location: string;
  status: string;
}

interface InterviewSchedulerProps {
  applications: Application[];
  scheduledInterviews: Interview[];
  onInterviewScheduled: (interview: Interview) => void;
}

const InterviewScheduler: React.FC<InterviewSchedulerProps> = ({
  applications,
  scheduledInterviews,
}) => {
  return (
    <>
      <div className="space-y-6">
        {/* Scheduled Interviews Table */}
        <Card>
          <CardHeader>
            <CardTitle>Scheduled Interviews</CardTitle>
            <CardDescription>
              View and manage upcoming interviews with candidates.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Interview ID</TableHead>
                  <TableHead>Applicant</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Interviewer</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scheduledInterviews
                  .sort(
                    (a, b) =>
                      new Date(a.dateTime).getTime() -
                      new Date(b.dateTime).getTime()
                  )
                  .map((interview) => {
                    const application = applications.find(
                      (app) => app.id === interview.applicationId
                    );
                    return (
                      <TableRow key={interview.id}>
                        <TableCell>{interview.id}</TableCell>
                        <TableCell>{application?.applicant}</TableCell>
                        <TableCell>{application?.position}</TableCell>
                        <TableCell>
                          {new Date(interview.dateTime).toLocaleString()}
                        </TableCell>{" "}
                        {/* Mostrar en formato local */}
                        <TableCell>{interview.interviewer}</TableCell>
                        <TableCell>{interview.location}</TableCell>
                        <TableCell>{interview.status}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default InterviewScheduler;
