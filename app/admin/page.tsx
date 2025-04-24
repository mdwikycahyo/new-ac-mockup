import type React from "react"
import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, FileCheck, Layers, PieChart, Plus, Users, Sparkles } from "lucide-react"
import Link from "next/link"
import { RecentAssessments } from "@/components/admin/recent-assessments"
import { ActiveAssessments } from "@/components/admin/active-assessments"

export const metadata: Metadata = {
  title: "Assessment Designer Dashboard",
  description: "Design and manage assessment scenarios",
}

export default function AdminDashboard() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assessment Designer</h1>
          <p className="text-muted-foreground">
            Create, configure and manage immersive, task-based assessment scenarios
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/scenarios2/create">
            <Plus className="mr-2 h-4 w-4" />
            Create New Scenario
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Participants"
          value="128"
          description="32 pending assessments"
          icon={<Users className="h-10 w-10 text-muted-foreground" />}
          href="/admin/participants"
        />
        <StatsCard
          title="Active Scenarios"
          value="12"
          description="4 scenarios created this month"
          icon={<Sparkles className="h-10 w-10 text-muted-foreground" />}
          href="/admin/scenarios2"
        />
        <StatsCard
          title="Completed Assessments"
          value="96"
          description="24 completed this month"
          icon={<FileCheck className="h-10 w-10 text-muted-foreground" />}
          href="/admin/reports"
        />
        <Card className="hover:border-primary/50 hover:shadow-sm">
          <Link href="/admin/scenarios2">
            <CardContent className="flex flex-col items-center justify-center px-6 py-8 text-center">
              <div className="rounded-full bg-primary/10 p-3 mb-3">
                <Layers className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium">Manage Scenarios</h3>
              <p className="text-sm text-muted-foreground mt-1">View and edit existing scenarios</p>
            </CardContent>
          </Link>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-3">
          <Tabs defaultValue="recent">
            <TabsList className="mb-2 w-full">
              <TabsTrigger value="recent" className="flex-1">
                Recent Scenarios
              </TabsTrigger>
              <TabsTrigger value="active" className="flex-1">
                Active Scenarios
              </TabsTrigger>
            </TabsList>
            <TabsContent value="recent">
              <RecentAssessments />
            </TabsContent>
            <TabsContent value="active">
              <ActiveAssessments />
            </TabsContent>
          </Tabs>
        </div>

        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Participant Activity</CardTitle>
            <CardDescription>Recent participant engagement with scenarios</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ActivityItem
                title="New Participants Added"
                description="12 participants added to Project Management Scenario"
                time="Just now"
                icon={<Users className="h-4 w-4" />}
              />
              <ActivityItem
                title="Scenario Completed"
                description="5 participants completed Customer Service Scenario"
                time="2 hours ago"
                icon={<FileCheck className="h-4 w-4" />}
              />
              <ActivityItem
                title="New Scenario Created"
                description="Technical Skills Scenario for Engineering"
                time="4 hours ago"
                icon={<Plus className="h-4 w-4" />}
              />
              <ActivityItem
                title="Scenario Modified"
                description="Updated rubric for Leadership Scenario"
                time="Yesterday"
                icon={<Layers className="h-4 w-4" />}
              />
              <ActivityItem
                title="Participant Progress"
                description="8 participants reached 50% completion in Business Acumen Scenario"
                time="Yesterday"
                icon={<BarChart3 className="h-4 w-4" />}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function StatsCard({
  title,
  value,
  description,
  icon,
  href,
}: {
  title: string
  value: string
  description: string
  icon: React.ReactNode
  href: string
}) {
  return (
    <Card className="hover:border-primary/50 hover:shadow-sm">
      <Link href={href}>
        <CardContent className="px-6 py-5">
          <div className="flex items-center justify-between space-x-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <p className="text-3xl font-bold">{value}</p>
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            </div>
            <div className="rounded-full p-2 bg-muted">{icon}</div>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}

function ActivityItem({
  title,
  description,
  time,
  icon,
}: {
  title: string
  description: string
  time: string
  icon: React.ReactNode
}) {
  return (
    <div className="flex items-start gap-4 rounded-md border p-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">{icon}</div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p className="font-medium">{title}</p>
          <p className="text-xs text-muted-foreground">{time}</p>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

function CompletionChart() {
  return (
    <div className="flex h-full w-full items-center justify-center text-muted-foreground">
      <BarChart3 className="mr-2 h-4 w-4" />
      Interactive completion chart showing participant completion rates by scenario type
    </div>
  )
}

function CategoryChart() {
  return (
    <div className="flex h-full w-full items-center justify-center text-muted-foreground">
      <PieChart className="mr-2 h-4 w-4" />
      Interactive pie chart showing performance across different scenario types
    </div>
  )
}
