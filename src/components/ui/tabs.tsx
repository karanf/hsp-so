"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "flex p-2 items-center gap-2 self-stretch rounded-lg bg-[#F9F9F9]",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    leadingElement?: React.ReactNode
    trailingElement?: React.ReactNode
    fullWidth?: boolean
  }
>(({ className, children, leadingElement, trailingElement, fullWidth = false, ...props }, ref) => {
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex py-2 px-3 flex-row justify-center items-center flex-1 rounded-lg border border-[#DFDFDF] bg-[#FFF]",
        "text-[#767676] font-sans text-[0.8125rem] font-semibold leading-[1.25rem] tracking-[0.02875rem]",
        "hover:border-[#B3B3B3] hover:bg-[#E8E8E8]",
        "data-[state=active]:border-2 data-[state=active]:border-[#2CD5C4] data-[state=active]:bg-[#FFF] data-[state=active]:shadow-[0px_0px_0px_4px_rgba(0,150,143,0.24)] data-[state=active]:text-[#007F7A]",
        "focus-visible:outline-none",
        "relative",
        (leadingElement || trailingElement) && "gap-2",
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {leadingElement && <span className="flex shrink-0">{leadingElement}</span>}
      <span className={cn(
        "flex items-center justify-center",
        fullWidth && "flex-1"
      )}>
        {children}
      </span>
      {trailingElement && <span className="flex shrink-0">{trailingElement}</span>}
    </TabsPrimitive.Trigger>
  );
})
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
