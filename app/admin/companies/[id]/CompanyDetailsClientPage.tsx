"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
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
  Eye,
  UserCheck,
  ChevronDown,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { DeleteCompanyDialog } from "@/components/admin/delete-company-dialog"
import { EmployeeActionModal } from "@/components/admin/employee-action-modals"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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

// Mock employees data
const employees = [
  {
    id: "emp-001",
    name: "John Smith",
    email: "john.smith@acmecorp.com",
    role: "Product Manager",
    department: "Product",
    status: "In Progress",
    accessRole: "Participant",
    companyId: "comp-001",
    companyName: "Acme Corporation",
    assessmentsAssigned: 3,
    assessmentsCompleted: 2,
    dateAdded: "2023-10-01T14:30:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "emp-002",
    name: "Sarah Johnson",
    email: "sarah.johnson@acmecorp.com",
    role: "Software Engineer",
    department: "Engineering",
    status: "Confirmed",
    accessRole: "Participant",
    companyId: "comp-001",
    companyName: "Acme Corporation",
    assessmentsAssigned: 2,
    assessmentsCompleted: 0,
    dateAdded: "2023-10-05T09:15:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "emp-003",
    name: "Michael Chen",
    email: "michael.chen@acmecorp.com",
    role: "UX Designer",
    department: "Design",
    status: "Completed",
    accessRole: "Participant",
    companyId: "comp-001",
    companyName: "Acme Corporation",
    assessmentsAssigned: 1,
    assessmentsCompleted: 1,
    dateAdded: "2023-09-20T11:45:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "emp-004",
    name: "Emily Davis",
    email: "emily.davis@acmecorp.com",
    role: "Marketing Specialist",
    department: "Marketing",
    status: "Unconfirmed",
    accessRole: "Participant",
    companyId: "comp-001",
    companyName: "Acme Corporation",
    assessmentsAssigned: 2,
    assessmentsCompleted: 0,
    dateAdded: "2023-10-12T16:20:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "emp-005",
    name: "Robert Wilson",
    email: "robert.wilson@acmecorp.com",
    role: "Sales Manager",
    department: "Sales",
    status: "Active",
    accessRole: "Administrator",
    companyId: "comp-001",
    companyName: "Acme Corporation",
    assessmentsAssigned: 0,
    assessmentsCompleted: 0,
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
    case "Unconfirmed":
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

export default function CompanyDetailsClientPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [selectedEmployees, setSelectedEmployees] = useState<typeof employees>([])
  const [selectAll, setSelectAll] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [currentAction, setCurrentAction] = useState<"invite" | "assign" | "remove" | null>(null)

  const filteredEmployees = employees.filter((emp) => {
    // Apply search filter
    const matchesSearch =
      !searchQuery ||
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchQuery.toLowerCase())

    // Apply status filter
    const matchesStatus = statusFilter === "all" || emp.status.toLowerCase() === statusFilter.toLowerCase()

    // Apply role filter
    const matchesRole = roleFilter === "all" || emp.accessRole === roleFilter

    return matchesSearch && matchesStatus && matchesRole
  })

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedEmployees([])
    } else {
      setSelectedEmployees([...filteredEmployees])
    }
    setSelectAll(!selectAll)
  }

  const handleSelectEmployee = (employee: (typeof employees)[0]) => {
    if (selectedEmployees.some((e) => e.id === employee.id)) {
      setSelectedEmployees(selectedEmployees.filter((e) => e.id !== employee.id))
      setSelectAll(false)
    } else {
      setSelectedEmployees([...selectedEmployees, employee])
      if (selectedEmployees.length + 1 === filteredEmployees.length) {
        setSelectAll(true)
      }
    }
  }

  const handleBulkAction = (action: "invite" | "assign" | "remove") => {
    setCurrentAction(action)
  }

  const closeModal = () => {
    setCurrentAction(null)
  }

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
            <Button
              variant="outline"
              className="text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={() => setDeleteDialogOpen(true)}
            >
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
                  <Link href={`/admin/all-employees?company=${params.id}`}>
                    <Users className="mr-2 h-4 w-4" />
                    View All
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {employees.slice(0, 5).map((employee) => (
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
              <div className="mt-6 flex justify-center">
                <Button variant="outline" asChild>
                  <Link href={`/admin/reports?company=${params.id}`}>View All Assessment Reports</Link>
                </Button>
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
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" disabled={selectedEmployees.length === 0}>
                      Bulk Actions ({selectedEmployees.length})
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem className="cursor-pointer" onClick={() => handleBulkAction("invite")}>
                      <Mail className="mr-2 h-4 w-4" />
                      Send Invitation
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => handleBulkAction("assign")}>
                      <UserCheck className="mr-2 h-4 w-4" />
                      Assign Assessment
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="cursor-pointer text-destructive"
                      onClick={() => handleBulkAction("remove")}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Remove Selected
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button asChild>
                  <Link href={`/admin/all-employees/add?company=${params.id}`}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Employee
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-1 items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search employees..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="Participant">Participant</SelectItem>
                      <SelectItem value="Administrator">Administrator</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="in progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="unconfirmed">Unconfirmed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">
                        <Checkbox
                          checked={selectAll}
                          onCheckedChange={handleSelectAll}
                          aria-label="Select all employees"
                        />
                      </TableHead>
                      <TableHead className="w-[250px]">Employee</TableHead>
                      <TableHead>Access Role</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date Added</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEmployees.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No employees found matching your search.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredEmployees.map((employee) => (
                        <TableRow key={employee.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedEmployees.some((e) => e.id === employee.id)}
                              onCheckedChange={() => handleSelectEmployee(employee)}
                              aria-label={`Select ${employee.name}`}
                            />
                          </TableCell>
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
                            <Badge variant={employee.accessRole === "Administrator" ? "default" : "outline"}>
                              {employee.accessRole}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              {employee.department}
                              <div className="text-xs text-muted-foreground">{employee.role}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={getStatusBadgeVariant(employee.status, employee.accessRole)}>
                              {employee.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{formatDate(employee.dateAdded)}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem asChild>
                                    <Link href={`/admin/all-employees/${employee.id}`}>
                                      <Eye className="mr-2 h-4 w-4" />
                                      View Details
                                    </Link>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem asChild>
                                    <Link href={`/admin/all-employees/${employee.id}/edit`}>
                                      <Edit className="mr-2 h-4 w-4" />
                                      Edit Employee
                                    </Link>
                                  </DropdownMenuItem>

                                  {employee.accessRole === "Participant" && (
                                    <>
                                      {employee.status === "Completed" && (
                                        <DropdownMenuItem asChild>
                                          <Link href={`/admin/all-employees/${employee.id}/results`}>
                                            <Eye className="mr-2 h-4 w-4" />
                                            View Results
                                          </Link>
                                        </DropdownMenuItem>
                                      )}

                                      {employee.status === "Confirmed" && (
                                        <DropdownMenuItem>
                                          <UserCheck className="mr-2 h-4 w-4" />
                                          Assign Assessment
                                        </DropdownMenuItem>
                                      )}

                                      {(employee.status === "In Progress" || employee.status === "Confirmed") && (
                                        <DropdownMenuItem>
                                          <Mail className="mr-2 h-4 w-4" />
                                          Send Reminder
                                        </DropdownMenuItem>
                                      )}

                                      {employee.status === "Unconfirmed" && (
                                        <DropdownMenuItem>
                                          <Mail className="mr-2 h-4 w-4" />
                                          Resend Invite
                                        </DropdownMenuItem>
                                      )}
                                    </>
                                  )}

                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-destructive">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Remove Employee
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  Showing <strong>{filteredEmployees.length}</strong> of <strong>{employees.length}</strong> employees
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/admin/all-employees?company=${params.id}`}>View All Employees</Link>
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
      </Tabs>

      {/* Delete Company Dialog */}
      <DeleteCompanyDialog
        isOpen={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        companyId={params.id}
        companyName={company.name}
      />

      {/* Employee Action Modals */}
      {currentAction && (
        <EmployeeActionModal
          isOpen={true}
          onClose={closeModal}
          selectedEmployees={selectedEmployees}
          actionType={currentAction}
        />
      )}
    </div>
  )
}
