import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { PlusCircle, Search, Filter, ArrowUpDown, MoreHorizontal } from "lucide-react"
import Link from "next/link"

export default function AssessmentsPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assessments</h1>
          <p className="text-muted-foreground">Manage your assessment scenarios</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/admin/scenario/new">
              <PlusCircle className="mr-2 h-4 w-4" /> Create New Assessment
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="mb-4 grid w-full grid-cols-4">
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
          <TabsTrigger value="all">All Assessments</TabsTrigger>
        </TabsList>

        <div className="mb-4 flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search assessments..." className="pl-8" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>

        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Active Assessments</CardTitle>
              <CardDescription>Assessments currently available to participants</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeAssessments.map((assessment) => (
                  <AssessmentItem key={assessment.id} assessment={assessment} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="draft">
          <Card>
            <CardHeader>
              <CardTitle>Draft Assessments</CardTitle>
              <CardDescription>Assessments in progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {draftAssessments.map((assessment) => (
                  <AssessmentItem key={assessment.id} assessment={assessment} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="archived">
          <Card>
            <CardHeader>
              <CardTitle>Archived Assessments</CardTitle>
              <CardDescription>Assessments no longer in use</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {archivedAssessments.map((assessment) => (
                  <AssessmentItem key={assessment.id} assessment={assessment} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Assessments</CardTitle>
              <CardDescription>View all assessments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...activeAssessments, ...draftAssessments, ...archivedAssessments].map((assessment) => (
                  <AssessmentItem key={assessment.id} assessment={assessment} />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function AssessmentItem({ assessment }: { assessment: any }) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-4">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">{assessment.title}</h3>
          <div
            className={`rounded-full px-2 py-0.5 text-xs ${
              assessment.status === "active"
                ? "bg-green-100 text-green-800"
                : assessment.status === "draft"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-gray-100 text-gray-800"
            }`}
          >
            {assessment.status}
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{assessment.description}</p>
        <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
          <span>Created: {assessment.created}</span>
          <span>Duration: {assessment.duration} min</span>
          <span>Participants: {assessment.participants}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/admin/assessments/${assessment.id}`}>Edit</Link>
        </Button>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

const activeAssessments = [
  {
    id: "1",
    title: "Project Management Assessment",
    description: "Evaluate project management skills through realistic scenarios",
    status: "active",
    created: "Apr 15, 2023",
    duration: 60,
    participants: 24,
  },
  {
    id: "2",
    title: "Leadership Skills Evaluation",
    description: "Assess leadership capabilities in team management scenarios",
    status: "active",
    created: "Apr 10, 2023",
    duration: 45,
    participants: 18,
  },
  {
    id: "3",
    title: "Technical Skills Assessment",
    description: "Evaluate technical problem-solving abilities",
    status: "active",
    created: "Apr 5, 2023",
    duration: 90,
    participants: 32,
  },
]

const draftAssessments = [
  {
    id: "4",
    title: "Customer Service Simulation",
    description: "Evaluate customer service skills through realistic scenarios",
    status: "draft",
    created: "Apr 2, 2023",
    duration: 30,
    participants: 0,
  },
  {
    id: "5",
    title: "Data Analysis Challenge",
    description: "Assess data analysis and interpretation skills",
    status: "draft",
    created: "Mar 28, 2023",
    duration: 75,
    participants: 0,
  },
]

const archivedAssessments = [
  {
    id: "6",
    title: "Communication Skills Assessment",
    description: "Evaluate written and verbal communication abilities",
    status: "archived",
    created: "Feb 15, 2023",
    duration: 45,
    participants: 56,
  },
  {
    id: "7",
    title: "Problem-Solving Challenge",
    description: "Assess critical thinking and problem-solving skills",
    status: "archived",
    created: "Jan 20, 2023",
    duration: 60,
    participants: 42,
  },
]
