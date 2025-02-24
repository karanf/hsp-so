import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none [&>svg]:h-6 [&>svg]:w-6",
  {
    variants: {
      variant: {
        default:
          "shadow-[inset_0_0_0_1px_#007F7A] bg-[#007F7A] text-[#FFFFFF] [&>svg]:text-[#FFFFFF] hover:shadow-[inset_0_0_0_1px_#2CD5C4] hover:bg-[#005151] focus:shadow-[inset_0_0_0_2px_#007F7A,0px_1px_2px_0px_rgba(39,39,39,0.05),0px_0px_0px_4px_rgba(0,150,143,0.24)] focus:bg-[#007F7A] disabled:shadow-[inset_0_0_0_1px_#DFDFDF] disabled:bg-[#F9F9F9] disabled:text-[#767676] disabled:cursor-not-allowed",
        destructive:
          "shadow-[inset_0_0_0_1px_#D32F2F] bg-[#FFF] text-[#D32F2F] [&>svg]:text-[#D32F2F] hover:shadow-[inset_0_0_0_1px_#C62828] hover:bg-[#FEEBEE] focus:shadow-[inset_0_0_0_2px_#EF5350,0px_1px_2px_0px_rgba(39,39,39,0.05),0px_0px_0px_4px_rgba(211,47,47,0.30)] focus:bg-[#FFF] disabled:shadow-[inset_0_0_0_1px_#DFDFDF] disabled:bg-[#F9F9F9] disabled:text-[#767676] disabled:cursor-not-allowed",
        tertiary:
          "shadow-[inset_0_0_0_1px_#2CD5C4] bg-[#FFF] text-[#007F7A] [&>svg]:text-[#007F7A] hover:shadow-[inset_0_0_0_1px_#8AE5DC] hover:bg-[#E8F4F4] focus:shadow-[inset_0_0_0_2px_#2CD5C4,0px_1px_2px_0px_rgba(39,39,39,0.05),0px_0px_0px_4px_rgba(0,150,143,0.24)] focus:bg-[#FFF] disabled:shadow-[inset_0_0_0_1px_#DFDFDF] disabled:bg-[#F9F9F9] disabled:text-[#767676] disabled:cursor-not-allowed",
        secondary:
          "shadow-[inset_0_0_0_1px_#DFDFDF] bg-[#FFF] text-[#767676] [&>svg]:text-[#767676] hover:shadow-[inset_0_0_0_1px_#B3B3B3] hover:bg-[#E8E8E8] focus:shadow-[inset_0_0_0_2px_#DFDFDF,0px_1px_2px_0px_rgba(39,39,39,0.05),0px_0px_0px_4px_rgba(137,137,137,0.14)] focus:bg-[#EBEBEB] disabled:shadow-[inset_0_0_0_1px_#DFDFDF] disabled:bg-[#F9F9F9] disabled:text-[#767676] disabled:cursor-not-allowed",
        ghost: "hover:bg-accent hover:text-accent-foreground disabled:shadow-[inset_0_0_0_1px_#DFDFDF] disabled:bg-[#F9F9F9] disabled:text-[#767676] disabled:cursor-not-allowed",
        link: "text-primary underline-offset-4 hover:underline disabled:shadow-[inset_0_0_0_1px_#DFDFDF] disabled:bg-[#F9F9F9] disabled:text-[#767676] disabled:cursor-not-allowed",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3 py-2",
        lg: "h-11 px-8 py-2",
        icon: "h-10 w-10 p-0",
      },
      isIcon: {
        true: "p-0 aspect-square",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      isIcon: false,
    },
    compoundVariants: [
      {
        isIcon: true,
        size: "default",
        className: "h-10 w-10"
      },
      {
        isIcon: true,
        size: "sm",
        className: "h-9 w-9"
      },
      {
        isIcon: true,
        size: "lg",
        className: "h-11 w-11"
      }
    ]
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isIcon?: boolean
  leadingElement?: React.ReactNode
  trailingElement?: React.ReactNode
  fullWidth?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isIcon = false, asChild = false, children, leadingElement, trailingElement, fullWidth = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, isIcon, className }),
          !isIcon && "relative",
          !isIcon && (leadingElement || trailingElement) && "gap-2",
          fullWidth && "w-full",
          className
        )}
        ref={ref}
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
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
