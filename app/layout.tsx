import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ParticipantLayout } from "@/components/participant-layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Workplace Assessment Platform",
  description: "A comprehensive workplace assessment platform",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ClientLayout>{children}</ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}

function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <ParticipantLayout>{children}</ParticipantLayout>
    </div>
  )
}
