import type { Metadata } from "next"
import CompanyEmployeesPageClient from "./CompanyEmployeesPageClient"

export const metadata: Metadata = {
  title: "Company Employees",
  description: "Manage employees for this company",
}

export default function CompanyEmployeesPage({ params }: { params: { id: string } }) {
  return <CompanyEmployeesPageClient params={params} />
}
