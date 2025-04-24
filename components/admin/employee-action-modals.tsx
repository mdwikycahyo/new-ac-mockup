"use client"

import { Badge } from "@/components/ui/badge"
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
import { AlertCircle, Mail, UserCheck, Users, Clock } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

type Employee = {
  id: string
  name: string
  email: string
  accessRole: string
  status: string
  department: string
  companyName?: string
}

interface EmployeeActionModalProps {
  isOpen: boolean
  onClose: () => void
  selectedEmployees?: Employee[]
  actionType: "invite" | "assign" | "remove" | "reminder" | "permissions"
  employee?: Employee
}

export function EmployeeActionModal({
  isOpen,
  onClose,
  selectedEmployees,
  actionType,
  employee,
}: EmployeeActionModalProps) {
  const [emailTemplate, setEmailTemplate] = useState<string>("default")
  const [assessment, setAssessment] = useState<string>("")
  const [confirmText, setConfirmText] = useState<string>("")
  const [dueDate, setDueDate] = useState<string>("")
  const [sendNotification, setSendNotification] = useState<boolean>(true)
  const [permissionLevel, setPermissionLevel] = useState<string>("standard")

  const handleAction = () => {
    // Here you would implement the actual action logic
    console.log(`Performing ${actionType} action on:`, selectedEmployees || employee)

    // Show success toast based on action type
    let title = ""
    let description = ""

    switch (actionType) {
      case "invite":
        title = "Invitation Sent"
        description = selectedEmployees
          ? `Successfully sent invitations to ${selectedEmployees.length} employees.`
          : `Successfully sent invitation to ${employee?.name}.`
        break
      case "assign":
        title = "Assessment Assigned"
        description = selectedEmployees
          ? `Successfully assigned assessments to ${selectedEmployees.filter((e) => e.accessRole === "Participant").length} participants.`
          : `Successfully assigned assessment to ${employee?.name}.`
        break
      case "remove":
        title = "Employees Removed"
        description = `Successfully removed ${selectedEmployees?.length} employees.`
        break
      case "reminder":
        title = "Reminder Sent"
        description = `Successfully sent reminder to ${employee?.name}.`
        break
      case "permissions":
        title = "Permissions Updated"
        description = `Successfully updated permissions for ${employee?.name}.`
        break
    }

    toast({ title, description })

    // Reset state and close modal
    setEmailTemplate("default")
    setAssessment("")
    setConfirmText("")
    setDueDate("")
    setSendNotification(true)
    setPermissionLevel("standard")
    onClose()
  }

  const renderModalContent = () => {
    switch (actionType) {
      case "invite":
        return (
          <>
            <DialogHeader>
              <DialogTitle>Send Invitation</DialogTitle>
              <DialogDescription>
                {selectedEmployees
                  ? "Send invitation emails to the selected employees."
                  : `Send invitation email to ${employee?.name}.`}
              </DialogDescription>
            </DialogHeader>

            {selectedEmployees && (
              <div className="my-6 max-h-[300px] overflow-y-auto rounded-md border p-4">
                <h3 className="mb-2 font-medium">Selected Employees ({selectedEmployees.length})</h3>
                <div className="space-y-2">
                  {selectedEmployees.map((employee) => (
                    <div key={employee.id} className="flex items-center justify-between rounded-md bg-muted p-2">
                      <div>
                        <div className="font-medium">{employee.name}</div>
                        <div className="text-xs text-muted-foreground">{employee.email}</div>
                      </div>
                      <div className="text-sm">
                        {employee.companyName && (
                          <span className="mr-2 text-xs text-muted-foreground">{employee.companyName}</span>
                        )}
                        {employee.accessRole}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {employee && (
              <div className="my-6 rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{employee.name}</div>
                    <div className="text-xs text-muted-foreground">{employee.email}</div>
                  </div>
                  <div className="text-sm">
                    {employee.companyName && (
                      <span className="mr-2 text-xs text-muted-foreground">{employee.companyName}</span>
                    )}
                    {employee.accessRole}
                  </div>
                </div>
              </div>
            )}

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
                Send Invitation
              </Button>
            </DialogFooter>
          </>
        )

      case "assign":
        return (
          <>
            <DialogHeader>
              <DialogTitle>Assign Assessment</DialogTitle>
              <DialogDescription>
                {selectedEmployees
                  ? "Assign an assessment to the selected participants."
                  : `Assign an assessment to ${employee?.name}.`}
              </DialogDescription>
            </DialogHeader>

            {selectedEmployees && (
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
                        <div className="text-sm">
                          {employee.companyName && (
                            <span className="mr-2 text-xs text-muted-foreground">{employee.companyName}</span>
                          )}
                          {employee.status}
                        </div>
                      </div>
                    ))}
                </div>

                {selectedEmployees.some((e) => e.accessRole === "Administrator") && (
                  <div className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-800">
                    <AlertCircle className="mb-1 h-4 w-4" />
                    <p>
                      Note: {selectedEmployees.filter((e) => e.accessRole === "Administrator").length} administrators
                      were excluded from selection.
                    </p>
                  </div>
                )}
              </div>
            )}

            {employee && (
              <div className="my-6 rounded-md border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{employee.name}</div>
                    <div className="text-xs text-muted-foreground">{employee.email}</div>
                  </div>
                  <div className="text-sm">
                    {employee.companyName && (
                      <span className="mr-2 text-xs text-muted-foreground">{employee.companyName}</span>
                    )}
                    {employee.status}
                  </div>
                </div>
              </div>
            )}

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
                <Input type="date" id="due-date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="notify"
                  checked={sendNotification}
                  onCheckedChange={(checked) => setSendNotification(checked as boolean)}
                />
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
              <h3 className="mb-2 font-medium">Selected Employees ({selectedEmployees?.length})</h3>
              <div className="space-y-2">
                {selectedEmployees?.map((employee) => (
                  <div key={employee.id} className="flex items-center justify-between rounded-md bg-muted p-2">
                    <div>
                      <div className="font-medium">{employee.name}</div>
                      <div className="text-xs text-muted-foreground">{employee.email}</div>
                    </div>
                    <div className="text-sm">
                      {employee.companyName && (
                        <span className="mr-2 text-xs text-muted-foreground">{employee.companyName}</span>
                      )}
                      {employee.accessRole}
                    </div>
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

      case "reminder":
        return (
          <>
            <DialogHeader>
              <DialogTitle>Send Reminder</DialogTitle>
              <DialogDescription>Send a reminder to {employee?.name} about their pending assessment.</DialogDescription>
            </DialogHeader>

            <div className="my-6 rounded-md border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{employee?.name}</div>
                  <div className="text-xs text-muted-foreground">{employee?.email}</div>
                </div>
                <div className="text-sm">
                  {employee?.companyName && (
                    <span className="mr-2 text-xs text-muted-foreground">{employee.companyName}</span>
                  )}
                  <Badge variant="outline">{employee?.status}</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reminder-template">Reminder Template</Label>
                <Select defaultValue="gentle">
                  <SelectTrigger id="reminder-template">
                    <SelectValue placeholder="Select reminder template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gentle">Gentle Reminder</SelectItem>
                    <SelectItem value="standard">Standard Reminder</SelectItem>
                    <SelectItem value="urgent">Urgent Reminder</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Include Assessment Details</Label>
                <div className="rounded-md border p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Leadership Assessment</div>
                      <div className="text-xs text-muted-foreground">Assigned on Oct 5, 2023</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Due in 3 days</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="customize-reminder" />
                <Label htmlFor="customize-reminder" className="text-sm">
                  Customize reminder message
                </Label>
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleAction}>
                <Mail className="mr-2 h-4 w-4" />
                Send Reminder
              </Button>
            </DialogFooter>
          </>
        )

      case "permissions":
        return (
          <>
            <DialogHeader>
              <DialogTitle>Manage Permissions</DialogTitle>
              <DialogDescription>Update access permissions for {employee?.name}.</DialogDescription>
            </DialogHeader>

            <div className="my-6 rounded-md border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{employee?.name}</div>
                  <div className="text-xs text-muted-foreground">{employee?.email}</div>
                </div>
                <div className="text-sm">
                  {employee?.companyName && (
                    <span className="mr-2 text-xs text-muted-foreground">{employee.companyName}</span>
                  )}
                  <Badge>Administrator</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Tabs defaultValue="access" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="access">Access Level</TabsTrigger>
                  <TabsTrigger value="features">Feature Access</TabsTrigger>
                </TabsList>
                <TabsContent value="access" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label>Administrator Permission Level</Label>
                    <RadioGroup defaultValue="standard" value={permissionLevel} onValueChange={setPermissionLevel}>
                      <div className="flex items-start space-x-2 rounded-md border p-3">
                        <RadioGroupItem value="standard" id="standard" className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor="standard" className="font-medium">
                            Standard Administrator
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Can manage assessments, participants, and view reports for their company.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-2 rounded-md border p-3">
                        <RadioGroupItem value="super" id="super" className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor="super" className="font-medium">
                            Super Administrator
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Has all standard permissions plus the ability to manage other administrators and system
                            settings.
                          </p>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                </TabsContent>
                <TabsContent value="features" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label>Feature Access</Label>
                    <div className="space-y-2 rounded-md border p-3">
                      <div className="flex items-center justify-between py-1">
                        <Label htmlFor="feature-assessments" className="cursor-pointer">
                          Assessment Management
                        </Label>
                        <Checkbox id="feature-assessments" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between py-1">
                        <Label htmlFor="feature-participants" className="cursor-pointer">
                          Participant Management
                        </Label>
                        <Checkbox id="feature-participants" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between py-1">
                        <Label htmlFor="feature-reports" className="cursor-pointer">
                          Reports & Analytics
                        </Label>
                        <Checkbox id="feature-reports" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between py-1">
                        <Label htmlFor="feature-templates" className="cursor-pointer">
                          Assessment Templates
                        </Label>
                        <Checkbox id="feature-templates" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between py-1">
                        <Label htmlFor="feature-settings" className="cursor-pointer">
                          Company Settings
                        </Label>
                        <Checkbox id="feature-settings" defaultChecked />
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <DialogFooter className="mt-6">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleAction}>
                <Users className="mr-2 h-4 w-4" />
                Update Permissions
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
