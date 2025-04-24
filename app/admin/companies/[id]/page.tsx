import type { Metadata } from "next"
import CompanyDetailsClientPage from "./CompanyDetailsClientPage"

export const metadata: Metadata = {
  title: "Company Details",
  description: "View company details and manage participants",
}

export default function CompanyDetailsPage({ params }: { params: { id: string } }) {
  return <CompanyDetailsClientPage params={params} />
}
