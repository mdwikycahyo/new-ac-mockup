import type { Metadata } from "next"
import AddCompanyClientPage from "./AddCompanyClientPage"

export const metadata: Metadata = {
  title: "Add Company",
  description: "Add a new company client to the platform",
}

export default function AddCompanyPage() {
  return <AddCompanyClientPage />
}
