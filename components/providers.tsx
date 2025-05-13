"use client"

import type { ReactNode } from "react"
import { DocumentProvider } from "@/components/context/document-context"

export function Providers({ children }: { children: ReactNode }) {
  return <DocumentProvider>{children}</DocumentProvider>
}
