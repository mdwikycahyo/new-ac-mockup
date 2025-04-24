import EditCompanyClientPage from "./EditCompanyClientPage"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Edit Company",
  description: "Edit company information",
}

export default function EditCompanyPage({ params }: { params: { id: string } }) {
  return <EditCompanyClientPage params={params} />
}
