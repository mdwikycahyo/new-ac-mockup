import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Eye, FileText, MoreHorizontal, Plus, Search, Send, Trash } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Participants Management",
  description: "Manage assessment participants",
}

export default function ParticipantsPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Participants</h1>
          <p className="text-muted-foreground">Manage and monitor assessment participants</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search participants..." className="w-full pl-8" />
          </div>
          <Button asChild>
            <Link href="/admin/participants/add">
              <Plus className="mr-2 h-4 w-4" /> Add Participant
            </Link>
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Assigned Scenarios</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participants.map((participant) => (
              <TableRow key={participant.id}>
                <TableCell className="font-medium">{participant.name}</TableCell>
                <TableCell>{participant.email}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {participant.scenarios.map((scenario, index) => (
                      <Badge key={index} variant="outline" className="rounded-sm text-xs font-normal">
                        {scenario}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <StatusBadge status={participant.status} />
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{participant.created}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/participants/${participant.id}`}>
                          <FileText className="mr-2 h-4 w-4" /> View Details
                        </Link>
                      </DropdownMenuItem>
                      {participant.status === "completed" && (
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/participants/${participant.id}/results`}>
                            <Eye className="mr-2 h-4 w-4" /> View Results
                          </Link>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem>
                        <Send className="mr-2 h-4 w-4" /> Send Invitation
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Plus className="mr-2 h-4 w-4" /> Assign Scenario
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        <Trash className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
        <div>Showing 10 of 56 participants</div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <Badge variant="outline" className={`font-normal ${getStatusColor(status)}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}

const participants = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    scenarios: ["Technical Skills", "Leadership"],
    status: "active",
    created: "Apr 15, 2025",
  },
  {
    id: "2",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    scenarios: ["Technical Skills"],
    status: "completed",
    created: "Apr 14, 2025",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    scenarios: ["Project Management", "Leadership"],
    status: "active",
    created: "Apr 13, 2025",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    scenarios: ["Customer Service"],
    status: "pending",
    created: "Apr 12, 2025",
  },
  {
    id: "5",
    name: "James Wilson",
    email: "james.wilson@example.com",
    scenarios: ["Technical Skills", "Project Management", "Leadership"],
    status: "active",
    created: "Apr 10, 2025",
  },
  {
    id: "6",
    name: "Jennifer Taylor",
    email: "jennifer.taylor@example.com",
    scenarios: ["Customer Service", "Communication"],
    status: "pending",
    created: "Apr 08, 2025",
  },
  {
    id: "7",
    name: "Robert Miller",
    email: "robert.miller@example.com",
    scenarios: ["Technical Skills"],
    status: "completed",
    created: "Apr 05, 2025",
  },
  {
    id: "8",
    name: "Elizabeth Anderson",
    email: "elizabeth.anderson@example.com",
    scenarios: ["Leadership", "Communication"],
    status: "active",
    created: "Apr 03, 2025",
  },
  {
    id: "9",
    name: "David Thomas",
    email: "david.thomas@example.com",
    scenarios: ["Project Management"],
    status: "completed",
    created: "Apr 01, 2025",
  },
  {
    id: "10",
    name: "Lisa Martinez",
    email: "lisa.martinez@example.com",
    scenarios: ["Customer Service", "Technical Skills"],
    status: "active",
    created: "Mar 28, 2025",
  },
]
