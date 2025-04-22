import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Users, Clock, Star, Copy } from "lucide-react"
import Link from "next/link"

export function ScenarioTemplates() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {templates.map((template) => (
        <Card key={template.id} className="overflow-hidden">
          <div className="h-3 bg-primary" />
          <div className="p-6">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="font-medium">{template.title}</h3>
                <p className="text-sm text-muted-foreground">{template.description}</p>
              </div>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < template.rating ? "fill-yellow-400 text-yellow-400" : "text-muted"}`}
                  />
                ))}
              </div>
            </div>
            <div className="mb-4 flex flex-wrap gap-2">
              {template.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mb-4 flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center">
                <FileText className="mr-1 h-3.5 w-3.5" />
                {template.tasks} tasks
              </div>
              <div className="flex items-center">
                <Clock className="mr-1 h-3.5 w-3.5" />
                {template.duration} min
              </div>
              <div className="flex items-center">
                <Users className="mr-1 h-3.5 w-3.5" />
                {template.usedBy} uses
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" asChild>
                <Link href={`/admin/templates/${template.id}`}>Preview</Link>
              </Button>
              <Button className="flex-1" asChild>
                <Link href={`/admin/scenario/new?template=${template.id}`}>
                  <Copy className="mr-2 h-4 w-4" /> Use Template
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

const templates = [
  {
    id: "1",
    title: "Project Management Assessment",
    description: "Evaluate project management skills through realistic scenarios",
    rating: 4,
    tags: ["Project Management", "Leadership", "Time Management"],
    tasks: 8,
    duration: 60,
    usedBy: 124,
  },
  {
    id: "2",
    title: "Leadership Skills Evaluation",
    description: "Assess leadership capabilities in team management scenarios",
    rating: 5,
    tags: ["Leadership", "Communication", "Decision Making"],
    tasks: 6,
    duration: 45,
    usedBy: 98,
  },
  {
    id: "3",
    title: "Technical Skills Assessment",
    description: "Evaluate technical problem-solving abilities",
    rating: 4,
    tags: ["Technical", "Problem Solving", "Analytical"],
    tasks: 12,
    duration: 90,
    usedBy: 156,
  },
  {
    id: "4",
    title: "Customer Service Simulation",
    description: "Evaluate customer service skills through realistic scenarios",
    rating: 4,
    tags: ["Customer Service", "Communication", "Problem Solving"],
    tasks: 10,
    duration: 60,
    usedBy: 87,
  },
  {
    id: "5",
    title: "Data Analysis Challenge",
    description: "Assess data analysis and interpretation skills",
    rating: 5,
    tags: ["Data Analysis", "Critical Thinking", "Decision Making"],
    tasks: 8,
    duration: 75,
    usedBy: 112,
  },
  {
    id: "6",
    title: "Communication Skills Assessment",
    description: "Evaluate written and verbal communication abilities",
    rating: 4,
    tags: ["Communication", "Writing", "Presentation"],
    tasks: 7,
    duration: 45,
    usedBy: 143,
  },
]
