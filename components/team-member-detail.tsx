"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { MessageSquare, Mail } from "lucide-react"

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

interface Task {
  id: string
  title: string
  status: "Done" | "In progress" | "Scheduled" | "To Do"
  priority: "High" | "Medium" | "Low"
}

export default function TeamMemberDetail({ member }: { member: TeamMember }) {
  const [open, setOpen] = useState(false)

  // Sample tasks for the team member
  const tasks: Task[] = [
    { id: "task-1", title: "Define Requirements for New Product", status: "Done", priority: "High" },
    { id: "task-2", title: "Market Research", status: "Done", priority: "Medium" },
    { id: "task-3", title: "Create Wireframe", status: "In progress", priority: "High" },
    { id: "task-4", title: "Interface Design & UX Discussion", status: "Scheduled", priority: "Medium" },
    { id: "task-5", title: "Competitor Research", status: "To Do", priority: "Medium" },
    { id: "task-6", title: "Create Presentation Deck", status: "To Do", priority: "Low" },
  ]

  // Sample performance data for the chart
  const performanceData = {
    weeks: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7"],
    memberData: [3, 4, 6, 3, 2, 5, 5],
    teamAverage: [5, 3, 3, 2, 3, 4, 3],
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open Employee B Profile
      </Button>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                  {member.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle className="text-2xl">{member.name}</DialogTitle>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="icon" variant="outline">
                <MessageSquare className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="outline">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="strengths">Strengths & Growth</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Weekly task completion rate</span>
                      <Badge>2025</Badge>
                    </div>
                    <div className="h-[200px] w-full bg-muted/30 rounded-md flex items-center justify-center">
                      <span className="text-muted-foreground text-sm">Performance Chart</span>
                    </div>
                    <div className="flex gap-4 text-sm">
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
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Current Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Done 40%</span>
                    </div>
                    <div className="space-y-3">
                      {tasks.slice(0, 4).map((task) => (
                        <div key={task.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(task.status)}`}></div>
                            <span className="text-sm">{task.title}</span>
                          </div>
                          <Badge variant="outline">{task.priority}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

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
                <CardTitle>All Tasks</CardTitle>
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

          <TabsContent value="strengths">
            <Card>
              <CardHeader>
                <CardTitle>Strengths & Growth Areas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Key Strengths</h3>
                    <div className="space-y-3">
                      {member.strengths.map((strength, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          <span>{strength}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-4">Growth Areas</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-muted-foreground"></div>
                        <span>Technical Discussions</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-muted-foreground"></div>
                        <span>Data-driven Decision Making</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
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
