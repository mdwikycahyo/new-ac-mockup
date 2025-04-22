import { Card } from "@/components/ui/card"
import { FileText, Clock, Users, BarChart2 } from "lucide-react"
import Link from "next/link"

export function RecentAssessments() {
  return (
    <div className="space-y-4">
      {recentAssessments.map((assessment) => (
        <Card key={assessment.id} className="hover:border-primary/50 hover:shadow-sm">
          <Link href={`/admin/assessments/${assessment.id}`}>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{assessment.title}</h3>
                <span className="text-xs text-muted-foreground">{assessment.lastModified}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{assessment.description}</p>
              <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center">
                  <Clock className="mr-1 h-3.5 w-3.5" />
                  {assessment.duration} min
                </div>
                <div className="flex items-center">
                  <FileText className="mr-1 h-3.5 w-3.5" />
                  {assessment.tasks} tasks
                </div>
                <div className="flex items-center">
                  <Users className="mr-1 h-3.5 w-3.5" />
                  {assessment.participants} participants
                </div>
                <div className="flex items-center">
                  <BarChart2 className="mr-1 h-3.5 w-3.5" />
                  {assessment.avgScore}% avg. score
                </div>
              </div>
            </div>
          </Link>
        </Card>
      ))}
    </div>
  )
}

const recentAssessments = [
  {
    id: "1",
    title: "Project Management Assessment",
    description: "Evaluate project management skills through realistic scenarios",
    lastModified: "2 hours ago",
    duration: 60,
    tasks: 8,
    participants: 24,
    avgScore: 78,
  },
  {
    id: "2",
    title: "Leadership Skills Evaluation",
    description: "Assess leadership capabilities in team management scenarios",
    lastModified: "Yesterday",
    duration: 45,
    tasks: 6,
    participants: 18,
    avgScore: 82,
  },
  {
    id: "3",
    title: "Technical Skills Assessment",
    description: "Evaluate technical problem-solving abilities",
    lastModified: "3 days ago",
    duration: 90,
    tasks: 12,
    participants: 32,
    avgScore: 75,
  },
]
