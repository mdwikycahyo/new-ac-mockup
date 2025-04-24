import type { Metadata } from "next"
import EditCompanyClientPage from "./EditCompanyClientPage"

export const metadata: Metadata = {
  title: "Edit Company",
  description: "Edit company information",
}

export default function EditCompanyPage({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { from?: string }
}) {
  return <EditCompanyClientPage params={params} />
}
