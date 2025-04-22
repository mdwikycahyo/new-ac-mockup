import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Filter, ArrowUpDown, Download, Eye } from "lucide-react"
import Link from "next/link"

export default function CompletedAssessmentsPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Completed Assessments</h1>
          <p className="text-muted-foreground">View and analyze completed assessment results</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export Results
          </Button>
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search completed assessments..." className="pl-8" />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Completed Assessment Results</CardTitle>
          <CardDescription>View detailed results for completed assessments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {completedAssessments.map((assessment) => (
              <CompletedAssessmentItem key={assessment.id} assessment={assessment} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function CompletedAssessmentItem({ assessment }: { assessment: any }) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-4">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">{assessment.title}</h3>
          <div className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800">Completed</div>
        </div>
        <p className="text-sm text-muted-foreground">{assessment.description}</p>
        <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
          <span>Completed: {assessment.completed}</span>
          <span>Participants: {assessment.participants}</span>
          <span>Avg. Score: {assessment.avgScore}%</span>
          <span>Avg. Time: {assessment.avgTime} min</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/admin/completed/${assessment.id}`}>
            <Eye className="mr-2 h-4 w-4" /> View Results
          </Link>
        </Button>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" /> Export
        </Button>
      </div>
    </div>
  )
}

const completedAssessments = [
  {
    id: "1",
    title: "Project Management Assessment",
    description: "Evaluate project management skills through realistic scenarios",
    completed: "Apr 20, 2023",
    participants: 24,
    avgScore: 78,
    avgTime: 52,
  },
  {
    id: "2",
    title: "Leadership Skills Evaluation",
    description: "Assess leadership capabilities in team management scenarios",
    completed: "Apr 18, 2023",
    participants: 18,
    avgScore: 82,
    avgTime: 40,
  },
  {
    id: "3",
    title: "Technical Skills Assessment",
    description: "Evaluate technical problem-solving abilities",
    completed: "Apr 15, 2023",
    participants: 32,
    avgScore: 75,
    avgTime: 84,
  },
  {
    id: "4",
    title: "Communication Skills Assessment",
    description: "Evaluate written and verbal communication abilities",
    completed: "Mar 30, 2023",
    participants: 56,
    avgScore: 88,
    avgTime: 42,
  },
  {
    id: "5",
    title: "Problem-Solving Challenge",
    description: "Assess critical thinking and problem-solving skills",
    completed: "Mar 25, 2023",
    participants: 42,
    avgScore: 72,
    avgTime: 58,
  },
]
