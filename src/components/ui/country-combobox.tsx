"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { popoverStyles } from "@/themes/theme-v1"
import Image from "next/image"

interface Country {
  value: string
  label: string
  flag: string
}

interface CountryComboboxProps {
  countries: Country[]
  value?: string
  onValueChange: (value: string) => void
  disabled?: boolean
  onFocus?: () => void
}

export function CountryCombobox({ countries, value, onValueChange, disabled, onFocus }: CountryComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const isTabbing = React.useRef(false)

  const findFocusableElement = (node: HTMLElement | null, forward: boolean): HTMLElement | null => {
    if (!node) return null
    
    // Get the root form element or document body as the boundary
    const root = node.closest('form') || document.body
    
    // Get all focusable elements
    const focusable = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    const elements = Array.from(root.querySelectorAll(focusable)) as HTMLElement[]
    
    // Find current element index
    const currentIndex = elements.findIndex(el => el === buttonRef.current)
    
    // Get next/previous element
    const targetIndex = forward ? currentIndex + 1 : currentIndex - 1
    return elements[targetIndex] || null
  }

  const handleFocus = () => {
    setOpen(true)
    onFocus?.()
  }

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen)
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <div className="w-full">
        <PopoverTrigger asChild>
          <Button
            ref={buttonRef}
            variant="secondary"
            role="combobox"
            className="w-full justify-between font-normal pr-3"
            onFocus={handleFocus}
            onKeyDown={(e) => {
              if (e.key === "Tab" && e.shiftKey) {
                const prevElement = findFocusableElement(buttonRef.current, false)
                if (prevElement) {
                  e.preventDefault()
                  setOpen(false)
                  prevElement.focus()
                }
              }
            }}
            disabled={disabled}
            style={{ textAlign: "left" }}
            fullWidth
          >
            <div className="flex-1">
              {value ? (
                <div className="flex items-left gap-2">
                  <div className="relative w-5 h-5 flex-shrink-0">
                    <Image
                      src={countries.find(c => c.value === value)?.flag || "/flags/US.svg"}
                      alt={`${countries.find(c => c.value === value)?.label || "United States"} flag`}
                      fill
                      className="object-cover rounded-sm"
                    />
                  </div>
                  <span className="truncate">{countries.find(c => c.value === value)?.label || "Select..."}</span>
                </div>
              ) : (
                "Select..."
              )}
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="min-w-[200px]" align="start">
        <Command className="bg-transparent">
          <CommandInput 
            placeholder="Search country..." 
            className="bg-transparent"
            onKeyDown={(e) => {
              if (e.key === "Tab") {
                e.preventDefault()
                setOpen(false)
                const nextElement = findFocusableElement(buttonRef.current, !e.shiftKey)
                if (nextElement) nextElement.focus()
              }
            }}
          />
          <CommandEmpty>No country found.</CommandEmpty>
          <CommandGroup className="max-h-[250px] overflow-y-auto">
            {countries.sort((a, b) => a.label.localeCompare(b.label)).map((country) => (
              <CommandItem
                key={country.value}
                value={country.value}
                className={cn(popoverStyles.item.base, popoverStyles.item.hover)}
                onSelect={(currentValue) => {
                  onValueChange(currentValue)
                  setOpen(false)
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="relative w-5 h-5">
                    <Image
                      src={country.flag}
                      alt={`${country.label} flag`}
                      fill
                      className="object-cover rounded-sm"
                    />
                  </div>
                  {country.label}
                </div>
                <Check
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === country.value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
} 