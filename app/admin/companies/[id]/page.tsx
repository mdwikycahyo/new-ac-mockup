import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  Calendar,
  Edit,
  Globe,
  Mail,
  MapPin,
  MoreHorizontal,
  Phone,
  Plus,
  Search,
  Trash2,
  Users,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export const metadata: Metadata = {
  title: "Company Details",
  description: "View company details and manage participants",
}

// Mock company data
const company = {
  id: "comp-001",
  name: "Acme Corporation",
  industry: "Technology",
  domain: "acmecorp.com",
  description: "A leading technology company specializing in innovative software solutions for enterprise clients.",
  address: {
    street: "123 Tech Lane",
    city: "San Francisco",
    state: "CA",
    postalCode: "94107",
    country: "United States",
  },
  contact: {
    email: "contact@acmecorp.com",
    phone: "+1 (555) 123-4567",
  },
  employeeCount: 24,
  createdAt: "2023-05-12T09:00:00Z",
  logo: {
    square: "/placeholder.svg?height=80&width=80",
    horizontal: "/placeholder.svg?height=60&width=180",
  },
  stats: {
    activeAssessments: 8,
    completedAssessments: 16,
    averageScore: 78,
  },
}

// Mock recent employees
const recentEmployees = [
  {
    id: "part-001",
    name: "John Smith",
    email: "john.smith@acmecorp.com",
    role: "Product Manager",
    department: "Product",
    status: "In Progress",
    accessRole: "Participant",
    dateAdded: "2023-10-01T14:30:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "part-002",
    name: "Sarah Johnson",
    email: "sarah.johnson@acmecorp.com",
    role: "Software Engineer",
    department: "Engineering",
    status: "Confirmed",
    accessRole: "Participant",
    dateAdded: "2023-10-05T09:15:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "part-003",
    name: "Michael Chen",
    email: "michael.chen@acmecorp.com",
    role: "UX Designer",
    department: "Design",
    status: "Completed",
    accessRole: "Participant",
    dateAdded: "2023-09-20T11:45:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "part-004",
    name: "Emily Davis",
    email: "emily.davis@acmecorp.com",
    role: "Marketing Specialist",
    department: "Marketing",
    status: "Pending Confirmation",
    accessRole: "Participant",
    dateAdded: "2023-10-12T16:20:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "part-005",
    name: "Robert Wilson",
    email: "robert.wilson@acmecorp.com",
    role: "Sales Manager",
    department: "Sales",
    status: "Active",
    accessRole: "Administrator",
    dateAdded: "2023-09-15T13:10:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

// Mock recent assessments
const recentAssessments = [
  {
    id: "assess-001",
    name: "Leadership Skills Assessment",
    participants: 12,
    completionRate: 75,
    averageScore: 82,
    date: "2023-09-15T14:30:00Z",
  },
  {
    id: "assess-002",
    name: "Technical Skills Evaluation",
    participants: 18,
    completionRate: 60,
    averageScore: 76,
    date: "2023-08-22T10:15:00Z",
  },
  {
    id: "assess-003",
    name: "Communication Assessment",
    participants: 8,
    completionRate: 100,
    averageScore: 88,
    date: "2023-07-10T09:45:00Z",
  },
]

// Helper function to get status badge variant
const getStatusBadgeVariant = (status: string, accessRole: string) => {
  if (accessRole === "Administrator") {
    return status === "Active" ? "success" : "warning"
  }

  switch (status) {
    case "Completed":
      return "success"
    case "In Progress":
      return "default"
    case "Confirmed":
      return "secondary"
    case "Pending Confirmation":
      return "warning"
    default:
      return "outline"
  }
}

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date)
}

export default function CompanyDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/admin/companies">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Companies
          </Link>
        </Button>

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-md border bg-muted">
              <Image
                src={company.logo.square || "/placeholder.svg"}
                alt={`${company.name} logo`}
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{company.name}</h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Badge variant="outline">{company.industry}</Badge>
                <span className="text-sm">•</span>
                <span className="flex items-center text-sm">
                  <Globe className="mr-1 h-3 w-3" />
                  {company.domain}
                </span>
                <span className="text-sm">•</span>
                <span className="flex items-center text-sm">
                  <Calendar className="mr-1 h-3 w-3" />
                  {new Date(company.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href={`/admin/companies/${params.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Company
              </Link>
            </Button>
            <Button variant="outline" className="text-destructive hover:bg-destructive/10 hover:text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Company
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <div className="text-2xl font-bold">{company.employeeCount}</div>
                </div>
                <p className="text-xs text-muted-foreground">
                  {company.stats.activeAssessments} currently in active assessments
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Completed Assessments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{company.stats.completedAssessments}</div>
                <p className="text-xs text-muted-foreground">Average score: {company.stats.averageScore}%</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Assessments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{company.stats.activeAssessments}</div>
                <p className="text-xs text-muted-foreground">
                  {company.stats.activeAssessments > 0 ? "In progress" : "No active assessments"}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>Detailed information about {company.name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
                  <p className="mt-1">{company.description}</p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Contact Information</h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{company.contact.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{company.contact.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span>{company.domain}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Address</h3>
                    <div className="mt-2 flex items-start gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p>{company.address.street}</p>
                        <p>
                          {company.address.city}, {company.address.state} {company.address.postalCode}
                        </p>
                        <p>{company.address.country}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Employees</CardTitle>
                  <CardDescription>Recently added employees from {company.name}</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/admin/companies/${params.id}/participants`}>
                    <Users className="mr-2 h-4 w-4" />
                    View All
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentEmployees.map((employee) => (
                    <div key={employee.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 overflow-hidden rounded-full">
                          <Image
                            src={employee.avatar || "/placeholder.svg"}
                            alt={employee.name}
                            width={40}
                            height={40}
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{employee.name}</p>
                          <p className="text-xs text-muted-foreground">{employee.role}</p>
                        </div>
                      </div>
                      <Badge variant={getStatusBadgeVariant(employee.status, employee.accessRole)}>
                        {employee.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Assessments</CardTitle>
                <CardDescription>Recent assessment activities for {company.name}</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href={`/admin/reports?company=${params.id}`}>View All Reports</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAssessments.map((assessment) => (
                  <div key={assessment.id} className="rounded-lg border p-4">
                    <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                      <div>
                        <h3 className="font-medium">{assessment.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(assessment.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{assessment.participants} participants</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Badge variant="outline">{assessment.completionRate}% completed</Badge>
                        </div>
                        <div className="flex items-center gap-1">
                          <Badge variant="secondary">Avg. score: {assessment.averageScore}%</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="employees">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Company Employees</CardTitle>
                <CardDescription>Manage all employees from {company.name}</CardDescription>
              </div>
              <Button asChild>
                <Link href={`/admin/companies/${params.id}/participants/add`}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Employee
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-1 items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search employees..." className="pl-8" />
                  </div>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[250px]">Employee</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Access Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date Added</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentEmployees.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 overflow-hidden rounded-full">
                              <Image
                                src={employee.avatar || "/placeholder.svg"}
                                alt={employee.name}
                                width={40}
                                height={40}
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-medium">{employee.name}</div>
                              <div className="text-xs text-muted-foreground">{employee.email}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div>{employee.department}</div>
                            <div className="text-xs text-muted-foreground">{employee.role}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={employee.accessRole === "Administrator" ? "default" : "outline"}>
                            {employee.accessRole}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(employee.status, employee.accessRole)}>
                            {employee.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDate(employee.dateAdded)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            {employee.accessRole === "Participant" && employee.status === "Completed" && (
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/admin/participants/${employee.id}/results`}>View Results</Link>
                              </Button>
                            )}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                  <Link href={`/admin/participants/${employee.id}`}>View Details</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                  <Link href={`/admin/participants/${employee.id}/edit`}>Edit Employee</Link>
                                </DropdownMenuItem>
                                {employee.status === "Pending Confirmation" && (
                                  <DropdownMenuItem>Resend Invitation</DropdownMenuItem>
                                )}
                                {employee.accessRole === "Participant" && employee.status === "Confirmed" && (
                                  <DropdownMenuItem>Assign Assessment</DropdownMenuItem>
                                )}
                                <DropdownMenuItem className="text-destructive">Remove Employee</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-4 flex justify-center">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/admin/companies/${params.id}/participants`}>View All Employees</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assessments">
          <Card>
            <CardHeader>
              <CardTitle>Company Assessments</CardTitle>
              <CardDescription>View and manage assessments for {company.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAssessments.map((assessment) => (
                  <div key={assessment.id} className="rounded-lg border p-4">
                    <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                      <div>
                        <h3 className="font-medium">{assessment.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(assessment.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{assessment.participants} participants</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Badge variant="outline">{assessment.completionRate}% completed</Badge>
                        </div>
                        <div className="flex items-center gap-1">
                          <Badge variant="secondary">Avg. score: {assessment.averageScore}%</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex justify-center">
                <Button variant="outline" asChild>
                  <Link href={`/admin/reports?company=${params.id}`}>View All Assessment Reports</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Company Settings</CardTitle>
              <CardDescription>Manage settings for {company.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">
                This tab would contain company-specific settings.
                <br />
                Options like branding customization, domain verification, and integration settings.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
