import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Search, Plus, Edit, Copy, Clock, CheckCircle } from "lucide-react"

// Mock data for scenario cards
const scenarios = [
  {
    id: 1,
    title: "Marketing Campaign Management",
    description: "Assess ability to plan and execute a product launch marketing campaign",
    competencies: ["Problem Solving", "Customer Orientation", "Disciplined Execution"],
    lastModified: "2023-11-15",
    image: "/placeholder.svg?height=100&width=200",
    tasks: 5,
    duration: 60,
    status: "published",
  },
  {
    id: 2,
    title: "Customer Service Crisis",
    description: "Handle multiple customer complaints while maintaining service standards",
    competencies: ["Problem Solving", "Customer Orientation", "Establish Collaboration"],
    lastModified: "2023-11-10",
    image: "/placeholder.svg?height=100&width=200",
    tasks: 4,
    duration: 45,
    status: "draft",
  },
  {
    id: 3,
    title: "Financial Analysis & Reporting",
    description: "Analyze financial data and prepare executive summary reports",
    competencies: ["Business Acumen", "Technology Savvy", "Continuous Improvement"],
    lastModified: "2023-11-05",
    image: "/placeholder.svg?height=100&width=200",
    tasks: 6,
    duration: 75,
    status: "published",
  },
  {
    id: 4,
    title: "Team Conflict Resolution",
    description: "Navigate and resolve interpersonal conflicts within a project team",
    competencies: ["Coaching for Performance", "Establish Collaboration", "Problem Solving"],
    lastModified: "2023-10-28",
    image: "/placeholder.svg?height=100&width=200",
    tasks: 3,
    duration: 30,
    status: "draft",
  },
]

export default function ScenariosDashboard() {
  return (
    <div className="container mx-auto max-w-6xl space-y-6 px-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Assessment Scenarios</h1>
        <Button asChild>
          <Link href="/admin/scenarios2/create">
            <Plus className="mr-2 h-4 w-4" />
            Create New Scenario
          </Link>
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search scenarios..." className="pl-10" />
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold">Scenario Library</h2>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {scenarios.map((scenario) => (
            <Card key={scenario.id} className="overflow-hidden">
              <img
                src={scenario.image || "/placeholder.svg"}
                alt={scenario.title}
                className="h-40 w-full object-cover"
              />
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold">{scenario.title}</h3>
                  {scenario.status === "published" && (
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Published
                    </Badge>
                  )}
                  {scenario.status === "draft" && (
                    <Badge variant="outline" className="text-muted-foreground">
                      Draft
                    </Badge>
                  )}
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{scenario.description}</p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {scenario.competencies.map((competency) => (
                    <Badge key={competency} variant="outline">
                      {competency}
                    </Badge>
                  ))}
                </div>

                <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {scenario.duration} min
                  </div>
                  <div>
                    {scenario.tasks} {scenario.tasks === 1 ? "task" : "tasks"}
                  </div>
                  <div>Modified: {scenario.lastModified}</div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 border-t p-4">
                <Button size="sm" variant="outline">
                  <Copy className="mr-2 h-4 w-4" />
                  Duplicate
                </Button>
                <Button size="sm">
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
