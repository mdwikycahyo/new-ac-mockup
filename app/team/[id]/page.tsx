import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Mail, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function TeamMemberPage({ params }: { params: { id: string } }) {
  // Find the team member by ID
  const member = teamMembers.find((m) => m.id === params.id) || teamMembers[0]

  // Sample tasks for the team member
  const tasks = [
    { id: "task-1", title: "Define Requirements for New Product", status: "Done", priority: "High" },
    { id: "task-2", title: "Market Research", status: "Done", priority: "Medium" },
    { id: "task-3", title: "Create Wireframe", status: "In progress", priority: "High" },
    { id: "task-4", title: "Interface Design & UX Discussion", status: "Scheduled", priority: "Medium" },
    { id: "task-5", title: "Competitor Research", status: "To Do", priority: "Medium" },
    { id: "task-6", title: "Create Presentation Deck", status: "To Do", priority: "Low" },
  ]

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" asChild>
          <Link href="/team">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Team Member Profile</h1>
      </div>

      <div className="flex flex-col md:flex-row items-start gap-6">
        <Card className="w-full md:w-80">
          <CardHeader>
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {member.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl">{member.name}</CardTitle>
              <p className="text-muted-foreground">{member.role}</p>
              <p className="text-sm text-muted-foreground mt-1">{member.department}</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <Button variant="outline" className="w-[48%]" size="sm">
                <Mail className="mr-2 h-4 w-4" />
                Message
              </Button>
              <Button variant="outline" className="w-[48%]" size="sm">
                <MessageSquare className="mr-2 h-4 w-4" />
                Chat
              </Button>
            </div>

            <div className="space-y-3 pt-4">
              <div className="flex justify-between text-sm">
                <span>Performance Trend</span>
                <Badge
                  variant={
                    member.performanceTrend === "Up"
                      ? "success"
                      : member.performanceTrend === "Down"
                        ? "destructive"
                        : "secondary"
                  }
                >
                  {member.performanceTrend}
                </Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Workload Balance</span>
                <Badge
                  variant={
                    member.workload === "Balance"
                      ? "success"
                      : member.workload === "Overload"
                        ? "destructive"
                        : "secondary"
                  }
                >
                  {member.workload}
                </Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Task Completion</span>
                <span className="font-medium">{member.taskCompletion}%</span>
              </div>
              <Progress value={member.taskCompletion} className="h-2" />
            </div>

            <div className="pt-4">
              <h3 className="text-sm font-medium mb-2">Current Projects</h3>
              <div className="flex flex-wrap gap-2">
                {member.projects.map((project, index) => (
                  <Badge key={index} variant="outline">
                    {project}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <h3 className="text-sm font-medium mb-2">Key Strengths</h3>
              <div className="flex flex-wrap gap-2">
                {member.strengths.map((strength, index) => (
                  <Badge key={index} variant="outline" className="bg-primary/10">
                    {strength}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex-1">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>Key Strengths & Growth Areas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Core competencies and areas for improvements</h3>
                      <div className="h-[200px] w-full bg-muted/30 rounded-md flex items-center justify-center">
                        <span className="text-muted-foreground text-sm">Strengths Radar Chart</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2">Who They Are at Work</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Coming from marketing, they understand how people think and interact with products, making them
                        strong in UX-driven decisions. Naturally collaborative, they navigate discussions with ease,
                        aligning teams around user-first solutions. Their communication is engaging, often focused on
                        narrative and persuasion, but can lack depth in technical discussions.
                      </p>
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Adaptability</span>
                            <span>90%</span>
                          </div>
                          <Progress value={90} className="h-2" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Growth Mindset</span>
                            <span>60%</span>
                          </div>
                          <Progress value={60} className="h-2" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Engagement Level</span>
                            <span>85%</span>
                          </div>
                          <Progress value={85} className="h-2" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Influence Level</span>
                            <span>40%</span>
                          </div>
                          <Progress value={40} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tasks">
              <Card>
                <CardHeader>
                  <CardTitle>Current Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tasks.map((task) => (
                      <div key={task.id} className="flex items-center justify-between border-b pb-2">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(task.status)}`}></div>
                          <div>
                            <p className="font-medium">{task.title}</p>
                            <p className="text-sm text-muted-foreground">{task.status}</p>
                          </div>
                        </div>
                        <Badge variant={getPriorityVariant(task.priority)}>{task.priority}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Weekly task completion rate</h3>
                      <div className="h-[250px] w-full bg-muted/30 rounded-md flex items-center justify-center">
                        <span className="text-muted-foreground text-sm">Performance Chart</span>
                      </div>
                      <div className="flex gap-4 text-sm mt-2">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-primary"></div>
                          <span>Team Member {member.name.charAt(0)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-muted-foreground"></div>
                          <span>Team Average</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader className="p-4">
                          <CardTitle className="text-sm">Task Completion</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="text-2xl font-bold">{member.taskCompletion}%</div>
                          <Progress value={member.taskCompletion} className="h-2 mt-2" />
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="p-4">
                          <CardTitle className="text-sm">On-time Delivery</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="text-2xl font-bold">85%</div>
                          <Progress value={85} className="h-2 mt-2" />
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="p-4">
                          <CardTitle className="text-sm">Quality Score</CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="text-2xl font-bold">92%</div>
                          <Progress value={92} className="h-2 mt-2" />
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

function getStatusColor(status: string) {
  switch (status) {
    case "Done":
      return "bg-green-500"
    case "In progress":
      return "bg-yellow-500"
    case "Scheduled":
      return "bg-blue-500"
    case "To Do":
      return "bg-gray-500"
    default:
      return "bg-gray-500"
  }
}

function getPriorityVariant(priority: string) {
  switch (priority) {
    case "High":
      return "destructive"
    case "Medium":
      return "secondary"
    case "Low":
      return "outline"
    default:
      return "outline"
  }
}

// Sample data
interface TeamMember {
  id: string
  name: string
  role: string
  department: string
  performanceTrend: "Up" | "Down" | "Neutral"
  workload: "Balance" | "Overload" | "Underload"
  strengths: string[]
  taskCompletion: number
  projects: string[]
}

const teamMembers: TeamMember[] = [
  {
    id: "employee-a",
    name: "Employee A",
    role: "Senior Software Engineer",
    department: "Engineering",
    performanceTrend: "Neutral",
    workload: "Balance",
    strengths: ["Prioritization", "Communicating Ideas"],
    taskCompletion: 85,
    projects: ["New Product", "Legacy Maintenance"],
  },
  {
    id: "employee-b",
    name: "Employee B",
    role: "Junior Product Manager",
    department: "Product",
    performanceTrend: "Up",
    workload: "Overload",
    strengths: ["UX Research", "Technical Knowledge"],
    taskCompletion: 70,
    projects: ["New Product"],
  },
  {
    id: "employee-c",
    name: "Employee C",
    role: "Product Manager",
    department: "Product",
    performanceTrend: "Down",
    workload: "Underload",
    strengths: ["Communicating Ideas", "Technical Knowledge"],
    taskCompletion: 60,
    projects: ["Market Analysis"],
  },
  {
    id: "employee-d",
    name: "Employee D",
    role: "UX Designer",
    department: "Design",
    performanceTrend: "Up",
    workload: "Balance",
    strengths: ["Visual Design", "User Research"],
    taskCompletion: 90,
    projects: ["New Product", "Website Redesign"],
  },
  {
    id: "employee-e",
    name: "Employee E",
    role: "Frontend Developer",
    department: "Engineering",
    performanceTrend: "Neutral",
    workload: "Balance",
    strengths: ["React", "Accessibility"],
    taskCompletion: 75,
    projects: ["Website Redesign"],
  },
  {
    id: "employee-f",
    name: "Employee F",
    role: "Backend Developer",
    department: "Engineering",
    performanceTrend: "Up",
    workload: "Overload",
    strengths: ["Database Design", "API Development"],
    taskCompletion: 80,
    projects: ["New Product", "Legacy Maintenance"],
  },
]
