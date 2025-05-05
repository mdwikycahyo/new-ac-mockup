"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Mail,
  MessageSquare,
  Calendar,
  CheckSquare,
  Video,
  FolderOpen,
  BarChart2,
  Home,
  HelpCircle,
  Menu,
  X,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    name: "Chat",
    href: "/chat",
    icon: MessageSquare,
  },
  {
    name: "Email",
    href: "/email",
    icon: Mail,
  },
  {
    name: "Team",
    href: "/team",
    icon: Users,
  },
  {
    name: "Calendar",
    href: "/calendar",
    icon: Calendar,
  },
  {
    name: "Conference",
    href: "/conference",
    icon: Video,
  },
  {
    name: "Resources",
    href: "/resources",
    icon: FolderOpen,
  },
  {
    name: "Project Management",
    href: "/tasks",
    icon: CheckSquare,
  },
  {
    name: "Results",
    href: "/results",
    icon: BarChart2,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed left-4 top-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform bg-background transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col border-r">
          <div className="flex h-16 items-center border-b px-6">
            <h1 className="text-xl font-bold">Assessment Participant</h1>
          </div>
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                      pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href))
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="border-t p-4">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/help">
                <HelpCircle className="mr-2 h-5 w-5" />
                Help & Support
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
