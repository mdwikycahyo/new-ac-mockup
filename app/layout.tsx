import type React from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Sidebar } from "@/components/sidebar"
import { DemoModeProvider } from "@/components/context/demo-mode-context"
import { NotificationProvider } from "@/components/context/notification-context"
import { DemoScenarioManager } from "@/components/demo-scenario-manager"
import { DocumentChatbot } from "@/components/document-chatbot"
import { DocumentProvider } from "@/components/context/document-context"
import { DebugLocalStorage } from "@/components/debug-local-storage"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Workplace Assessment Platform</title>
        <meta name="description" content="A simulation of workplace conditions for assessment" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <DemoModeProvider>
            <NotificationProvider>
              <DocumentProvider>
                <div className="flex min-h-screen">
                  <Sidebar />
                  <main className="flex-1 bg-background">{children}</main>
                  <DemoScenarioManager />
                  <DocumentChatbot />
                </div>
              </DocumentProvider>
            </NotificationProvider>
          </DemoModeProvider>
        </ThemeProvider>
        {/* Debug tools */}
        <DebugLocalStorage />
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
