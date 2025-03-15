import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

interface ScheduledReport {
  id: string;
  title: string;
  frequency: "daily" | "weekly" | "monthly";
  format: "PDF" | "Excel";
}

export default function ReportScheduler() {
  const [scheduledReports, setScheduledReports] = useState<ScheduledReport[]>([]);
  const [frequency, setFrequency] = useState("daily");
  const [format, setFormat] = useState("PDF");

  const scheduleReport = () => {
    const newReport: ScheduledReport = {
      id: `REP-${scheduledReports.length + 1}`,
      title: `Scheduled Report #${scheduledReports.length + 1}`,
      frequency,
      format: format as "PDF" | "Excel",
    };
    setScheduledReports([...scheduledReports, newReport]);
    toast({ title: "Report Scheduled", description: `A ${frequency} report has been scheduled.` });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      scheduledReports.forEach((report) => {
        toast({
          title: "Report Generated",
          description: `${report.title} (${report.format}) has been generated.`,
        });
      });
    }, 10000); // Simulated interval (10s for testing, change as needed)
    return () => clearInterval(interval);
  }, [scheduledReports]);

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Schedule Report</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule a Report</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Select value={frequency} onValueChange={setFrequency}>
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger>
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PDF">PDF</SelectItem>
                <SelectItem value="Excel">Excel</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={scheduleReport}>Confirm</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
