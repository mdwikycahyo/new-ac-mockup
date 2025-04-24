import type { Metadata } from "next"
import AllEmployeesClient from "./AllEmployeesClient"

export const metadata: Metadata = {
  title: "All Employees | Assessment Platform",
  description: "Manage all employees across companies",
}

export default function AllEmployeesPage() {
  return <AllEmployeesClient />
}
