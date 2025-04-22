import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BarChart, Download } from "lucide-react"
import Link from "next/link"

export function AssessmentReportList() {
  return (
    <div className="rounded-lg border">
      <div className="relative w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Assessment Name</TableHead>
              <TableHead>Participants</TableHead>
              <TableHead>Avg. Score</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assessmentReports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium">{report.name}</TableCell>
                <TableCell>{report.participants}</TableCell>
                <TableCell>{report.avgScore}/100</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusStyles(report.status)}>
                    {report.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/admin/reports/assessment/${report.id}`}>
                      <BarChart className="mr-1 h-3.5 w-3.5" />
                      <span className="sr-only">View Report</span>
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-3.5 w-3.5" />
                    <span className="sr-only">Download</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function getStatusStyles(status: string) {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "Completed":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    case "Archived":
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    default:
      return ""
  }
}

const assessmentReports = [
  {
    id: "1",
    name: "Leadership Assessment",
    participants: "32/40",
    avgScore: 78,
    status: "Active",
  },
  {
    id: "2",
    name: "Technical Skills Assessment",
    participants: "18/20",
    avgScore: 72,
    status: "Completed",
  },
  {
    id: "3",
    name: "Customer Service Skills",
    participants: "24/30",
    avgScore: 85,
    status: "Active",
  },
  {
    id: "4",
    name: "Project Management Assessment",
    participants: "15/15",
    avgScore: 76,
    status: "Completed",
  },
  {
    id: "5",
    name: "Communication Skills",
    participants: "12/25",
    avgScore: 68,
    status: "Active",
  },
]
