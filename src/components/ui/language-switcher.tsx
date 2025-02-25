"use client"

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import Image from "next/image"

interface LanguageSwitcherProps {
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export function LanguageSwitcher({ defaultValue = "en", onValueChange }: LanguageSwitcherProps) {
  return (
    <ToggleGroup 
      type="single" 
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      className="border border-[#DFDFDF] rounded-md p-1 bg-white"
    >
      <ToggleGroupItem 
        value="en" 
        className="flex items-center gap-1.5 px-2 py-1 rounded data-[state=on]:bg-[#F4F4F4]"
        aria-label="Switch to English"
      >
        <Image src="/flags/en.svg" width={20} height={20} alt="English" />
        <span className="text-xs font-medium">EN</span>
      </ToggleGroupItem>
      <ToggleGroupItem 
        value="es" 
        className="flex items-center gap-1.5 px-2 py-1 rounded data-[state=on]:bg-[#F4F4F4]"
        aria-label="Switch to Spanish"
      >
        <Image src="/flags/es.svg" width={20} height={20} alt="Spanish" />
        <span className="text-xs font-medium">ES</span>
      </ToggleGroupItem>
    </ToggleGroup>
  )
} 