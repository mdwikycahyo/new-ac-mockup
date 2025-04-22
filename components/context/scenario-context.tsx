"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

// Define the types for our context
type Competency = {
  id: string
  name: string
}

type ScenarioContextType = {
  selectedCompetencies: Record<string, boolean>
  setSelectedCompetencies: (competencies: Record<string, boolean>) => void
  scenarioName: string
  setScenarioName: (name: string) => void
  scenarioDescription: string
  setScenarioDescription: (description: string) => void
  industry: string
  setIndustry: (industry: string) => void
  department: string
  setDepartment: (department: string) => void
  targetRole: string
  setTargetRole: (role: string) => void
  duration: number[]
  setDuration: (duration: number[]) => void
}

// Create the context with default values
const ScenarioContext = createContext<ScenarioContextType>({
  selectedCompetencies: {},
  setSelectedCompetencies: () => {},
  scenarioName: "",
  setScenarioName: () => {},
  scenarioDescription: "",
  setScenarioDescription: () => {},
  industry: "",
  setIndustry: () => {},
  department: "",
  setDepartment: () => {},
  targetRole: "",
  setTargetRole: () => {},
  duration: [60],
  setDuration: () => {},
})

// Create a provider component
export function ScenarioProvider({ children }: { children: ReactNode }) {
  const [selectedCompetencies, setSelectedCompetencies] = useState<Record<string, boolean>>({})
  const [scenarioName, setScenarioName] = useState("")
  const [scenarioDescription, setScenarioDescription] = useState("")
  const [industry, setIndustry] = useState("")
  const [department, setDepartment] = useState("")
  const [targetRole, setTargetRole] = useState("")
  const [duration, setDuration] = useState([60])

  return (
    <ScenarioContext.Provider
      value={{
        selectedCompetencies,
        setSelectedCompetencies,
        scenarioName,
        setScenarioName,
        scenarioDescription,
        setScenarioDescription,
        industry,
        setIndustry,
        department,
        setDepartment,
        targetRole,
        setTargetRole,
        duration,
        setDuration,
      }}
    >
      {children}
    </ScenarioContext.Provider>
  )
}

// Create a custom hook to use the context
export function useScenario() {
  return useContext(ScenarioContext)
}
