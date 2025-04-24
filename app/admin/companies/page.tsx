import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Filter, MoreHorizontal, Plus, Search, Users, Globe, Briefcase, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function CompaniesPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Companies</h1>
          <p className="text-muted-foreground">Manage your client companies and their assessments</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/admin/companies/add">
              <Plus className="mr-2 h-4 w-4" />
              Add Company
            </Link>
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Company Management</CardTitle>
          <CardDescription>View and manage all client companies in the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search companies..." className="pl-8" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Company</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Domain</TableHead>
              <TableHead className="text-center">Employees</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {companies.map((company) => (
              <TableRow key={company.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-md border bg-muted">
                      <Image
                        src={company.logo || "/placeholder.svg?height=40&width=40"}
                        alt={`${company.name} logo`}
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{company.name}</div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <MapPin className="mr-1 h-3 w-3" />
                        {company.location}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="flex w-fit items-center gap-1">
                    <Briefcase className="h-3 w-3" />
                    {company.industry}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Globe className="h-3 w-3 text-muted-foreground" />
                    <span>{company.domain}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center">{company.employees}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/companies/${company.id}/participants`}>
                        <Users className="mr-2 h-4 w-4" />
                        Manage Employees
                      </Link>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/companies/${company.id}`}>View Details</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/companies/${company.id}/edit`}>Edit Company</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete Company</DropdownMenuItem>
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
          Showing <strong>5</strong> of <strong>12</strong> companies
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
    </div>
  )
}

// Sample companies data - in a real app, this would come from an API
const companies = [
  {
    id: "comp-001",
    name: "Acme Corporation",
    logo: "/placeholder.svg?height=40&width=40",
    industry: "Technology",
    domain: "acmecorp.com",
    location: "New York, USA",
    employees: 124,
    totalAssessments: 450,
    completedAssessments: 382,
  },
  {
    id: "comp-002",
    name: "Globex Industries",
    logo: "/placeholder.svg?height=40&width=40",
    industry: "Manufacturing",
    domain: "globex-ind.com",
    location: "Chicago, USA",
    employees: 87,
    totalAssessments: 320,
    completedAssessments: 275,
  },
  {
    id: "comp-003",
    name: "Initech Systems",
    logo: "/placeholder.svg?height=40&width=40",
    industry: "Finance",
    domain: "initech.net",
    location: "Austin, USA",
    employees: 56,
    totalAssessments: 210,
    completedAssessments: 198,
  },
  {
    id: "comp-004",
    name: "Massive Dynamic",
    logo: "/placeholder.svg?height=40&width=40",
    industry: "Healthcare",
    domain: "massivedynamic.org",
    location: "Boston, USA",
    employees: 93,
    totalAssessments: 380,
    completedAssessments: 310,
  },
  {
    id: "comp-005",
    name: "Stark Industries",
    logo: "/placeholder.svg?height=40&width=40",
    industry: "Energy",
    domain: "stark-ind.com",
    location: "Los Angeles, USA",
    employees: 112,
    totalAssessments: 420,
    completedAssessments: 395,
  },
]
