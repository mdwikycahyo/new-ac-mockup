"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
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
  Calendar,
  Trash2,
  Users,
} from "lucide-react"
import { BulkActionModal } from "@/components/admin/bulk-action-modals"
import { DeleteEmployeeDialog } from "@/components/admin/delete-employee-dialog"
import { EmployeeActionModal } from "@/components/admin/employee-action-modals"

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
    assessmentsAssigned: 2,
    assessmentsCompleted: 0,
    lastActive: "2023-10-10T09:15:00Z",
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
    assessmentsAssigned: 1,
    assessmentsCompleted: 1,
    lastActive: "2023-09-25T11:45:00Z",
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
    assessmentsAssigned: 2,
    assessmentsCompleted: 0,
    lastActive: null,
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
    assessmentsAssigned: 0,
    assessmentsCompleted: 0,
    lastActive: "2023-10-17T13:10:00Z",
    dateAdded: "2023-09-15T13:10:00Z",
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

export default function CompanyEmployeesPageClient({ companyId }: { companyId: string }) {
  const [selectedEmployees, setSelectedEmployees] = useState<typeof employees>([])
  const [selectAll, setSelectAll] = useState(false)
  const [currentAction, setCurrentAction] = useState<"invite" | "assign" | "remove" | null>(null)
  const [filteredEmployees, setFilteredEmployees] = useState<typeof employees>(employees)
  const [searchQuery, setSearchQuery] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<{ id: string; name: string } | null>(null)
  const [actionModalOpen, setActionModalOpen] = useState(false)
  const [actionType, setActionType] = useState<"reminder" | "assign" | "invite" | "permissions" | null>(null)
  const [actionEmployee, setActionEmployee] = useState<(typeof employees)[0] | null>(null)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (!query.trim()) {
      setFilteredEmployees(employees)
      return
    }

    const lowercaseQuery = query.toLowerCase()
    const filtered = employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(lowercaseQuery) ||
        employee.email.toLowerCase().includes(lowercaseQuery) ||
        employee.role.toLowerCase().includes(lowercaseQuery) ||
        employee.department.toLowerCase().includes(lowercaseQuery),
    )
    setFilteredEmployees(filtered)
  }

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

  const handleDeleteClick = (employee: { id: string; name: string }) => {
    setSelectedEmployee(employee)
    setDeleteDialogOpen(true)
  }

  const handleEmployeeAction = (
    type: "reminder" | "assign" | "invite" | "permissions",
    employee: (typeof employees)[0],
  ) => {
    setActionType(type)
    setActionEmployee(employee)
    setActionModalOpen(true)
  }

  return (
    <div>
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Employees</h2>
          <p className="text-muted-foreground">Manage employees for this company</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href={`/admin/companies/${companyId}/participants/add`}>
              <Plus className="mr-2 h-4 w-4" />
              Add Employee
            </Link>
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Employee Management</CardTitle>
          <CardDescription>View and manage employees for this company</CardDescription>
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
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <div className="p-2">
                    <p className="mb-2 text-sm font-medium">Filter Options</p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="filter-admin" />
                        <label htmlFor="filter-admin" className="text-sm font-medium">
                          Administrators
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="filter-participant" />
                        <label htmlFor="filter-participant" className="text-sm font-medium">
                          Participants
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="filter-unconfirmed" />
                        <label htmlFor="filter-unconfirmed" className="text-sm font-medium">
                          Unconfirmed
                        </label>
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
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date Added</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
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
                    <div className="text-sm">
                      {employee.role}
                      <div className="text-xs text-muted-foreground">{employee.department}</div>
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
                            <Link
                              href={`/admin/companies/${companyId}/participants/${employee.id}?from=company&companyId=${companyId}`}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/all-employees/${employee.id}/edit?from=company&companyId=${companyId}`}>
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

      {currentAction && (
        <BulkActionModal
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
          redirectUrl={`/admin/companies/${companyId}?tab=employees`}
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
