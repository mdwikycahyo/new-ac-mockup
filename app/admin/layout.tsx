import type React from "react"
import { AdminSidebar } from "@/components/admin-sidebar"
import { NotificationCenter } from "@/components/notification-center"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <AdminSidebar />
      <div className="flex-1 overflow-y-auto">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
          <div className="ml-auto flex items-center gap-4">
            <NotificationCenter />
          </div>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
