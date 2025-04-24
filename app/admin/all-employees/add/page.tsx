import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export const metadata: Metadata = {
  title: "Add Employee",
  description: "Add a new employee to the platform",
}

// Mock companies for dropdown
const companies = [
  { id: "comp-001", name: "Acme Corporation" },
  { id: "comp-002", name: "Globex Industries" },
  { id: "comp-003", name: "Initech Systems" },
  { id: "comp-004", name: "Massive Dynamic" },
  { id: "comp-005", name: "Stark Industries" },
]

// Mock department options
const departments = [
  "Engineering",
  "Product",
  "Design",
  "Marketing",
  "Sales",
  "Finance",
  "HR",
  "Operations",
  "Customer Support",
  "Executive",
]

export default function AddEmployeePage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" asChild className="h-8 w-8 p-0">
            <Link href="/admin/all-employees">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Add Employee</h1>
            <p className="text-muted-foreground">Add a new employee to the platform</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Employee Information</CardTitle>
              <CardDescription>Enter the basic information about the employee</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" placeholder="Enter first name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Enter last name" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="name@company.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Select>
                  <SelectTrigger id="company">
                    <SelectValue placeholder="Select company" />
                  </SelectTrigger>
                  <SelectContent>
                    {companies.map((company) => (
                      <SelectItem key={company.id} value={company.id}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="job-title">Job Title</Label>
                <Input id="job-title" placeholder="Enter job title" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select>
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((department) => (
                      <SelectItem key={department} value={department}>
                        {department}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
              <CardDescription>Enter additional details about the employee</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <Input id="phone" placeholder="Enter phone number" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Internal Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Notes about this employee (only visible to administrators)"
                  rows={3}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="send-invite" defaultChecked />
                <Label htmlFor="send-invite">Send email invitation immediately</Label>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Access Settings</CardTitle>
              <CardDescription>Configure access role for this employee</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="access-level">Access Role</Label>
                <Select defaultValue="participant">
                  <SelectTrigger id="access-level">
                    <SelectValue placeholder="Select access role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="participant">Participant</SelectItem>
                    <SelectItem value="administrator">Administrator</SelectItem>
                  </SelectContent>
                </Select>
                <div className="mt-3 rounded-md border p-3 text-sm">
                  <p className="font-medium">Role Description:</p>
                  <div className="mt-2 space-y-2">
                    <div>
                      <span className="font-medium">Participant:</span> Takes part in assessment activities. Can view
                      their own results and complete assigned assessments.
                    </div>
                    <div>
                      <span className="font-medium">Administrator:</span> Designs and manages assessment activities for
                      the company. Can create scenarios, assign assessments, and view all participant results.
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Assign Assessments</CardTitle>
              <CardDescription>Select assessments to assign to this employee</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  Assessment assignment options will appear here after selecting a company.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-4 border-t pt-6">
        <Button variant="outline" asChild>
          <Link href="/admin/all-employees">Cancel</Link>
        </Button>
        <Button>
          <Users className="mr-2 h-4 w-4" />
          Add Employee
        </Button>
      </div>
    </div>
  )
}
