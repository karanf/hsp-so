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
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          role="combobox"
          className="w-[100px] justify-between font-normal"
          onFocus={onFocus}
          disabled={disabled}
        >
          <div className="flex items-center gap-2">
            <div className="relative w-5 h-5">
              <Image
                src={countries.find(c => c.value === value)?.flag || "/flags/US.svg"}
                alt={`${countries.find(c => c.value === value)?.label || "United States"} flag`}
                fill
                className="object-cover rounded-sm"
              />
            </div>
            +{getCountryCallingCode(value || "us")}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-[200px]" align="start">
        <Command className="bg-transparent">
          <CommandInput placeholder="Search country..." className="bg-transparent" />
          <CommandEmpty>No country found.</CommandEmpty>
          <CommandGroup>
            {countries.sort((a, b) => a.label.localeCompare(b.label)).map((country) => (
              <CommandItem
                key={country.value}
                value={country.value}
                className={cn(popoverStyles.item.base, popoverStyles.item.hover)}
                onSelect={(currentValue) => {
                  onValueChange(currentValue)
                  const popoverTrigger = document.querySelector('[role="combobox"]') as HTMLElement
                  if (popoverTrigger) popoverTrigger.blur()
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
                  +{getCountryCallingCode(country.value)} {country.label}
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