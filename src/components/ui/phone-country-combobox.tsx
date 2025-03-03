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

interface PhoneCountryComboboxProps {
  countries: Country[]
  value?: string
  onValueChange: (value: string) => void
  getCountryCallingCode: (countryCode: string) => string
  disabled?: boolean
  onFocus?: () => void
}

export function PhoneCountryCombobox({ 
  countries, 
  value, 
  onValueChange, 
  getCountryCallingCode,
  disabled, 
  onFocus 
}: PhoneCountryComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [highlightedIndex, setHighlightedIndex] = React.useState(0)
  const [search, setSearch] = React.useState("")
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const isTabbing = React.useRef(false)
  const sortedCountries = React.useMemo(() => 
    countries.sort((a, b) => a.label.localeCompare(b.label)), 
    [countries]
  )

  const filteredCountries = React.useMemo(() => {
    if (!search.trim()) return sortedCountries
    const searchTerm = search.toLowerCase().trim()
    return sortedCountries.filter(country => {
      const label = country.label.toLowerCase()
      const value = country.value.toLowerCase()
      const callingCode = getCountryCallingCode(country.value)
      return value === searchTerm || label.startsWith(searchTerm) || callingCode.includes(searchTerm)
    })
  }, [sortedCountries, search, getCountryCallingCode])

  // Reset highlight index when filtered results change
  React.useEffect(() => {
    setHighlightedIndex(0)
  }, [filteredCountries])

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

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen)
    if (!isOpen) {
      setSearch("")
    }
    if (isOpen && onFocus) {
      onFocus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) return

    const maxIndex = filteredCountries.length - 1
    if (maxIndex < 0) return // No results to navigate

    switch (e.key) {
      case "ArrowDown":
      case "ArrowUp":
        e.preventDefault()
        const direction = e.key === "ArrowDown" ? 1 : -1
        setHighlightedIndex((prev) => {
          const next = prev + direction
          if (next < 0) return maxIndex
          if (next > maxIndex) return 0
          return next
        })
        break
      case "Enter":
        e.preventDefault()
        const selectedCountry = filteredCountries[highlightedIndex]
        if (selectedCountry) {
          onValueChange(selectedCountry.value)
          setOpen(false)
          setSearch("")
        }
        break
    }
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
              <div className="flex items-center gap-2">
                <div className="relative w-5 h-5 flex-shrink-0">
                  <Image
                    src={countries.find(c => c.value === value)?.flag || "/flags/US.svg"}
                    alt={`${countries.find(c => c.value === value)?.label || "United States"} flag`}
                    fill
                    className="object-cover rounded-sm"
                    priority
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.src = "/flags/US.svg";
                    }}
                  />
                </div>
                <span className="truncate">+{getCountryCallingCode(value || "us")}</span>
              </div>
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
            value={search}
            onValueChange={setSearch}
            onKeyDown={(e) => {
              if (e.key === "Tab") {
                e.preventDefault()
                setOpen(false)
                const nextElement = findFocusableElement(buttonRef.current, !e.shiftKey)
                if (nextElement) nextElement.focus()
              } else {
                handleKeyDown(e)
              }
            }}
          />
          <CommandEmpty>No country found.</CommandEmpty>
          <CommandGroup className="max-h-[250px] overflow-y-auto">
            {filteredCountries.map((country, index) => {
              const isHighlighted = index === highlightedIndex
              return (
                <CommandItem
                  key={country.value}
                  value={country.value}
                  className={cn(
                    popoverStyles.item.base, 
                    popoverStyles.item.hover,
                    isHighlighted && "bg-accent"
                  )}
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
                        priority
                        onError={(e) => {
                          const img = e.target as HTMLImageElement;
                          img.src = "/flags/US.svg";
                        }}
                      />
                    </div>
                    +{getCountryCallingCode(country.value)} {country.label}
                  </div>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === country.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              )
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
} 