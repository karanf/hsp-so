"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

interface LanguageSwitcherProps {
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export function LanguageSwitcher({ defaultValue = "en", onValueChange }: LanguageSwitcherProps) {
  return (
    <Tabs defaultValue={defaultValue} onValueChange={onValueChange} className="bg-transparent">
      <TabsList className="bg-transparent">
        <TabsTrigger value="en">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 relative">
              <Image
                src="/flags/GB.svg"
                alt="English"
                fill
                className="object-cover rounded-sm"
              />
            </div>
            <span>EN</span>
          </div>
        </TabsTrigger>
        <TabsTrigger value="es">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 relative">
              <Image
                src="/flags/es.svg"
                alt="Spanish"
                fill
                className="object-cover rounded-sm"
              />
            </div>
            <span>ES</span>
          </div>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
} 