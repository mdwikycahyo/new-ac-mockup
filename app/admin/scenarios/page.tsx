import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Copy, Edit, Eye, MoreHorizontal, Plus, Search, Trash, Users } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Scenarios Management",
  description: "Manage assessment scenarios",
}

export default function ScenariosPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Scenarios</h1>
          <p className="text-muted-foreground">Create and manage assessment scenarios</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search scenarios..." className="w-full pl-8" />
          </div>
          <Button asChild>
            <Link href="/admin/scenario-wizard">
              <Plus className="mr-2 h-4 w-4" /> Create Scenario
            </Link>
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Scenario Name</TableHead>
              <TableHead>Competency</TableHead>
              <TableHead>Tasks</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Participants</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scenarios.map((scenario) => (
              <TableRow key={scenario.id}>
                <TableCell className="font-medium">{scenario.name}</TableCell>
                <TableCell>{scenario.competency}</TableCell>
                <TableCell>{scenario.tasks}</TableCell>
                <TableCell>{scenario.duration} min</TableCell>
                <TableCell>
                  <StatusBadge status={scenario.status} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <span>{scenario.participants}</span>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/scenarios/${scenario.id}`}>
                          <Eye className="mr-2 h-4 w-4" /> View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/scenarios/${scenario.id}/edit`}>
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="mr-2 h-4 w-4" /> Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/scenarios/${scenario.id}/assign`}>
                          <Users className="mr-2 h-4 w-4" /> Assign Participants
                        </Link>
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
        <div>Showing 10 of 24 scenarios</div>
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
      case "draft":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "archived":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
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

const scenarios = [
  {
    id: "1",
    name: "Technical Skills Assessment",
    competency: "Problem Solving",
    tasks: 5,
    duration: 60,
    status: "active",
    participants: 24,
  },
  {
    id: "2",
    name: "Leadership Assessment",
    competency: "Coaching for Performance",
    tasks: 4,
    duration: 45,
    status: "active",
    participants: 12,
  },
  {
    id: "3",
    name: "Project Management Assessment",
    competency: "Disciplined Execution",
    tasks: 6,
    duration: 75,
    status: "active",
    participants: 18,
  },
  {
    id: "4",
    name: "Customer Service Assessment",
    competency: "Customer Orientation",
    tasks: 3,
    duration: 30,
    status: "draft",
    participants: 0,
  },
  {
    id: "5",
    name: "Communication Skills Assessment",
    competency: "Collaboration",
    tasks: 4,
    duration: 45,
    status: "active",
    participants: 32,
  },
  {
    id: "6",
    name: "Business Analysis Assessment",
    competency: "Business Acumen",
    tasks: 5,
    duration: 60,
    status: "draft",
    participants: 0,
  },
  {
    id: "7",
    name: "Technical Documentation Assessment",
    competency: "Technology Savvy",
    tasks: 3,
    duration: 40,
    status: "archived",
    participants: 15,
  },
  {
    id: "8",
    name: "Process Improvement Assessment",
    competency: "Continuous Improvement",
    tasks: 4,
    duration: 50,
    status: "active",
    participants: 8,
  },
  {
    id: "9",
    name: "Team Collaboration Assessment",
    competency: "Collaboration",
    tasks: 5,
    duration: 60,
    status: "active",
    participants: 20,
  },
  {
    id: "10",
    name: "Strategic Thinking Assessment",
    competency: "Business Acumen",
    tasks: 4,
    duration: 55,
    status: "draft",
    participants: 0,
  },
]
