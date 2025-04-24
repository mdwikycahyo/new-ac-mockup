import { redirect } from "next/navigation"

export default function EmployeeDetailRedirect({ params }: { params: { id: string, employeeId: string } }) {
  // Redirect to the employee detail page with the company context
  redirect(`/admin/all-employees/${params.employeeId}?from=company&companyId=${params.id}`)
}
