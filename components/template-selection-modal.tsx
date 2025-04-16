"use client"

import type React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { FileText, FileCheck, Calendar, ListTodo, MessageSquare, Users } from "lucide-react"

interface TemplateSelectionModalProps {
  onClose: () => void
}

export function TemplateSelectionModal({ onClose }: TemplateSelectionModalProps) {
  const router = useRouter()

  const selectTemplate = (templateId: string) => {
    // In a real app, we would pass the template ID to the editor
    router.push(`/resources/editor?template=${templateId}`)
    onClose()
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Choose a template</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {documentTemplates.map((template) => (
            <Card
              key={template.id}
              className="cursor-pointer transition-all hover:shadow-md"
              onClick={() => selectTemplate(template.id)}
            >
              <CardContent className="p-4">
                <div className="mb-3 flex items-center gap-2">
                  <div className="rounded-md bg-muted p-2">
                    <template.icon className="h-4 w-4" />
                  </div>
                  <h3 className="font-medium">{template.name}</h3>
                </div>
                <div className="aspect-[4/3] overflow-hidden rounded-md border bg-background">
                  <div className="h-full w-full p-3">
                    <div className="space-y-2">
                      <div className="h-4 w-3/4 rounded bg-muted" />
                      <div className="h-3 w-full rounded bg-muted/50" />
                      <div className="h-3 w-5/6 rounded bg-muted/50" />
                      {template.preview}
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{template.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface DocumentTemplate {
  id: string
  name: string
  description: string
  icon: React.ElementType
  preview: React.ReactNode
}

const documentTemplates: DocumentTemplate[] = [
  {
    id: "blank",
    name: "Blank Document",
    description: "Start with a clean slate",
    icon: FileText,
    preview: (
      <div className="mt-4 space-y-2">
        <div className="h-3 w-11/12 rounded bg-muted/50" />
        <div className="h-3 w-full rounded bg-muted/50" />
        <div className="h-3 w-4/5 rounded bg-muted/50" />
      </div>
    ),
  },
  {
    id: "meeting-notes",
    name: "Meeting Notes",
    description: "Template for documenting meeting discussions",
    icon: MessageSquare,
    preview: (
      <div className="mt-4 space-y-2">
        <div className="h-3 w-1/2 rounded bg-muted/80" />
        <div className="h-3 w-1/3 rounded bg-muted/50" />
        <div className="mt-3 h-2 w-full rounded bg-muted/30" />
        <div className="h-2 w-11/12 rounded bg-muted/30" />
        <div className="h-2 w-full rounded bg-muted/30" />
      </div>
    ),
  },
  {
    id: "project-plan",
    name: "Project Plan",
    description: "Outline your project goals and timeline",
    icon: ListTodo,
    preview: (
      <div className="mt-4 space-y-2">
        <div className="h-3 w-2/3 rounded bg-muted/80" />
        <div className="h-2 w-full rounded bg-muted/30" />
        <div className="h-3 w-1/2 rounded bg-muted/80" />
        <div className="h-2 w-11/12 rounded bg-muted/30" />
        <div className="h-2 w-full rounded bg-muted/30" />
      </div>
    ),
  },
  {
    id: "weekly-report",
    name: "Weekly Report",
    description: "Summarize progress and achievements",
    icon: FileCheck,
    preview: (
      <div className="mt-4 space-y-2">
        <div className="h-3 w-3/4 rounded bg-muted/80" />
        <div className="h-2 w-full rounded bg-muted/30" />
        <div className="h-2 w-11/12 rounded bg-muted/30" />
        <div className="h-3 w-1/2 rounded bg-muted/80" />
        <div className="h-2 w-full rounded bg-muted/30" />
      </div>
    ),
  },
  {
    id: "team-directory",
    name: "Team Directory",
    description: "Create a list of team members and contacts",
    icon: Users,
    preview: (
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-muted" />
          <div className="h-2 w-1/3 rounded bg-muted/80" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-muted" />
          <div className="h-2 w-1/3 rounded bg-muted/80" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-muted" />
          <div className="h-2 w-1/3 rounded bg-muted/80" />
        </div>
      </div>
    ),
  },
  {
    id: "calendar-schedule",
    name: "Calendar Schedule",
    description: "Plan your weekly or monthly schedule",
    icon: Calendar,
    preview: (
      <div className="mt-4 space-y-2">
        <div className="grid grid-cols-5 gap-1">
          <div className="h-3 w-full rounded bg-muted/50" />
          <div className="h-3 w-full rounded bg-muted/50" />
          <div className="h-3 w-full rounded bg-muted/50" />
          <div className="h-3 w-full rounded bg-muted/50" />
          <div className="h-3 w-full rounded bg-muted/50" />
        </div>
        <div className="grid grid-cols-5 gap-1">
          <div className="h-6 w-full rounded bg-muted/30" />
          <div className="h-6 w-full rounded bg-muted/30" />
          <div className="h-6 w-full rounded bg-primary/20" />
          <div className="h-6 w-full rounded bg-muted/30" />
          <div className="h-6 w-full rounded bg-muted/30" />
        </div>
      </div>
    ),
  },
]
