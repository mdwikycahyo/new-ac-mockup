import type { Metadata } from "next"
import EditEmployeeClientPage from "./EditEmployeeClientPage"

export const metadata: Metadata = {
  title: "Edit Employee",
  description: "Edit employee information",
}

export default function EditEmployeePage({ params }: { params: { id: string } }) {
  return <EditEmployeeClientPage params={params} />
}
