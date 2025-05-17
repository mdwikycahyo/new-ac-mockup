"use client"

import type React from "react"

import { ThemeProvider } from "@/components/theme-provider"
import { ScenarioProvider } from "@/components/context/scenario-context"
import { DemoModeProvider } from "@/components/context/demo-mode-context"
import { NotificationProvider } from "@/components/context/notification-context"
import { DocumentProvider } from "@/components/context/document-context"
import { EmailProvider } from "@/components/context/email-context"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <DemoModeProvider>
        <ScenarioProvider>
          <NotificationProvider>
            <DocumentProvider>
              <EmailProvider>{children}</EmailProvider>
            </DocumentProvider>
          </NotificationProvider>
        </ScenarioProvider>
      </DemoModeProvider>
    </ThemeProvider>
  )
}
