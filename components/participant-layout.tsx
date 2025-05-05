"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { DocumentChatbot } from "@/components/document-chatbot"

export function ParticipantLayout({ children }: { children: React.ReactNode }) {
  // This is a client component that conditionally renders the sidebar
  // based on the current path
  const pathname = usePathname?.() || ""

  // Don't show the participant sidebar in admin routes
  if (pathname.startsWith("/admin")) {
    return <>{children}</>
  }

  return (
    <>
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6">{children}</main>
      <DocumentChatbot />
    </>
  )
}
