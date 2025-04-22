import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpDown, BarChart, Download, Filter, LineChart, PieChart, Search, Share, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { AssessmentReportList } from "@/components/admin/assessment-report-list"
import { ParticipantReportList } from "@/components/admin/participant-report-list"

export const metadata: Metadata = {
  title: "Assessment Reports",
  description: "View and analyze assessment results",
}

export default function ReportsPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          </div>
          <p className="text-muted-foreground">View and analyze assessment performance and participant results</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="w-10 p-0">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="w-10 p-0">
            <Share className="h-4 w-4" />
          </Button>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search reports..." className="w-full pl-8" />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Assessment Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">↑ 12%</span> from previous month
            </p>
            <div className="mt-4 h-2 w-full rounded-full bg-muted">
              <div className="h-full w-[78%] rounded-full bg-primary"></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Average Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">72/100</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-500">↓ 3%</span> from previous month
            </p>
            <div className="mt-4 h-2 w-full rounded-full bg-muted">
              <div className="h-full w-[72%] rounded-full bg-primary"></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Total Assessments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">Across 8 assessment types</p>
            <div className="mt-4 flex h-8 items-end gap-1">
              <div className="w-1/5 rounded-t bg-primary h-4" title="Type 1"></div>
              <div className="w-1/5 rounded-t bg-primary h-8" title="Type 2"></div>
              <div className="w-1/5 rounded-t bg-primary h-6" title="Type 3"></div>
              <div className="w-1/5 rounded-t bg-primary h-5" title="Type 4"></div>
              <div className="w-1/5 rounded-t bg-primary h-3" title="Others"></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Participants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500">↑ 24</span> new this month
            </p>
            <div className="mt-4 flex items-center gap-2">
              <Badge variant="secondary" className="rounded-sm">
                32 Active
              </Badge>
              <Badge variant="secondary" className="rounded-sm">
                96 Completed
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Performance Trends</CardTitle>
            <CardDescription>Average scores over time by assessment type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                <LineChart className="mr-2 h-4 w-4" />
                Interactive line chart showing performance trends over time
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Score Distribution</CardTitle>
            <CardDescription>Distribution of scores across all assessments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                <BarChart className="mr-2 h-4 w-4" />
                Interactive histogram showing score distribution
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Competency Breakdown</CardTitle>
            <CardDescription>Average performance across competency areas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                <PieChart className="mr-2 h-4 w-4" />
                Interactive radar chart showing competency breakdown
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-4">
          <Tabs defaultValue="assessments">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="assessments">
                <ArrowUpDown className="mr-2 h-4 w-4" /> Assessment Reports
              </TabsTrigger>
              <TabsTrigger value="participants">
                <Users className="mr-2 h-4 w-4" /> Participant Reports
              </TabsTrigger>
            </TabsList>
            <TabsContent value="assessments" className="mt-4">
              <AssessmentReportList />
            </TabsContent>
            <TabsContent value="participants" className="mt-4">
              <ParticipantReportList />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
