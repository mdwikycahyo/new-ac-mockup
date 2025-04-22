import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Clock, Download, User } from "lucide-react"
import Link from "next/link"

export function ParticipantReportList() {
  return (
    <div className="rounded-lg border">
      <div className="relative w-full overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Participant</TableHead>
              <TableHead>Assessment</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Time Spent</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participantReports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium">{report.name}</TableCell>
                <TableCell>{report.assessment}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <div className="mr-2 h-2 w-16 rounded-full bg-muted">
                      <div
                        className={`h-full rounded-full ${getScoreColor(report.score)}`}
                        style={{ width: `${report.score}%` }}
                      ></div>
                    </div>
                    <span>{report.score}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    <span>{report.timeSpent}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/admin/reports/participant/${report.id}`}>
                      <User className="mr-1 h-3.5 w-3.5" />
                      <span className="sr-only">View Profile</span>
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

function getScoreColor(score: number) {
  if (score >= 80) return "bg-green-500"
  if (score >= 60) return "bg-yellow-500"
  return "bg-red-500"
}

const participantReports = [
  {
    id: "1",
    name: "Alex Johnson",
    assessment: "Leadership Assessment",
    score: 85,
    timeSpent: "58 min",
  },
  {
    id: "2",
    name: "Sarah Williams",
    assessment: "Technical Skills",
    score: 72,
    timeSpent: "45 min",
  },
  {
    id: "3",
    name: "Michael Brown",
    assessment: "Project Management",
    score: 90,
    timeSpent: "62 min",
  },
  {
    id: "4",
    name: "Emily Davis",
    assessment: "Customer Service",
    score: 68,
    timeSpent: "37 min",
  },
  {
    id: "5",
    name: "James Wilson",
    assessment: "Communication Skills",
    score: 75,
    timeSpent: "42 min",
  },
]
