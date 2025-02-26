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
      className="border border-[#DFDFDF] rounded-md"
    >
      <ToggleGroupItem 
        value="en" 
        className="px-3 py-2 data-[state=on]:bg-[#E8F4F4] data-[state=on]:text-[#005151] hover:bg-[#E8F4F4] hover:text-[#005151]"
      >
        <div className="flex items-center gap-2">
          <Image src="/flags/en.svg" width={20} height={20} alt="English" />
          <span className="text-sm font-medium">EN</span>
        </div>
      </ToggleGroupItem>
      <ToggleGroupItem 
        value="es" 
        className="px-3 py-2 data-[state=on]:bg-[#E8F4F4] data-[state=on]:text-[#005151] hover:bg-[#E8F4F4] hover:text-[#005151]"
      >
        <div className="flex items-center gap-2">
          <Image src="/flags/es.svg" width={20} height={20} alt="Spanish" />
          <span className="text-sm font-medium">ES</span>
        </div>
      </ToggleGroupItem>
    </ToggleGroup>
  )
} 