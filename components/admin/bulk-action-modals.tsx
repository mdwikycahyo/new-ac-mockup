"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, Mail, UserCheck } from "lucide-react"

type Employee = {
  id: string
  name: string
  email: string
  accessRole: string
  status: string
  department: string
}

interface BulkActionModalProps {
  isOpen: boolean
  onClose: () => void
  selectedEmployees: Employee[]
  actionType: "invite" | "assign" | "remove"
}

export function BulkActionModal({ isOpen, onClose, selectedEmployees, actionType }: BulkActionModalProps) {
  const [emailTemplate, setEmailTemplate] = useState<string>("default")
  const [assessment, setAssessment] = useState<string>("")
  const [confirmText, setConfirmText] = useState<string>("")

  const handleAction = () => {
    // Here you would implement the actual action logic
    console.log(`Performing ${actionType} action on:`, selectedEmployees)

    // Reset state and close modal
    setEmailTemplate("default")
    setAssessment("")
    setConfirmText("")
    onClose()
  }

  const renderModalContent = () => {
    switch (actionType) {
      case "invite":
        return (
          <>
            <DialogHeader>
              <DialogTitle>Send Invitation</DialogTitle>
              <DialogDescription>Send invitation emails to the selected employees.</DialogDescription>
            </DialogHeader>

            <div className="my-6 max-h-[300px] overflow-y-auto rounded-md border p-4">
              <h3 className="mb-2 font-medium">Selected Employees ({selectedEmployees.length})</h3>
              <div className="space-y-2">
                {selectedEmployees.map((employee) => (
                  <div key={employee.id} className="flex items-center justify-between rounded-md bg-muted p-2">
                    <div>
                      <div className="font-medium">{employee.name}</div>
                      <div className="text-xs text-muted-foreground">{employee.email}</div>
                    </div>
                    <div className="text-sm">{employee.accessRole}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-template">Email Template</Label>
                <Select value={emailTemplate} onValueChange={setEmailTemplate}>
                  <SelectTrigger id="email-template">
                    <SelectValue placeholder="Select email template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default Welcome</SelectItem>
                    <SelectItem value="reminder">Assessment Reminder</SelectItem>
                    <SelectItem value="custom">Custom Template</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="customize" />
                <Label htmlFor="customize" className="text-sm">
                  Customize email message
                </Label>
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleAction}>
                <Mail className="mr-2 h-4 w-4" />
                Send Invitations
              </Button>
            </DialogFooter>
          </>
        )

      case "assign":
        return (
          <>
            <DialogHeader>
              <DialogTitle>Assign Assessment</DialogTitle>
              <DialogDescription>Assign an assessment to the selected participants.</DialogDescription>
            </DialogHeader>

            <div className="my-6 max-h-[300px] overflow-y-auto rounded-md border p-4">
              <h3 className="mb-2 font-medium">
                Selected Participants ({selectedEmployees.filter((e) => e.accessRole === "Participant").length})
              </h3>
              <div className="space-y-2">
                {selectedEmployees
                  .filter((e) => e.accessRole === "Participant")
                  .map((employee) => (
                    <div key={employee.id} className="flex items-center justify-between rounded-md bg-muted p-2">
                      <div>
                        <div className="font-medium">{employee.name}</div>
                        <div className="text-xs text-muted-foreground">{employee.email}</div>
                      </div>
                      <div className="text-sm">{employee.status}</div>
                    </div>
                  ))}
              </div>

              {selectedEmployees.some((e) => e.accessRole === "Administrator") && (
                <div className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-800">
                  <AlertCircle className="mb-1 h-4 w-4" />
                  <p>
                    Note: {selectedEmployees.filter((e) => e.accessRole === "Administrator").length} administrators were
                    excluded from selection.
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="assessment">Select Assessment</Label>
                <Select value={assessment} onValueChange={setAssessment}>
                  <SelectTrigger id="assessment">
                    <SelectValue placeholder="Choose an assessment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tech">Technical Skills Assessment</SelectItem>
                    <SelectItem value="leadership">Leadership Assessment</SelectItem>
                    <SelectItem value="project">Project Management Assessment</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="due-date">Due Date (Optional)</Label>
                <Input type="date" id="due-date" />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="notify" />
                <Label htmlFor="notify" className="text-sm">
                  Notify participants about this assignment
                </Label>
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleAction} disabled={!assessment}>
                <UserCheck className="mr-2 h-4 w-4" />
                Assign Assessment
              </Button>
            </DialogFooter>
          </>
        )

      case "remove":
        return (
          <>
            <DialogHeader>
              <DialogTitle>Remove Employees</DialogTitle>
              <DialogDescription>
                This action cannot be undone. The selected employees will be permanently removed.
              </DialogDescription>
            </DialogHeader>

            <div className="my-6 max-h-[300px] overflow-y-auto rounded-md border p-4">
              <h3 className="mb-2 font-medium">Selected Employees ({selectedEmployees.length})</h3>
              <div className="space-y-2">
                {selectedEmployees.map((employee) => (
                  <div key={employee.id} className="flex items-center justify-between rounded-md bg-muted p-2">
                    <div>
                      <div className="font-medium">{employee.name}</div>
                      <div className="text-xs text-muted-foreground">{employee.email}</div>
                    </div>
                    <div className="text-sm">{employee.accessRole}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                <AlertCircle className="mb-1 h-4 w-4" />
                <p>Warning: This will remove all employee data, including assessment results and history.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm">Type "DELETE" to confirm</Label>
                <Input
                  id="confirm"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder="DELETE"
                />
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleAction} disabled={confirmText !== "DELETE"}>
                <AlertCircle className="mr-2 h-4 w-4" />
                Remove Employees
              </Button>
            </DialogFooter>
          </>
        )
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-lg">{renderModalContent()}</DialogContent>
    </Dialog>
  )
}
