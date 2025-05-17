"use client"

import type React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { FileText, Calendar, ListTodo } from "lucide-react"
import { useDemoMode } from "@/components/context/demo-mode-context"

interface TemplateSelectionModalProps {
  onClose: () => void
}

export function TemplateSelectionModal({ onClose }: TemplateSelectionModalProps) {
  const router = useRouter()
  const { demoMode } = useDemoMode()

  const selectTemplate = (templateId: string) => {
    // In a real app, we would pass the template ID to the editor
    router.push(`/documents/editor?template=${templateId}`)
    onClose()
  }

  // Filter templates based on demo mode
  const filteredTemplates = demoMode
    ? documentTemplates.filter(
        (template) =>
          template.id === "blank" || template.id === "draft-activity-timeline" || template.id === "template-rencana-kerja",
      )
    : documentTemplates

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Choose a template</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template) => (
            <Card
              key={template.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                template.id === "draft-activity-timeline" && demoMode ? "ring-2 ring-blue-500 animate-pulse" : ""
              }`}
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
    id: "draft-activity-timeline",
    name: "Draft Activity & Timeline",
    description: "Template untuk aktivitas dan timeline kegiatan team building",
    icon: Calendar,
    preview: (
      <div className="mt-4 space-y-2">
        <div className="h-3 w-3/4 rounded bg-muted/80" />
        <div className="h-2 w-full rounded bg-muted/30" />
        <div className="grid grid-cols-3 gap-1 mt-2">
          <div className="h-6 w-full rounded bg-muted/30" />
          <div className="h-6 w-full rounded bg-muted/30" />
          <div className="h-6 w-full rounded bg-primary/20" />
        </div>
        <div className="grid grid-cols-3 gap-1">
          <div className="h-6 w-full rounded bg-muted/30" />
          <div className="h-6 w-full rounded bg-muted/30" />
          <div className="h-6 w-full rounded bg-muted/30" />
        </div>
      </div>
    ),
  },
  {
    id: "template-rencana-kerja",
    name: "Template Rencana Kerja",
    description: "Template penyusunan rencana kerja kegiatan atau proyek.",
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
    id: "meeting-notes",
    name: "Meeting Notes",
    description: "Template for documenting meeting discussions",
    icon: ListTodo,
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
]
