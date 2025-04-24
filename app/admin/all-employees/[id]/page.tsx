import type { Metadata } from "next"
import EmployeeDetailsClientPage from "./EmployeeDetailsClientPage"

export const metadata: Metadata = {
  title: "Employee Details",
  description: "View employee details and assessment history",
}

export default function EmployeeDetailsPage({ params }: { params: { id: string } }) {
  return <EmployeeDetailsClientPage params={params} />
}
