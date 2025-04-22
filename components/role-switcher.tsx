"use client"

import * as React from "react"
import { Check, ChevronsUpDown, UserCog, User } from "lucide-react"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"

const roles = [
  {
    value: "designer",
    label: "Assessment Designer",
    path: "/admin",
    icon: UserCog,
  },
  {
    value: "participant",
    label: "Assessment Participant",
    path: "/",
    icon: User,
  },
]

export function RoleSwitcher() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("designer")
  const router = useRouter()

  const selectedRole = roles.find((role) => role.value === value)
  const Icon = selectedRole?.icon || UserCog

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="ml-2 h-8 pl-2 pr-1">
          <Badge variant="outline" className="rounded-sm px-1 font-normal">
            <Icon className="mr-1 h-3.5 w-3.5" />
            <span className="text-xs">Role</span>
          </Badge>
          <ChevronsUpDown className="ml-1 h-3.5 w-3.5 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Switch role..." />
          <CommandList>
            <CommandEmpty>No role found.</CommandEmpty>
            <CommandGroup>
              {roles.map((role) => (
                <CommandItem
                  key={role.value}
                  value={role.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue)
                    setOpen(false)
                    router.push(role.path)
                  }}
                >
                  <role.icon className="mr-2 h-4 w-4" />
                  {role.label}
                  <Check className={cn("ml-auto h-4 w-4", value === role.value ? "opacity-100" : "opacity-0")} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
