"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  ChevronDown,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Mail,
  UserCheck,
  AlertCircle,
  Eye,
  Edit,
  Building,
  Calendar,
  Trash2,
  Users,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EmployeeActionModal } from "@/components/admin/employee-action-modals"
import { DeleteEmployeeDialog } from "@/components/admin/delete-employee-dialog"

// Mock companies data for filtering
const companies = [
  { id: "comp-001", name: "Acme Corporation" },
  { id: "comp-002", name: "Globex Industries" },
  { id: "comp-003", name: "Initech Systems" },
  { id: "comp-004", name: "Massive Dynamic" },
  { id: "comp-005", name: "Stark Industries" },
]

// Mock employees data
const allEmployees = [
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
    lastActive: "2023-10-15T14:30:00Z",
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
    lastActive: "2023-10-10T09:15:00Z",
    dateAdded: "2023-10-05T09:15:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "emp-003",
    name: "Michael Chen",
    email: "michael.chen@globex-ind.com",
    role: "UX Designer",
    department: "Design",
    status: "Completed",
    accessRole: "Participant",
    companyId: "comp-002",
    companyName: "Globex Industries",
    assessmentsAssigned: 1,
    assessmentsCompleted: 1,
    lastActive: "2023-09-25T11:45:00Z",
    dateAdded: "2023-09-20T11:45:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "emp-004",
    name: "Emily Davis",
    email: "emily.davis@initech.net",
    role: "Marketing Specialist",
    department: "Marketing",
    status: "Unconfirmed",
    accessRole: "Participant",
    companyId: "comp-003",
    companyName: "Initech Systems",
    assessmentsAssigned: 2,
    assessmentsCompleted: 0,
    lastActive: null,
    dateAdded: "2023-10-12T16:20:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "emp-005",
    name: "Robert Wilson",
    email: "robert.wilson@massivedynamic.org",
    role: "Sales Manager",
    department: "Sales",
    status: "Active",
    accessRole: "Administrator",
    companyId: "comp-004",
    companyName: "Massive Dynamic",
    assessmentsAssigned: 0,
    assessmentsCompleted: 0,
    lastActive: "2023-10-17T13:10:00Z",
    dateAdded: "2023-09-15T13:10:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "emp-006",
    name: "Jennifer Lee",
    email: "jennifer.lee@stark-ind.com",
    role: "HR Director",
    department: "HR",
    status: "Unconfirmed",
    accessRole: "Administrator",
    companyId: "comp-005",
    companyName: "Stark Industries",
    assessmentsAssigned: 0,
    assessmentsCompleted: 0,
    lastActive: null,
    dateAdded: "2023-10-18T10:30:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "emp-007",
    name: "David Brown",
    email: "david.brown@acmecorp.com",
    role: "Backend Developer",
    department: "Engineering",
    status: "In Progress",
    accessRole: "Participant",
    companyId: "comp-001",
    companyName: "Acme Corporation",
    assessmentsAssigned: 2,
    assessmentsCompleted: 1,
    lastActive: "2023-10-16T11:20:00Z",
    dateAdded: "2023-09-25T09:30:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "emp-008",
    name: "Lisa Wong",
    email: "lisa.wong@globex-ind.com",
    role: "Project Manager",
    department: "Product",
    status: "Completed",
    accessRole: "Participant",
    companyId: "comp-002",
    companyName: "Globex Industries",
    assessmentsAssigned: 3,
    assessmentsCompleted: 3,
    lastActive: "2023-10-12T15:45:00Z",
    dateAdded: "2023-09-10T14:20:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
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
const formatDate = (dateString: string | null) => {
  if (!dateString) return "Never"

  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date)
}

export default function AllEmployeesClient() {
  const searchParams = useSearchParams()
  const companyFilter = searchParams.get("company")

  const [selectedEmployees, setSelectedEmployees] = useState<typeof allEmployees>([])
  const [selectAll, setSelectAll] = useState(false)
  const [currentAction, setCurrentAction] = useState<"invite" | "assign" | "remove" | null>(null)
  const [filteredEmployees, setFilteredEmployees] = useState<typeof allEmployees>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [companyFilterValue, setCompanyFilterValue] = useState<string>(companyFilter || "all")
  const [roleFilterValue, setRoleFilterValue] = useState<string>("all")
  const [statusFilterValue, setStatusFilterValue] = useState<string>("all")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<{ id: string; name: string } | null>(null)
  const [actionModalOpen, setActionModalOpen] = useState(false)
  const [actionType, setActionType] = useState<"reminder" | "assign" | "invite" | "permissions" | null>(null)
  const [actionEmployee, setActionEmployee] = useState<(typeof allEmployees)[0] | null>(null)

  // Apply filters when they change
  useEffect(() => {
    let result = [...allEmployees]

    // Apply company filter
    if (companyFilterValue !== "all") {
      result = result.filter((employee) => employee.companyId === companyFilterValue)
    }

    // Apply role filter
    if (roleFilterValue !== "all") {
      result = result.filter((employee) => employee.accessRole === roleFilterValue)
    }

    // Apply status filter
    if (statusFilterValue !== "all") {
      result = result.filter((employee) => employee.status.toLowerCase() === statusFilterValue.toLowerCase())
    }

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (employee) =>
          employee.name.toLowerCase().includes(query) ||
          employee.email.toLowerCase().includes(query) ||
          employee.role.toLowerCase().includes(query) ||
          employee.department.toLowerCase().includes(query) ||
          employee.companyName.toLowerCase().includes(query),
      )
    }

    setFilteredEmployees(result)
  }, [companyFilterValue, roleFilterValue, statusFilterValue, searchQuery])

  // Initialize filtered employees on component mount
  useEffect(() => {
    let initialEmployees = [...allEmployees]
    if (companyFilter) {
      initialEmployees = initialEmployees.filter((employee) => employee.companyId === companyFilter)
    }
    setFilteredEmployees(initialEmployees)
  }, [companyFilter])

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedEmployees([])
    } else {
      setSelectedEmployees([...filteredEmployees])
    }
    setSelectAll(!selectAll)
  }

  const handleSelectEmployee = (employee: (typeof allEmployees)[0]) => {
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

  const handleDeleteClick = (employee: { id: string; name: string }) => {
    setSelectedEmployee(employee)
    setDeleteDialogOpen(true)
  }

  const handleEmployeeAction = (
    type: "reminder" | "assign" | "invite" | "permissions",
    employee: (typeof allEmployees)[0],
  ) => {
    setActionType(type)
    setActionEmployee(employee)
    setActionModalOpen(true)
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">All Employees</h1>
          <p className="text-muted-foreground">Manage all employees across companies</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/admin/all-employees/add">
              <Plus className="mr-2 h-4 w-4" />
              Add Employee
            </Link>
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Employee Management</CardTitle>
          <CardDescription>View and manage all employees across companies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
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
              <Select value={companyFilterValue} onValueChange={setCompanyFilterValue}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Companies</SelectItem>
                  {companies.map((company) => (
                    <SelectItem key={company.id} value={company.id}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[220px]">
                  <div className="p-2">
                    <p className="mb-2 text-sm font-medium">Filter Options</p>
                    <div className="space-y-2">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Role</p>
                        <Select value={roleFilterValue} onValueChange={setRoleFilterValue}>
                          <SelectTrigger className="h-8 w-full">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Roles</SelectItem>
                            <SelectItem value="Participant">Participant</SelectItem>
                            <SelectItem value="Administrator">Administrator</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Status</p>
                        <Select value={statusFilterValue} onValueChange={setStatusFilterValue}>
                          <SelectTrigger className="h-8 w-full">
                            <SelectValue placeholder="Select status" />
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
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex items-center gap-2">
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
                    <AlertCircle className="mr-2 h-4 w-4" />
                    Remove Selected
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox checked={selectAll} onCheckedChange={handleSelectAll} aria-label="Select all employees" />
              </TableHead>
              <TableHead className="w-[250px]">Employee</TableHead>
              <TableHead>Company</TableHead>
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
                <TableCell colSpan={8} className="h-24 text-center">
                  No employees found matching your filters.
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
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span>{employee.companyName}</span>
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
                            <Link href={`/admin/all-employees/${employee.id}?from=list`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/all-employees/${employee.id}/edit?from=list`}>
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
                                <DropdownMenuItem onClick={() => handleEmployeeAction("assign", employee)}>
                                  <UserCheck className="mr-2 h-4 w-4" />
                                  Assign Assessment
                                </DropdownMenuItem>
                              )}

                              {(employee.status === "In Progress" || employee.status === "Confirmed") && (
                                <DropdownMenuItem onClick={() => handleEmployeeAction("reminder", employee)}>
                                  <Mail className="mr-2 h-4 w-4" />
                                  Send Reminder
                                </DropdownMenuItem>
                              )}

                              {employee.status === "Unconfirmed" && (
                                <DropdownMenuItem onClick={() => handleEmployeeAction("invite", employee)}>
                                  <Mail className="mr-2 h-4 w-4" />
                                  Resend Invite
                                </DropdownMenuItem>
                              )}
                            </>
                          )}

                          {employee.accessRole === "Administrator" &&
                            (employee.status === "Active" ? (
                              <DropdownMenuItem onClick={() => handleEmployeeAction("permissions", employee)}>
                                <Users className="mr-2 h-4 w-4" />
                                Manage Permissions
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem onClick={() => handleEmployeeAction("invite", employee)}>
                                <Mail className="mr-2 h-4 w-4" />
                                Resend Invite
                              </DropdownMenuItem>
                            ))}

                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDeleteClick({ id: employee.id, name: employee.name })}
                          >
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

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing <strong>{filteredEmployees.length}</strong> of <strong>{allEmployees.length}</strong> employees
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>

      {currentAction && (
        <EmployeeActionModal
          isOpen={true}
          onClose={closeModal}
          selectedEmployees={selectedEmployees}
          actionType={currentAction}
        />
      )}

      {selectedEmployee && (
        <DeleteEmployeeDialog
          isOpen={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          employeeId={selectedEmployee.id}
          employeeName={selectedEmployee.name}
          redirectUrl="/admin/all-employees"
        />
      )}

      {actionEmployee && (
        <EmployeeActionModal
          isOpen={actionModalOpen}
          onClose={() => {
            setActionModalOpen(false)
            setActionEmployee(null)
            setActionType(null)
          }}
          actionType={actionType || "reminder"}
          employee={actionEmployee}
        />
      )}
    </div>
  )
}
