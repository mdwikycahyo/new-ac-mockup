"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Building2, Calendar, Edit, Globe, MoreHorizontal, Plus, Search, Trash2, Users } from "lucide-react"
import { DeleteCompanyDialog } from "@/components/admin/delete-company-dialog"

// Mock companies data
const companies = [
  {
    id: "comp-001",
    name: "Acme Corporation",
    industry: "Technology",
    domain: "acmecorp.com",
    employeeCount: 24,
    activeAssessments: 3,
    createdAt: "2023-05-12T09:00:00Z",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "comp-002",
    name: "Globex Industries",
    industry: "Manufacturing",
    domain: "globex-ind.com",
    employeeCount: 42,
    activeAssessments: 5,
    createdAt: "2023-03-18T14:30:00Z",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "comp-003",
    name: "Initech Systems",
    industry: "Finance",
    domain: "initech.net",
    employeeCount: 18,
    activeAssessments: 2,
    createdAt: "2023-06-05T11:15:00Z",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "comp-004",
    name: "Massive Dynamic",
    industry: "Technology",
    domain: "massivedynamic.org",
    employeeCount: 36,
    activeAssessments: 4,
    createdAt: "2023-02-22T10:00:00Z",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "comp-005",
    name: "Stark Industries",
    industry: "Energy",
    domain: "stark-ind.com",
    employeeCount: 52,
    activeAssessments: 6,
    createdAt: "2023-04-10T08:45:00Z",
    logo: "/placeholder.svg?height=40&width=40",
  },
]

export default function CompaniesClientPage() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState<{ id: string; name: string } | null>(null)

  const handleDeleteClick = (company: { id: string; name: string }) => {
    setSelectedCompany(company)
    setDeleteDialogOpen(true)
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Companies</h1>
          <p className="text-muted-foreground">Manage companies in the assessment platform</p>
        </div>
        <Button asChild>
          <Link href="/admin/companies/add">
            <Plus className="mr-2 h-4 w-4" />
            Add Company
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Company Management</CardTitle>
          <CardDescription>View and manage all companies registered in the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search companies..." className="pl-8" />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Company</TableHead>
                  <TableHead>Industry</TableHead>
                  <TableHead>Employees</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {companies.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 overflow-hidden rounded-md">
                          <Image
                            src={company.logo || "/placeholder.svg"}
                            alt={`${company.name} logo`}
                            width={40}
                            height={40}
                            className="object-contain"
                          />
                        </div>
                        <div>
                          <div className="font-medium">{company.name}</div>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Globe className="mr-1 h-3 w-3" />
                            {company.domain}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{company.industry}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{company.employeeCount}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{new Date(company.createdAt).toLocaleDateString()}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/companies/${company.id}`}>
                              <Building2 className="mr-2 h-4 w-4" />
                              View Details
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/companies/${company.id}/edit?from=list`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Company
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDeleteClick({ id: company.id, name: company.name })}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Company
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {selectedCompany && (
        <DeleteCompanyDialog
          isOpen={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          companyId={selectedCompany.id}
          companyName={selectedCompany.name}
        />
      )}
    </div>
  )
}
