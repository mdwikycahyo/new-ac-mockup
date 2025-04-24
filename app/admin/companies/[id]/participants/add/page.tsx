import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Plus, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "Add Employee",
  description: "Add a new employee to the company",
}

// Mock company data
const company = {
  id: "comp-001",
  name: "Acme Corporation",
  logo: "/placeholder.svg?height=40&width=40",
}

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

// Mock scenario options with competencies
const scenarios = [
  {
    id: "scen-001",
    name: "Leadership Skills Assessment",
    competencies: ["Leadership", "Decision Making", "Strategic Thinking"],
    description: "Evaluates leadership capabilities through realistic management scenarios",
  },
  {
    id: "scen-002",
    name: "Technical Skills Evaluation",
    competencies: ["Problem Solving", "Technical Knowledge", "Analytical Thinking"],
    description: "Assesses technical problem-solving abilities in practical situations",
  },
  {
    id: "scen-003",
    name: "Communication Assessment",
    competencies: ["Verbal Communication", "Written Communication", "Active Listening"],
    description: "Measures effective communication skills in various workplace contexts",
  },
  {
    id: "scen-004",
    name: "Project Management Simulation",
    competencies: ["Planning", "Organization", "Resource Management", "Time Management"],
    description: "Tests project management capabilities through realistic project scenarios",
  },
  {
    id: "scen-005",
    name: "Customer Service Challenge",
    competencies: ["Empathy", "Problem Resolution", "Communication"],
    description: "Evaluates customer service skills through simulated customer interactions",
  },
]

export default function AddEmployeePage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href={`/admin/companies/${params.id}/participants`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Employees
          </Link>
        </Button>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-md border bg-muted">
            <Image
              src={company.logo || "/placeholder.svg"}
              alt={`${company.name} logo`}
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Add Employee</h1>
            <p className="text-muted-foreground">Add a new employee to {company.name}</p>
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
                <Input id="email" type="email" placeholder="name@acmecorp.com" />
                <p className="text-xs text-muted-foreground">
                  Must match the company domain: @{company.name.toLowerCase().replace(/\s+/g, "")}
                </p>
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

          <Card id="scenario-assignment-card">
            <CardHeader>
              <CardTitle>Assign Scenarios</CardTitle>
              <CardDescription>Select assessment scenarios to assign to this employee</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">
                  Choose from available published scenarios to assign to this employee. They will receive access to
                  these assessments upon registration.
                </p>
              </div>

              <div className="h-[300px] overflow-y-auto rounded-md border">
                {scenarios.length > 0 ? (
                  <div className="divide-y">
                    {scenarios.map((scenario) => (
                      <div key={scenario.id} className="flex items-start gap-3 p-3 hover:bg-muted/50">
                        <Checkbox id={`scenario-${scenario.id}`} className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor={`scenario-${scenario.id}`} className="cursor-pointer font-medium">
                            {scenario.name}
                          </Label>
                          <div className="mt-1 flex flex-wrap gap-2">
                            {scenario.competencies.map((competency) => (
                              <span
                                key={competency}
                                className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium"
                              >
                                {competency}
                              </span>
                            ))}
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{scenario.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                    <Users className="h-10 w-10 text-muted-foreground/50" />
                    <h3 className="mt-4 text-lg font-medium">No published scenarios</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      There are no published scenarios available to assign.
                    </p>
                    <Button variant="outline" className="mt-4" asChild>
                      <Link href="/admin/scenarios2/create">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Scenario
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-4 border-t pt-6">
        <Button variant="outline" asChild>
          <Link href={`/admin/companies/${params.id}/participants`}>Cancel</Link>
        </Button>
        <Button>
          <Users className="mr-2 h-4 w-4" />
          Add Employee
        </Button>
      </div>
    </div>
  )
}
