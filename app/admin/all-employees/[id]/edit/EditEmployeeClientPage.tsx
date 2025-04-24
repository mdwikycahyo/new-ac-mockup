"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save } from "lucide-react"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"

// Form validation schema
const employeeFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  role: z.string().min(1, "Job role is required"),
  department: z.string().min(1, "Department is required"),
  companyId: z.string().min(1, "Company is required"),
  accessRole: z.enum(["Participant", "Administrator"]),
  sendNotifications: z.boolean().default(true),
})

type EmployeeFormValues = z.infer<typeof employeeFormSchema>

// Mock companies data
const companies = [
  { id: "comp-001", name: "Acme Corporation" },
  { id: "comp-002", name: "Globex Industries" },
  { id: "comp-003", name: "Initech Systems" },
  { id: "comp-004", name: "Massive Dynamic" },
  { id: "comp-005", name: "Stark Industries" },
]

// Mock departments
const departments = [
  "Engineering",
  "Product",
  "Design",
  "Marketing",
  "Sales",
  "Finance",
  "HR",
  "Operations",
  "Customer Support",
  "Legal",
]

// Mock employee data - in a real app, this would come from an API
const fetchEmployee = async (id: string): Promise<EmployeeFormValues> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  return {
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@acmecorp.com",
    phone: "+1 (555) 123-4567",
    role: "Product Manager",
    department: "Product",
    companyId: "comp-001",
    accessRole: "Participant",
    sendNotifications: true,
  }
}

export default function EditEmployeeClientPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const fromPage = searchParams.get("from")
  const companyId = searchParams.get("companyId")
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize form with default values
  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      role: "",
      department: "",
      companyId: "",
      accessRole: "Participant",
      sendNotifications: true,
    },
  })

  // Load employee data
  useEffect(() => {
    const loadEmployee = async () => {
      try {
        const employeeData = await fetchEmployee(params.id)

        // Set form values
        Object.entries(employeeData).forEach(([key, value]) => {
          form.setValue(key as any, value)
        })

        setIsLoading(false)
      } catch (error) {
        console.error("Error loading employee:", error)
        toast({
          title: "Error",
          description: "Failed to load employee data. Please try again.",
          variant: "destructive",
        })
        router.push("/admin/all-employees")
      }
    }

    loadEmployee()
  }, [params.id, form, router])

  // Handle form submission
  const onSubmit = async (data: EmployeeFormValues) => {
    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call to update the employee
      console.log("Updating employee data:", data)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Employee updated",
        description: `${data.firstName} ${data.lastName} has been successfully updated.`,
      })

      // Redirect to employee details
      router.push(`/admin/all-employees/${params.id}`)
    } catch (error) {
      console.error("Error updating employee:", error)
      toast({
        title: "Error",
        description: "There was a problem updating the employee. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getBackLink = () => {
    if (fromPage === "company" && companyId) {
      return `/admin/companies/${companyId}?tab=employees`
    } else {
      return `/admin/all-employees/${params.id}`
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 animate-pulse rounded-full bg-muted"></div>
          <div className="space-y-2">
            <div className="h-4 w-[250px] animate-pulse rounded bg-muted"></div>
            <div className="h-4 w-[200px] animate-pulse rounded bg-muted"></div>
          </div>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <div className="h-[300px] animate-pulse rounded-lg bg-muted"></div>
          </div>
          <div className="space-y-6">
            <div className="h-[200px] animate-pulse rounded-lg bg-muted"></div>
            <div className="h-[150px] animate-pulse rounded-lg bg-muted"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href={getBackLink()}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Employee</h1>
          <p className="text-muted-foreground">
            Update information for {form.watch("firstName")} {form.watch("lastName")}
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Edit the employee's personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormDescription>This email will be used for login and notifications</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number (Optional)</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Company & Role</CardTitle>
                  <CardDescription>Update the employee's company and role information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="companyId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select company" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {companies.map((company) => (
                              <SelectItem key={company.id} value={company.id}>
                                {company.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Department</FormLabel>
                        <Select value={field.value} onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {departments.map((department) => (
                              <SelectItem key={department} value={department}>
                                {department}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Role</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Access & Permissions</CardTitle>
                  <CardDescription>Configure the employee's access level</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="accessRole"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Access Role</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="Participant" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Participant - Can complete assigned assessments
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="Administrator" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Administrator - Can manage assessments and view results
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="sendNotifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Send email notifications</FormLabel>
                          <FormDescription>
                            The employee will receive email notifications about assessments and updates
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-4 border-t pt-6">
            <Button variant="outline" asChild>
              <Link href={getBackLink()}>Cancel</Link>
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
