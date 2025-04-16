import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Calendar, BarChart2, Play, Pause, RotateCcw, CheckCircle } from "lucide-react"

export default function TimePage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Time Management</h1>
        <p className="text-muted-foreground">Track and manage your assessment time</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Current Session</CardTitle>
            <CardDescription>Track your active work session</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="mb-4 text-6xl font-bold">01:23:45</div>
              <div className="mb-4 flex gap-2">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  <Play className="mr-2 h-4 w-4" /> Start
                </Button>
                <Button size="lg" variant="outline">
                  <Pause className="mr-2 h-4 w-4" /> Pause
                </Button>
                <Button size="lg" variant="outline">
                  <RotateCcw className="mr-2 h-4 w-4" /> Reset
                </Button>
              </div>
              <div className="w-full">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium">Session Progress</span>
                  <span className="text-sm text-muted-foreground">65%</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Today's Activity</CardTitle>
            <CardDescription>Time spent on different tasks today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm font-medium">Email Tasks</span>
                  <span className="text-sm text-muted-foreground">45 min</span>
                </div>
                <Progress value={30} className="h-2" />
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm font-medium">Document Review</span>
                  <span className="text-sm text-muted-foreground">30 min</span>
                </div>
                <Progress value={20} className="h-2" />
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm font-medium">Conference Call</span>
                  <span className="text-sm text-muted-foreground">15 min</span>
                </div>
                <Progress value={10} className="h-2" />
              </div>
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm font-medium">Task Management</span>
                  <span className="text-sm text-muted-foreground">60 min</span>
                </div>
                <Progress value={40} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Time Summary</CardTitle>
            <CardDescription>Overview of your assessment time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
                  <span>Total Time Today</span>
                </div>
                <span className="font-medium">2h 30m</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
                  <span>Total Assessment Time</span>
                </div>
                <span className="font-medium">8h 15m</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <BarChart2 className="mr-2 h-5 w-5 text-muted-foreground" />
                  <span>Estimated Remaining</span>
                </div>
                <span className="font-medium">45m</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  <span>Tasks Completed</span>
                </div>
                <span className="font-medium">6/10</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Tabs defaultValue="daily">
          <TabsList>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="tasks">By Task</TabsTrigger>
          </TabsList>
          <TabsContent value="daily" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Daily Time Log</CardTitle>
                <CardDescription>Detailed breakdown of your daily activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {timeEntries.map((entry) => (
                    <div key={entry.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div>
                        <h3 className="font-medium">{entry.task}</h3>
                        <p className="text-sm text-muted-foreground">{entry.time}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{entry.duration}</p>
                        <p className="text-sm text-muted-foreground">{entry.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="weekly" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Overview</CardTitle>
                <CardDescription>Time spent throughout the week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <div className="flex h-full items-end justify-between gap-2">
                    {weeklyData.map((day) => (
                      <div key={day.day} className="flex flex-1 flex-col items-center">
                        <div className="w-full rounded-t-md bg-primary" style={{ height: `${day.percentage}%` }}></div>
                        <div className="mt-2 text-sm">{day.day}</div>
                        <div className="text-xs text-muted-foreground">{day.hours}h</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="tasks" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Time by Task Type</CardTitle>
                <CardDescription>Distribution of time across different activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {taskCategories.map((category) => (
                    <div key={category.name}>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-sm font-medium">{category.name}</span>
                        <span className="text-sm text-muted-foreground">{category.hours} hours</span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${category.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

const timeEntries = [
  {
    id: 1,
    task: "Email Response to Project Manager",
    time: "Today, 9:30 AM - 10:15 AM",
    duration: "45 min",
    status: "Completed",
  },
  {
    id: 2,
    task: "Document Review: Quarterly Report",
    time: "Today, 10:30 AM - 11:00 AM",
    duration: "30 min",
    status: "Completed",
  },
  {
    id: 3,
    task: "Conference Call: Team Meeting",
    time: "Today, 11:15 AM - 11:30 AM",
    duration: "15 min",
    status: "Completed",
  },
  {
    id: 4,
    task: "Task Management: Update Project Timeline",
    time: "Today, 1:00 PM - 2:00 PM",
    duration: "1 hour",
    status: "Completed",
  },
  {
    id: 5,
    task: "Current Session: Information Portal Research",
    time: "Today, 2:15 PM - Present",
    duration: "1h 23m",
    status: "In Progress",
  },
]

const weeklyData = [
  { day: "Mon", hours: 2.5, percentage: 50 },
  { day: "Tue", hours: 3.0, percentage: 60 },
  { day: "Wed", hours: 2.0, percentage: 40 },
  { day: "Thu", hours: 4.0, percentage: 80 },
  { day: "Fri", hours: 2.5, percentage: 50 },
  { day: "Sat", hours: 0.5, percentage: 10 },
  { day: "Sun", hours: 0, percentage: 0 },
]

const taskCategories = [
  { name: "Email Tasks", hours: 3.5, percentage: 35 },
  { name: "Document Work", hours: 2.0, percentage: 20 },
  { name: "Meetings & Calls", hours: 1.5, percentage: 15 },
  { name: "Task Management", hours: 2.0, percentage: 20 },
  { name: "Information Research", hours: 1.0, percentage: 10 },
]
