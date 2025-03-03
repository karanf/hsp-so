"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { popoverStyles } from "@/themes/theme-v1"

interface State {
  value: string
  label: string
}

interface StateComboboxProps {
  states: State[]
  value?: string
  onValueChange: (value: string) => void
  disabled?: boolean
  onFocus?: () => void
}

export function StateCombobox({ states, value, onValueChange, disabled, onFocus }: StateComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [highlightedIndex, setHighlightedIndex] = React.useState(0)
  const [search, setSearch] = React.useState("")
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const isTabbing = React.useRef(false)
  const sortedStates = React.useMemo(() => 
    states.sort((a, b) => a.label.localeCompare(b.label)), 
    [states]
  )

  const filteredStates = React.useMemo(() => {
    if (!search.trim()) return sortedStates
    const searchTerm = search.toLowerCase().trim()
    return sortedStates.filter(state => {
      const label = state.label.toLowerCase()
      return label.includes(searchTerm)
    })
  }, [sortedStates, search])

  // Reset highlight index when filtered results change
  React.useEffect(() => {
    setHighlightedIndex(0)
  }, [filteredStates])

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

    const maxIndex = filteredStates.length - 1
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
        const selectedState = filteredStates[highlightedIndex]
        if (selectedState) {
          onValueChange(selectedState.value)
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
              <span className="truncate">
                {value ? sortedStates.find(s => s.value === value)?.label || "Select..." : "Select..."}
              </span>
            </div>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="min-w-[200px]" align="start">
        <Command className="bg-transparent">
          <CommandInput 
            placeholder="Search state..." 
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
          <CommandEmpty>No state found.</CommandEmpty>
          <CommandGroup className="max-h-[250px] overflow-y-auto">
            {filteredStates.map((state, index) => {
              const isHighlighted = index === highlightedIndex
              return (
                <CommandItem
                  key={state.value}
                  value={state.value}
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
                  {state.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === state.value ? "opacity-100" : "opacity-0"
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