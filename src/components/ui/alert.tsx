import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Info, AlertCircle, CheckCircle2, AlertTriangle } from "lucide-react"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-[0.5rem] px-4 py-3 text-sm flex gap-3 items-start",
  {
    variants: {
      variant: {
        info: "border border-[#0288D1] bg-[#E5F6FD] text-[#014361] [&>svg]:text-[#0288D1]",
        warning: "border border-[#EF6C00] bg-[#FFF4E5] text-[#663C00] [&>svg]:text-[#EF6C00]",
        error: "border border-[#D32F2F] bg-[#FDEDED] text-[#5F2120] [&>svg]:text-[#D32F2F]",
        success: "border border-[#2E7D32] bg-[#EDF7ED] text-[#1E4620] [&>svg]:text-[#2E7D32]",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant = "info", ...props }, ref) => {
  const icons = {
    info: Info,
    warning: AlertTriangle,
    error: AlertCircle,
    success: CheckCircle2,
  }
  
  const IconComponent = icons[variant as keyof typeof icons] || Info

  return (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
    >
      <IconComponent className="h-5 w-5 mt-[2px]" />
      <div className="w-full">{props.children}</div>
    </div>
  )
})
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
