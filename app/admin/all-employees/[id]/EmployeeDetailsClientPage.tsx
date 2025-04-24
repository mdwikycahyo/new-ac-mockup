"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Building, Calendar, Edit, Mail, Phone, Trash2, User } from "lucide-react"
import { DeleteEmployeeDialog } from "@/components/admin/delete-employee-dialog"

// Mock employee data
const employee = {
  id: "emp-001",
  name: "John Smith",
  email: "john.smith@acmecorp.com",
  phone: "+1 (555) 123-4567",
  role: "Product Manager",
  department: "Product",
  status: "In Progress",
  accessRole: "Participant",
  companyId: "comp-001",
  companyName: "Acme Corporation",
  assessmentsAssigned: 3,
  assessmentsCompleted: 2,
  lastActive: "2023-10-15T14:30:00Z",
  dateAdded: "2023-10-01T14:30:00Z",
  avatar: "/placeholder.svg?height=120&width=120",
  bio: "Experienced product manager with a focus on enterprise software solutions. Skilled in agile methodologies and cross-functional team leadership.",
}

// Helper function to format date
const formatDate = (dateString: string | null) => {
  if (!dateString) return "Never"

  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}

export default function EmployeeDetailsClientPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const fromPage = searchParams.get("from")
  const companyId = searchParams.get("companyId")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const getBackLink = () => {
    if (fromPage === "company" && companyId) {
      return `/admin/companies/${companyId}?tab=employees`
    } else if (fromPage === "list") {
      return "/admin/all-employees"
    } else {
      return "/admin/all-employees"
    }
  }

  const getBackText = () => {
    if (fromPage === "company" && companyId) {
      return "Back to Company"
    } else {
      return "Back to All Employees"
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href={getBackLink()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {getBackText()}
          </Link>
        </Button>

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
          <div className="flex items-start gap-4">
            <div className="h-20 w-20 overflow-hidden rounded-full">
              <Image
                src={employee.avatar || "/placeholder.svg"}
                alt={employee.name}
                width={120}
                height={120}
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{employee.name}</h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Badge variant="outline">{employee.role}</Badge>
                <span className="text-sm">•</span>
                <span className="flex items-center text-sm">
                  <Building className="mr-1 h-3 w-3" />
                  {employee.companyName}
                </span>
                <span className="text-sm">•</span>
                <Badge variant={employee.accessRole === "Administrator" ? "default" : "outline"}>
                  {employee.accessRole}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href={`/admin/all-employees/${params.id}/edit?from=${fromPage}&companyId=${companyId || ""}`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Employee
              </Link>
            </Button>
            <Button
              variant="outline"
              className="text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={() => setDeleteDialogOpen(true)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Employee
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Employee Information</CardTitle>
                <CardDescription>Basic information about {employee.name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Bio</h3>
                  <p className="mt-1">{employee.bio}</p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Contact Information</h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{employee.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{employee.phone}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Employment Details</h3>
                    <div className="mt-2 space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {employee.role} - {employee.department}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <span>{employee.companyName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Added on {formatDate(employee.dateAdded)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Assessment Status</CardTitle>
                <CardDescription>Current assessment progress for {employee.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Assigned Assessments</h3>
                      <p className="text-sm text-muted-foreground">Total assessments assigned to this employee</p>
                    </div>
                    <div className="text-2xl font-bold">{employee.assessmentsAssigned}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Completed Assessments</h3>
                      <p className="text-sm text-muted-foreground">Assessments completed by this employee</p>
                    </div>
                    <div className="text-2xl font-bold">{employee.assessmentsCompleted}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Completion Rate</h3>
                      <p className="text-sm text-muted-foreground">Percentage of assigned assessments completed</p>
                    </div>
                    <div className="text-2xl font-bold">
                      {employee.assessmentsAssigned > 0
                        ? Math.round((employee.assessmentsCompleted / employee.assessmentsAssigned) * 100)
                        : 0}
                      %
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Last Active</h3>
                      <p className="text-sm text-muted-foreground">Last time this employee was active</p>
                    </div>
                    <div className="text-sm font-medium">{formatDate(employee.lastActive)}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="assessments">
          <Card>
            <CardHeader>
              <CardTitle>Assessment History</CardTitle>
              <CardDescription>View all assessments for {employee.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground">Assessment history will be displayed here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
              <CardDescription>Recent activity for {employee.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground">Activity log will be displayed here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <DeleteEmployeeDialog
        isOpen={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        employeeId={params.id}
        employeeName={employee.name}
        redirectUrl={getBackLink()}
      />
    </div>
  )
}
