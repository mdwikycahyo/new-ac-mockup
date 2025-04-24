import { redirect } from "next/navigation"

export default function EmployeeDetailRedirect({ params }: { params: { id: string } }) {
  // Redirect to the employee detail page with the company context
  redirect(`/admin/all-employees/${params.id}?from=company&companyId=${params.id}`)
}
