"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"

type DemoModeContextType = {
  demoMode: boolean
  toggleDemoMode: () => void
  demoScenarioStep: number
  setDemoScenarioStep: (step: number) => void
  assessmentCompleted: boolean
  setAssessmentCompleted: (completed: boolean) => void
}

const DemoModeContext = createContext<DemoModeContextType>({
  demoMode: true, // Set demo mode to true by default
  toggleDemoMode: () => {},
  demoScenarioStep: 0,
  setDemoScenarioStep: () => {},
  assessmentCompleted: false,
  setAssessmentCompleted: () => {},
})

export function DemoModeProvider({ children }: { children: React.ReactNode }) {
  const [demoMode, setDemoMode] = useState(true) // Default is now true
  const [demoScenarioStep, setDemoScenarioStep] = useState(0)
  const [assessmentCompleted, setAssessmentCompleted] = useState(false)

  // Toggle demo mode function
  const toggleDemoMode = () => {
    setDemoMode(!demoMode)
    // Reset demo scenario step and assessment completion when toggling
    if (demoMode) {
      setDemoScenarioStep(0)
      setAssessmentCompleted(false)
    }
  }

  return (
    <DemoModeContext.Provider
      value={{
        demoMode,
        toggleDemoMode,
        demoScenarioStep,
        setDemoScenarioStep,
        assessmentCompleted,
        setAssessmentCompleted,
      }}
    >
      {children}
    </DemoModeContext.Provider>
  )
}

export const useDemoMode = () => useContext(DemoModeContext)
