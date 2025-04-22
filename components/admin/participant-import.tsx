"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileSpreadsheet, Upload, X } from "lucide-react"
import { useState } from "react"

export function ParticipantImport({ children }: { children: React.ReactNode }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Import Participants</DialogTitle>
          <DialogDescription>
            Add multiple participants by uploading a CSV file or entering details manually.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="file" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="file">File Upload</TabsTrigger>
            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
          </TabsList>
          <TabsContent value="file" className="mt-4">
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-6">
                {selectedFile ? (
                  <div className="flex w-full items-center justify-between rounded-md bg-muted p-3">
                    <div className="flex items-center">
                      <FileSpreadsheet className="mr-2 h-5 w-5 text-muted-foreground" />
                      <span className="text-sm font-medium">{selectedFile.name}</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={handleRemoveFile}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <Upload className="mb-2 h-10 w-10 text-muted-foreground" />
                    <p className="mb-1 text-sm font-medium">Drag and drop a CSV file, or click to browse</p>
                    <p className="text-xs text-muted-foreground">CSV file with headers: Name, Email, Department</p>
                    <Input type="file" accept=".csv" className="mt-4 w-full" onChange={handleFileChange} />
                  </>
                )}
              </div>
              <div className="space-y-2">
                <Label>Assessment Assignment</Label>
                <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <option value="">Select an assessment to assign (optional)</option>
                  <option value="1">Technical Skills Assessment</option>
                  <option value="2">Leadership Assessment</option>
                  <option value="3">Project Management Assessment</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Notification Options</Label>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="send-invite" className="rounded border-gray-300" />
                  <Label htmlFor="send-invite" className="text-sm font-normal">
                    Send invitation emails to new participants
                  </Label>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="manual" className="mt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="names">Participant Names</Label>
                <Textarea id="names" placeholder="Enter names (one per line)" rows={3} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emails">Participant Emails</Label>
                <Textarea id="emails" placeholder="Enter emails (one per line)" rows={3} />
              </div>
              <div className="space-y-2">
                <Label>Assessment Assignment</Label>
                <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <option value="">Select an assessment to assign (optional)</option>
                  <option value="1">Technical Skills Assessment</option>
                  <option value="2">Leadership Assessment</option>
                  <option value="3">Project Management Assessment</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Notification Options</Label>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="send-invite-manual" className="rounded border-gray-300" />
                  <Label htmlFor="send-invite-manual" className="text-sm font-normal">
                    Send invitation emails to new participants
                  </Label>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsOpen(false)}>Import Participants</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function Textarea({
  id,
  placeholder,
  rows = 3,
}: {
  id: string
  placeholder: string
  rows?: number
}) {
  return (
    <textarea
      id={id}
      placeholder={placeholder}
      rows={rows}
      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    />
  )
}
