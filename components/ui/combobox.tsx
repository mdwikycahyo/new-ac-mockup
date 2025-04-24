"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export type ComboboxOption = {
  value: string
  label: string
}

interface ComboboxProps {
  options: ComboboxOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  emptyMessage?: string
  className?: string
  onCreateNew?: (value: string) => void
}

export function Combobox({
  options,
  value,
  onChange,
  placeholder = "Select option...",
  emptyMessage = "No results found.",
  className,
  onCreateNew,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState("")

  const sortedOptions = React.useMemo(() => {
    return [...options].sort((a, b) => a.label.localeCompare(b.label))
  }, [options])

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
  }

  const handleCreateNew = () => {
    if (onCreateNew && searchTerm) {
      onCreateNew(searchTerm)
      setOpen(false)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
        >
          {value ? sortedOptions.find((option) => option.value === value)?.label || value : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          <CommandInput placeholder="Search..." onValueChange={handleSearchChange} value={searchTerm} />
          <CommandList>
            <CommandEmpty>
              {emptyMessage}
              {onCreateNew && (
                <Button variant="ghost" className="mt-2 w-full justify-start" onClick={handleCreateNew}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add "{searchTerm}"
                </Button>
              )}
            </CommandEmpty>
            <CommandGroup>
              {sortedOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => {
                    onChange(option.value)
                    setOpen(false)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === option.value ? "opacity-100" : "opacity-0")} />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
