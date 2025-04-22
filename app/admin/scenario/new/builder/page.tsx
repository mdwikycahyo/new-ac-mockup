import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Save, Play, Plus, Trash2, Settings, Mail, FileText, MessageSquare, Calendar } from "lucide-react"
import Link from "next/link"

export default function ScenarioBuilderPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/scenario/new">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Scenario Builder</h1>
            <p className="text-muted-foreground">Design your assessment workflow and tasks</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Save className="mr-2 h-4 w-4" /> Save Draft
          </Button>
          <Button variant="outline">
            <Play className="mr-2 h-4 w-4" /> Preview
          </Button>
          <Button>Publish Assessment</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-1 pb-2">
                <h3 className="text-lg font-medium">Task Library</h3>
                <p className="text-xs text-muted-foreground">Drag tasks to the builder</p>
              </div>
              <div className="space-y-2">
                <TaskItem
                  icon={<Mail className="h-4 w-4" />}
                  title="Email Task"
                  description="Respond to an email scenario"
                />
                <TaskItem
                  icon={<FileText className="h-4 w-4" />}
                  title="Document Task"
                  description="Create or edit a document"
                />
                <TaskItem
                  icon={<MessageSquare className="h-4 w-4" />}
                  title="Chat Task"
                  description="Respond to a chat conversation"
                />
                <TaskItem
                  icon={<Calendar className="h-4 w-4" />}
                  title="Calendar Task"
                  description="Schedule or manage calendar events"
                />
                <Button variant="outline" className="mt-4 w-full justify-start">
                  <Plus className="mr-2 h-4 w-4" /> Create Custom Task
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="min-h-[600px]">
            <CardContent className="p-4">
              <Tabs defaultValue="visual" className="w-full">
                <TabsList className="mb-4 grid w-full grid-cols-2">
                  <TabsTrigger value="visual">Visual Builder</TabsTrigger>
                  <TabsTrigger value="outline">Outline View</TabsTrigger>
                </TabsList>
                <TabsContent value="visual" className="min-h-[500px] rounded-md border border-dashed p-6">
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Plus className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium">Start Building Your Assessment</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Drag tasks from the library to create your assessment flow
                    </p>
                    <Button className="mt-4">
                      <Plus className="mr-2 h-4 w-4" /> Add First Task
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="outline">
                  <div className="min-h-[500px] rounded-md border border-dashed p-6">
                    <div className="flex h-full flex-col items-center justify-center text-center">
                      <h3 className="text-lg font-medium">No Tasks Added Yet</h3>
                      <p className="mt-2 text-sm text-muted-foreground">Add tasks to see them in outline view</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-4">
              <div className="space-y-1 pb-2">
                <h3 className="text-lg font-medium">Properties</h3>
                <p className="text-xs text-muted-foreground">Configure selected task</p>
              </div>
              <div className="flex h-[500px] flex-col items-center justify-center text-center">
                <div className="rounded-full bg-muted p-3">
                  <Settings className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-sm font-medium">No Task Selected</h3>
                <p className="mt-2 text-xs text-muted-foreground">Select a task to view and edit its properties</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function TaskItem({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="flex cursor-move items-center gap-3 rounded-md border p-3 hover:border-primary/50 hover:bg-muted/50">
      <div className="rounded-md bg-primary/10 p-1.5">{icon}</div>
      <div className="flex-1 text-sm">
        <div className="font-medium">{title}</div>
        <div className="text-xs text-muted-foreground">{description}</div>
      </div>
      <Button variant="ghost" size="icon" className="h-6 w-6">
        <Trash2 className="h-3.5 w-3.5" />
      </Button>
    </div>
  )
}
