import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Mail, MessageSquare, Calendar, CheckSquare, FolderOpen, AlertCircle } from "lucide-react"
import Link from "next/link"
import { NotificationCenter } from "@/components/notification-center"
import { Button } from "@/components/ui/button"

export default function Dashboard() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome, Participant</h1>
          <p className="text-muted-foreground">
            Your workplace assessment is in progress. Complete the tasks to continue.
          </p>
        </div>
        <NotificationCenter />
      </div>

      {/* First-time user welcome card */}
      <Card className="mb-8 border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-blue-500" />
            Welcome to Your Assessment
          </CardTitle>
          <CardDescription>Important information for first-time users</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Before you begin, please visit the <strong>Resources</strong> section to read all assessment instructions
            and familiarize yourself with the platform. This simulation represents one workday at a typical company.
          </p>
        </CardContent>
        <CardFooter>
          <Button asChild>
            <Link href="/resources">
              <FolderOpen className="mr-2 h-4 w-4" /> Go to Resources
            </Link>
          </Button>
        </CardFooter>
      </Card>

      <div className="mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Assessment Progress</CardTitle>
            <CardDescription>You have completed 2 of 8 assessment tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={25} className="h-2 w-full" />
            <div className="mt-2 flex justify-between text-sm text-muted-foreground">
              <span>25% Complete</span>
              <span>Estimated time remaining: 45 minutes</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="mb-4 text-xl font-semibold">Workplace Tools</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <WorkplaceToolCard title="Email" description="2 unread messages" icon={Mail} href="/email" notification={2} />
        <WorkplaceToolCard
          title="Chat"
          description="Team discussion active"
          icon={MessageSquare}
          href="/chat"
          notification={1}
        />
        <WorkplaceToolCard title="Calendar" description="Next meeting in 15 minutes" icon={Calendar} href="/calendar" />
        <WorkplaceToolCard
          title="Resources"
          description="Documents and reference materials"
          icon={FolderOpen}
          href="/resources"
          notification={3}
        />
        <WorkplaceToolCard
          title="Project Management"
          description="4 pending tasks"
          icon={CheckSquare}
          href="/tasks"
          notification={4}
        />
      </div>
    </div>
  )
}

interface WorkplaceToolCardProps {
  title: string
  description: string
  icon: React.ElementRef<typeof Mail>
  href: string
  notification?: number
}

function WorkplaceToolCard({ title, description, icon: Icon, href, notification }: WorkplaceToolCardProps) {
  return (
    <Card className="transition-all hover:shadow-md">
      <Link href={href}>
        <CardHeader className="relative pb-2">
          {notification && (
            <span className="absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
              {notification}
            </span>
          )}
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
            <Icon className="h-5 w-5" />
          </div>
          <CardTitle className="mt-2 text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{description}</CardDescription>
        </CardContent>
      </Link>
    </Card>
  )
}
