import type React from "react"
import { ScenarioProvider } from "@/components/context/scenario-context"

export default function ScenariosLayout({ children }: { children: React.ReactNode }) {
  return <ScenarioProvider>{children}</ScenarioProvider>
}
