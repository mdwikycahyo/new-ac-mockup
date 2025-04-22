import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Check } from "lucide-react"
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"

export default function AddParticipantPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/participants">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add Participant</h1>
          <p className="text-muted-foreground">Add a new participant to the assessment platform</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Participant Information</CardTitle>
            <CardDescription>Enter the basic information for the new participant</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="Enter first name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Enter last name" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="participant@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Position/Role</Label>
              <Input id="position" placeholder="e.g., Project Manager, Developer" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input id="department" placeholder="e.g., Engineering, Marketing" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea id="notes" placeholder="Any additional information about this participant" rows={3} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Scenario Assignment</CardTitle>
            <CardDescription>Assign scenarios to this participant</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Label>Available Scenarios</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="scenario1" />
                  <Label htmlFor="scenario1" className="font-normal">
                    Technical Skills Scenario
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="scenario2" />
                  <Label htmlFor="scenario2" className="font-normal">
                    Leadership Scenario
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="scenario3" />
                  <Label htmlFor="scenario3" className="font-normal">
                    Project Management Scenario
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="scenario4" />
                  <Label htmlFor="scenario4" className="font-normal">
                    Customer Service Scenario
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="scenario5" />
                  <Label htmlFor="scenario5" className="font-normal">
                    Communication Skills Scenario
                  </Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input id="dueDate" type="date" />
            </div>

            <div className="space-y-2">
              <Label>Notification Options</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="sendInvite" defaultChecked />
                  <Label htmlFor="sendInvite" className="font-normal">
                    Send invitation email
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="sendReminder" />
                  <Label htmlFor="sendReminder" className="font-normal">
                    Send reminder 2 days before due date
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 flex justify-between">
        <Button variant="outline" asChild>
          <Link href="/admin/participants">Cancel</Link>
        </Button>
        <div className="space-x-2">
          <Button variant="outline">Save as Draft</Button>
          <Button>
            <Check className="mr-2 h-4 w-4" /> Add Participant
          </Button>
        </div>
      </div>
    </div>
  )
}
