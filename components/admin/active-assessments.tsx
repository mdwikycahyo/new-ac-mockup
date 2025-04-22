import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Clock, Users } from "lucide-react"
import Link from "next/link"

export function ActiveAssessments() {
  return (
    <div className="space-y-4">
      {activeAssessments.map((assessment) => (
        <Card key={assessment.id} className="hover:border-primary/50 hover:shadow-sm">
          <Link href={`/admin/assessments/${assessment.id}`}>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{assessment.title}</h3>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    assessment.status === "In Progress"
                      ? "bg-blue-100 text-blue-800"
                      : assessment.status === "Starting Soon"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                  }`}
                >
                  {assessment.status}
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <Clock className="mr-1 h-3.5 w-3.5" />
                    {assessment.timeRemaining}
                  </div>
                  <div className="flex items-center">
                    <Users className="mr-1 h-3.5 w-3.5" />
                    {assessment.participantsActive}/{assessment.participantsTotal} active
                  </div>
                </div>
                <div>{assessment.completionRate}% completed</div>
              </div>
              <Progress value={assessment.completionRate} className="mt-2 h-1.5" />
            </div>
          </Link>
        </Card>
      ))}
    </div>
  )
}

const activeAssessments = [
  {
    id: "1",
    title: "Project Management Assessment",
    status: "In Progress",
    timeRemaining: "4h 30m remaining",
    participantsActive: 18,
    participantsTotal: 24,
    completionRate: 75,
  },
  {
    id: "2",
    title: "Leadership Skills Evaluation",
    status: "Starting Soon",
    timeRemaining: "Starts in 2h",
    participantsActive: 0,
    participantsTotal: 18,
    completionRate: 0,
  },
  {
    id: "3",
    title: "Technical Skills Assessment",
    status: "Ending Soon",
    timeRemaining: "30m remaining",
    participantsActive: 28,
    participantsTotal: 32,
    completionRate: 88,
  },
]
