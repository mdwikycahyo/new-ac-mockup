import type { Metadata } from "next"
import CompaniesClientPage from "./CompaniesClientPage"

export const metadata: Metadata = {
  title: "Companies",
  description: "Manage companies in the assessment platform",
}

export default function CompaniesPage() {
  return <CompaniesClientPage />
}
