"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save } from "lucide-react"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { ImageUpload } from "@/components/ui/image-upload"
import { Combobox } from "@/components/ui/combobox"
import { ConfirmDialog } from "@/components/dialogs/confirm-dialog"
import { toast } from "@/components/ui/use-toast"

// Mock industry data - in a real app, this would come from an API
const initialIndustries = [
  { value: "technology", label: "Technology" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "finance", label: "Finance" },
  { value: "healthcare", label: "Healthcare" },
  { value: "environmental", label: "Environmental" },
  { value: "education", label: "Education" },
  { value: "retail", label: "Retail" },
  { value: "hospitality", label: "Hospitality" },
  { value: "transportation", label: "Transportation" },
  { value: "energy", label: "Energy" },
]

// Form validation schema
const companyFormSchema = z.object({
  name: z.string().min(2, "Company name must be at least 2 characters"),
  industry: z.string().min(1, "Please select an industry"),
  domain: z
    .string()
    .min(3, "Domain must be at least 3 characters")
    .regex(
      /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/,
      "Please enter a valid domain (e.g., example.com)",
    ),
  description: z.string().optional(),
  address: z.object({
    street: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State/Province is required"),
    postalCode: z.string().min(1, "Postal code is required"),
    country: z.string().min(1, "Country is required"),
  }),
  contact: z.object({
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().optional(),
  }),
  notes: z.string().optional(),
  logo: z.object({
    square: z.string().optional(),
    horizontal: z.string().optional(),
  }),
})

type CompanyFormValues = z.infer<typeof companyFormSchema>

// Mock company data - in a real app, this would come from an API
const fetchCompany = async (id: string): Promise<CompanyFormValues> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  return {
    name: "Acme Corporation",
    industry: "technology",
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
    notes: "Key client with multiple departments using our platform. Main contact is John Smith, CTO.",
    logo: {
      square: "/placeholder.svg?height=80&width=80",
      horizontal: "/placeholder.svg?height=60&width=180",
    },
  }
}

export default function EditCompanyClientPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const fromList = searchParams.get("from") === "list"

  const [industries, setIndustries] = useState(initialIndustries)
  const [newIndustry, setNewIndustry] = useState("")
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Initialize form with default values
  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      name: "",
      industry: "",
      domain: "",
      description: "",
      address: {
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
      },
      contact: {
        email: "",
        phone: "",
      },
      notes: "",
      logo: {
        square: "",
        horizontal: "",
      },
    },
  })

  // Load company data
  useEffect(() => {
    const loadCompany = async () => {
      try {
        const companyData = await fetchCompany(params.id)

        // Set form values
        Object.entries(companyData).forEach(([key, value]) => {
          if (key === "address" || key === "contact" || key === "logo") {
            Object.entries(value as Record<string, any>).forEach(([subKey, subValue]) => {
              form.setValue(`${key}.${subKey}` as any, subValue)
            })
          } else {
            form.setValue(key as any, value)
          }
        })

        setIsLoading(false)
      } catch (error) {
        console.error("Error loading company:", error)
        toast({
          title: "Error",
          description: "Failed to load company data. Please try again.",
          variant: "destructive",
        })
        router.push("/admin/companies")
      }
    }

    loadCompany()
  }, [params.id, form, router])

  // Handle adding a new industry
  const handleAddIndustry = (value: string) => {
    setNewIndustry(value)
    setConfirmDialogOpen(true)
  }

  // Confirm adding a new industry
  const confirmAddIndustry = () => {
    const formattedValue = newIndustry.trim()
    const newIndustryValue = formattedValue.toLowerCase().replace(/\s+/g, "-")

    // Add the new industry to the list
    const newIndustryOption = { value: newIndustryValue, label: formattedValue }
    setIndustries([...industries, newIndustryOption])

    // Set the new industry as the selected value
    form.setValue("industry", newIndustryValue)

    // Close the dialog
    setConfirmDialogOpen(false)
  }

  // Handle form submission
  const onSubmit = async (data: CompanyFormValues) => {
    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call to update the company
      console.log("Updating company data:", data)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Company updated",
        description: `${data.name} has been successfully updated.`,
      })

      // Redirect based on where the user came from
      if (fromList) {
        router.push("/admin/companies")
      } else {
        router.push(`/admin/companies/${params.id}`)
      }
    } catch (error) {
      console.error("Error updating company:", error)
      toast({
        title: "Error",
        description: "There was a problem updating the company. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
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
            <div className="h-[250px] animate-pulse rounded-lg bg-muted"></div>
          </div>
          <div className="space-y-6">
            <div className="h-[200px] animate-pulse rounded-lg bg-muted"></div>
            <div className="h-[150px] animate-pulse rounded-lg bg-muted"></div>
            <div className="h-[200px] animate-pulse rounded-lg bg-muted"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href={fromList ? "/admin/companies" : `/admin/companies/${params.id}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Company</h1>
          <p className="text-muted-foreground">Update information for {form.watch("name")}</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Company Information</CardTitle>
                  <CardDescription>Edit the basic information about the company</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Industry</FormLabel>
                        <FormControl>
                          <Combobox
                            options={industries}
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Select industry"
                            emptyMessage="No matching industries found."
                            onCreateNew={handleAddIndustry}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="domain"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Domain</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          The domain will be used for email verification and participant registration
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Description</FormLabel>
                        <FormControl>
                          <Textarea rows={4} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Address Information</CardTitle>
                  <CardDescription>Edit the physical address of the company</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="address.street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Address</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="address.city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address.state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State/Province</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="address.postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postal Code</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address.country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Company Branding</CardTitle>
                  <CardDescription>Update company logo in both square and horizontal formats</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="logo.square"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Square Logo (1:1)</FormLabel>
                        <FormControl>
                          <ImageUpload
                            value={field.value}
                            onChange={field.onChange}
                            aspectRatio="square"
                            placeholder="Upload square logo"
                          />
                        </FormControl>
                        <FormDescription>This logo will be used for profile icons and small displays</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="logo.horizontal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Horizontal Logo (3:1)</FormLabel>
                        <FormControl>
                          <ImageUpload
                            value={field.value}
                            onChange={field.onChange}
                            aspectRatio="horizontal"
                            placeholder="Upload horizontal logo"
                          />
                        </FormControl>
                        <FormDescription>This logo will be used for headers and wider displays</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Update contact details for the company</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="contact.email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary Email</FormLabel>
                        <FormControl>
                          <Input type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contact.phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
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
                  <CardTitle>Additional Information</CardTitle>
                  <CardDescription>Update additional details about the company</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Internal Notes</FormLabel>
                        <FormControl>
                          <Textarea rows={3} {...field} />
                        </FormControl>
                        <FormDescription>These notes are only visible to platform administrators</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-4 border-t pt-6">
            <Button variant="outline" asChild>
              <Link href={fromList ? "/admin/companies" : `/admin/companies/${params.id}`}>Cancel</Link>
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Form>

      <ConfirmDialog
        open={confirmDialogOpen}
        onOpenChange={setConfirmDialogOpen}
        title="Add New Industry"
        description={`Are you sure you want to add "${newIndustry}" as a new industry option?`}
        confirmLabel="Add Industry"
        onConfirm={confirmAddIndustry}
      />
    </div>
  )
}
