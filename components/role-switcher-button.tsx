"use client"
import { UserCog, User } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { usePathname } from "next/navigation"

export function RoleSwitcherButton() {
  const router = useRouter()
  const pathname = usePathname()

  // Check if we're in admin section
  const isAdmin = pathname.startsWith("/admin")

  const handleRoleSwitch = () => {
    if (isAdmin) {
      router.push("/")
    } else {
      router.push("/admin")
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon" onClick={handleRoleSwitch}>
            {isAdmin ? <User className="h-4 w-4" /> : <UserCog className="h-4 w-4" />}
            <span className="sr-only">{isAdmin ? "Switch to Participant Role" : "Switch to Designer Role"}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isAdmin ? "Switch to Participant Role" : "Switch to Designer Role"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
