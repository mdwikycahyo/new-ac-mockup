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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, ChevronDown, MoreHorizontal, Plus, Search, Mail, UserCheck, AlertCircle } from "lucide-react"
import { BulkActionModal } from "@/components/admin/bulk-action-modals"

// Mock company data
const company = {
  id: "comp-001",
  name: "Acme Corporation",
  logo: "/placeholder.svg?height=40&width=40",
}

// Mock employees data
const employees = [
  {
    id: "part-001",
    name: "John Smith",
    email: "john.smith@acmecorp.com",
    role: "Product Manager",
    department: "Product",
    status: "In Progress",
    accessRole: "Participant",
    assessmentsAssigned: 3,
    assessmentsCompleted: 2,
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
    assessmentsAssigned: 2,
    assessmentsCompleted: 0,
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
    assessmentsAssigned: 1,
    assessmentsCompleted: 1,
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
    assessmentsAssigned: 2,
    assessmentsCompleted: 0,
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
    assessmentsAssigned: 0,
    assessmentsCompleted: 0,
    dateAdded: "2023-09-15T13:10:00Z",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "part-006",
    name: "Jennifer Lee",
    email: "jennifer.lee@acmecorp.com",
    role: "HR Director",
    department: "HR",
    status: "Pending Confirmation",
    accessRole: "Administrator",
    assessmentsAssigned: 0,
    assessmentsCompleted: 0,
    dateAdded: "2023-10-18T10:30:00Z",
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

export default function CompanyEmployeesPageClient({ params }: { params: { id: string } }) {
  const [selectedEmployees, setSelectedEmployees] = useState<typeof employees>([])
  const [selectAll, setSelectAll] = useState(false)
  const [currentAction, setCurrentAction] = useState<"invite" | "assign" | "remove" | null>(null)

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedEmployees([])
    } else {
      setSelectedEmployees([...employees])
    }
    setSelectAll(!selectAll)
  }

  const handleSelectEmployee = (employee: (typeof employees)[0]) => {
    if (selectedEmployees.some((e) => e.id === employee.id)) {
      setSelectedEmployees(selectedEmployees.filter((e) => e.id !== employee.id))
      setSelectAll(false)
    } else {
      setSelectedEmployees([...selectedEmployees, employee])
      if (selectedEmployees.length + 1 === employees.length) {
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
          <Link href={`/admin/companies/${params.id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Company Details
          </Link>
        </Button>

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
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
              <h1 className="text-3xl font-bold tracking-tight">{company.name} Employees</h1>
              <p className="text-muted-foreground">Manage assessment employees for this company</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link href={`/admin/companies/${params.id}/participants/add`}>
                <Plus className="mr-2 h-4 w-4" />
                Add Employee
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Employee Management</CardTitle>
          <CardDescription>View and manage all employees from {company.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search employees..." className="pl-8" />
              </div>
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
              <TableHead>Department</TableHead>
              <TableHead>Access Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Assessments</TableHead>
              <TableHead>Date Added</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee) => (
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
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Badge variant={getStatusBadgeVariant(employee.status, employee.accessRole)}>
                          {employee.status}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        {employee.accessRole === "Administrator"
                          ? employee.status === "Active"
                            ? "Administrator has confirmed email and set password"
                            : "Administrator needs to confirm email and set password"
                          : employee.status === "Pending Confirmation"
                            ? "Participant needs to confirm email and set password"
                            : employee.status === "Confirmed"
                              ? "Participant has confirmed but not started assessments"
                              : employee.status === "In Progress"
                                ? "Participant has started but not completed all assessments"
                                : "Participant has completed all assigned assessments"}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell className="text-center">
                  {employee.accessRole === "Administrator" ? (
                    <span className="text-sm text-muted-foreground">N/A</span>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="text-sm font-medium">
                        {employee.assessmentsCompleted}/{employee.assessmentsAssigned}
                      </div>
                      <div className="text-xs text-muted-foreground">completed</div>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <span>{formatDate(employee.dateAdded)}</span>
                      </TooltipTrigger>
                      <TooltipContent>Added on {new Date(employee.dateAdded).toLocaleString()}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
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
                          <Link href={`/admin/participants/${employee.id}`}>View Details</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/participants/${employee.id}/edit`}>Edit Employee</Link>
                        </DropdownMenuItem>

                        {employee.accessRole === "Participant" && (
                          <>
                            {employee.status === "Completed" && (
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/participants/${employee.id}/results`}>View Results</Link>
                              </DropdownMenuItem>
                            )}

                            {employee.status === "Confirmed" && <DropdownMenuItem>Assign Assessment</DropdownMenuItem>}

                            {(employee.status === "In Progress" || employee.status === "Confirmed") && (
                              <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                            )}

                            {employee.status === "Pending Confirmation" && (
                              <DropdownMenuItem>
                                Resend Invite
                              </DropdownMenuItem>
                            )}
                          </>
                        )}

                        {employee.accessRole === "Administrator" && (
                          employee.status === "Active" ? 
                            <DropdownMenuItem>Manage Permissions</DropdownMenuItem> : 
                            <DropdownMenuItem>Resend Invite</DropdownMenuItem>
                        )}

                        <DropdownMenuSeparator />
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

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing <strong>6</strong> of <strong>24</strong> employees
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
        <BulkActionModal
          isOpen={true}
          onClose={closeModal}
          selectedEmployees={selectedEmployees}
          actionType={currentAction}
        />
      )}
    </div>
  )
}
