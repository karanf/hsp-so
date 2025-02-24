import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
  helperText?: string
  label?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, helperText, label, id, ...props }, ref) => {
    return (
      <div className="flex flex-col">
        {label && (
          <label 
            htmlFor={id}
            className="mb-[4px] font-sans text-[0.875rem] font-normal leading-normal tracking-[0.00938rem] [font-feature-settings:'liga'_off,'clig'_off] text-[#4E4E4E]"
          >
            {label}
          </label>
        )}
        <textarea
          id={id}
          className={cn(
            "flex w-full rounded-md shadow-[inset_0_0_0_1px_#CDCDCD] bg-[#FFF] px-3 py-2 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            "font-sans text-[1rem] font-normal leading-[1.5rem] tracking-[0.00938rem] [font-feature-settings:'liga'_off,'clig'_off] text-[#141414]",
            "placeholder:text-[#767676] placeholder:font-sans placeholder:text-[1rem] placeholder:font-normal placeholder:leading-[1.5rem] placeholder:tracking-[0.00938rem] placeholder:[font-feature-settings:'liga'_off,'clig'_off]",
            "hover:shadow-[inset_0_0_0_1px_#00968F] hover:bg-[#FFF]",
            "focus:shadow-[inset_0_0_0_2px_#007F7A,0px_1px_2px_0px_rgba(39,39,39,0.05),0px_0px_0px_4px_rgba(0,150,143,0.24)] focus:bg-[#FFF]",
            error && "shadow-[inset_0_0_0_1px_#D32F2F] bg-[#FFF] focus:shadow-[inset_0_0_0_2px_#D32F2F,0px_1px_2px_0px_rgba(39,39,39,0.05),0px_0px_0px_4px_rgba(211,47,47,0.24)]",
            className
          )}
          ref={ref}
          {...props}
        />
        {helperText && (
          <span className={cn(
            "mt-[4px] font-sans text-[0.75rem] font-normal leading-[166%] tracking-[0.025rem] [font-feature-settings:'liga'_off,'clig'_off]",
            error ? "text-[#D32F2F]" : "text-[rgba(0,0,0,0.60)]"
          )}>
            {helperText}
          </span>
        )}
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
