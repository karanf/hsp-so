// Theme-v1: Component Style Variants

export const buttonVariants = {
  default: "shadow-[inset_0_0_0_1px_#007F7A] bg-[#007F7A] text-[#FFFFFF] [&>svg]:text-[#FFFFFF] hover:shadow-[inset_0_0_0_1px_#2CD5C4] hover:bg-[#005151] focus:shadow-[inset_0_0_0_2px_#007F7A,0px_1px_2px_0px_rgba(39,39,39,0.05),0px_0px_0px_4px_rgba(0,150,143,0.24)] focus:bg-[#007F7A] disabled:shadow-[inset_0_0_0_1px_#DFDFDF] disabled:bg-[#F9F9F9] disabled:text-[#767676] disabled:cursor-not-allowed",
  destructive: "shadow-[inset_0_0_0_1px_#D32F2F] bg-[#FFF] text-[#D32F2F] [&>svg]:text-[#D32F2F] hover:shadow-[inset_0_0_0_1px_#C62828] hover:bg-[#FEEBEE] focus:shadow-[inset_0_0_0_2px_#EF5350,0px_1px_2px_0px_rgba(39,39,39,0.05),0px_0px_0px_4px_rgba(211,47,47,0.30)] focus:bg-[#FFF] disabled:shadow-[inset_0_0_0_1px_#DFDFDF] disabled:bg-[#F9F9F9] disabled:text-[#767676] disabled:cursor-not-allowed",
  tertiary: "shadow-[inset_0_0_0_1px_#2CD5C4] bg-[#FFF] text-[#007F7A] [&>svg]:text-[#007F7A] hover:shadow-[inset_0_0_0_1px_#8AE5DC] hover:bg-[#E8F4F4] focus:shadow-[inset_0_0_0_2px_#2CD5C4,0px_1px_2px_0px_rgba(39,39,39,0.05),0px_0px_0px_4px_rgba(0,150,143,0.24)] focus:bg-[#FFF] disabled:shadow-[inset_0_0_0_1px_#DFDFDF] disabled:bg-[#F9F9F9] disabled:text-[#767676] disabled:cursor-not-allowed",
  secondary: "shadow-[inset_0_0_0_1px_#DFDFDF] bg-[#FFF] text-[#767676] [&>svg]:text-[#767676] hover:shadow-[inset_0_0_0_1px_#B3B3B3] hover:bg-[#E8E8E8] focus:shadow-[inset_0_0_0_2px_#DFDFDF,0px_1px_2px_0px_rgba(39,39,39,0.05),0px_0px_0px_4px_rgba(137,137,137,0.14)] focus:bg-[#EBEBEB] disabled:shadow-[inset_0_0_0_1px_#DFDFDF] disabled:bg-[#F9F9F9] disabled:text-[#767676] disabled:cursor-not-allowed",
  ghost: "hover:bg-accent hover:text-accent-foreground disabled:shadow-[inset_0_0_0_1px_#DFDFDF] disabled:bg-[#F9F9F9] disabled:text-[#767676] disabled:cursor-not-allowed",
  link: "text-primary underline-offset-4 hover:underline disabled:shadow-[inset_0_0_0_1px_#DFDFDF] disabled:bg-[#F9F9F9] disabled:text-[#767676] disabled:cursor-not-allowed"
}

export const inputStyles = {
  base: "flex h-10 w-full rounded-md shadow-[inset_0_0_0_1px_#CDCDCD] bg-[#FFF] px-3 py-2 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  typography: "font-sans text-[1rem] font-normal leading-[1.5rem] tracking-[0.00938rem] [font-feature-settings:'liga'_off,'clig'_off] text-[#141414]",
  placeholder: "placeholder:text-[#767676] placeholder:font-sans placeholder:text-[1rem] placeholder:font-normal placeholder:leading-[1.5rem] placeholder:tracking-[0.00938rem] placeholder:[font-feature-settings:'liga'_off,'clig'_off]",
  hover: "hover:shadow-[inset_0_0_0_1px_#00968F] hover:bg-[#FFF]",
  focus: "focus:shadow-[inset_0_0_0_2px_#007F7A,0px_1px_2px_0px_rgba(39,39,39,0.05),0px_0px_0px_4px_rgba(0,150,143,0.24)] focus:bg-[#FFF]",
  error: "shadow-[inset_0_0_0_1px_#D32F2F] bg-[#FFF] focus:shadow-[inset_0_0_0_2px_#D32F2F,0px_1px_2px_0px_rgba(39,39,39,0.05),0px_0px_0px_4px_rgba(211,47,47,0.24)]"
}

export const textareaStyles = {
  ...inputStyles
}

export const selectStyles = {
  trigger: {
    base: "flex h-10 w-full items-center justify-between rounded-md shadow-[inset_0_0_0_1px_#CDCDCD] bg-[#FFF] px-3 py-2 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
    typography: "font-sans text-[1rem] font-normal leading-[1.5rem] tracking-[0.00938rem] [font-feature-settings:'liga'_off,'clig'_off] text-[#141414]",
    placeholder: "placeholder:text-[#767676] placeholder:font-sans placeholder:text-[1rem] placeholder:font-normal placeholder:leading-[1.5rem] placeholder:tracking-[0.00938rem] placeholder:[font-feature-settings:'liga'_off,'clig'_off]",
    hover: "hover:shadow-[inset_0_0_0_1px_#00968F] hover:bg-[#FFF]",
    focus: "focus:shadow-[inset_0_0_0_2px_#007F7A,0px_1px_2px_0px_rgba(39,39,39,0.05),0px_0px_0px_4px_rgba(0,150,143,0.24)] focus:bg-[#FFF]"
  },
  content: "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  item: "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
}

export const alertVariants = {
  info: "border border-[#0288D1] bg-[#E5F6FD] text-[#014361] [&>svg]:text-[#0288D1]",
  warning: "border border-[#EF6C00] bg-[#FFF4E5] text-[#663C00] [&>svg]:text-[#EF6C00]",
  error: "border border-[#D32F2F] bg-[#FDEDED] text-[#5F2120] [&>svg]:text-[#D32F2F]",
  success: "border border-[#2E7D32] bg-[#EDF7ED] text-[#1E4620] [&>svg]:text-[#2E7D32]"
}

export const radioStyles = {
  base: "aspect-square h-4 w-4 rounded-full border border-[#CDCDCD] bg-[#FFF] shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-[#007F7A] disabled:cursor-not-allowed disabled:opacity-50",
  hover: "hover:border-[#00968F]",
  checked: "data-[state=checked]:border-[#00968F] data-[state=checked]:bg-[#FFF]",
  indicator: "h-2.5 w-2.5 fill-[#00968F] text-[#00968F]"
}

export const checkboxStyles = {
  base: "peer h-4 w-4 shrink-0 rounded border border-[#CDCDCD] bg-[#FFF] shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#007F7A] disabled:cursor-not-allowed disabled:opacity-50",
  hover: "hover:border-[#00968F]",
  checked: "data-[state=checked]:border-[#00968F] data-[state=checked]:bg-[#00968F]",
  indicator: "flex items-center justify-center text-[#FFF]"
}

export const tabsStyles = {
  list: "flex p-2 items-center gap-2 self-stretch rounded-lg bg-[#F9F9F9]",
  trigger: {
    base: "flex py-2 px-3 flex-row justify-center items-center flex-1 rounded-lg border border-[#DFDFDF] bg-[#FFF]",
    typography: "text-[#767676] font-sans text-[0.8125rem] font-bold leading-[1.25rem] tracking-[0.02875rem]",
    hover: "hover:border-[#B3B3B3] hover:bg-[#E8E8E8]",
    active: "data-[state=active]:border-2 data-[state=active]:border-[#2CD5C4] data-[state=active]:bg-[#FFF] data-[state=active]:shadow-[0px_0px_0px_4px_rgba(0,150,143,0.24)] data-[state=active]:text-[#007F7A]"
  }
}

export const labelStyles = {
  base: "font-sans text-[0.875rem] font-normal leading-normal tracking-[0.00938rem] [font-feature-settings:'liga'_off,'clig'_off]",
  default: "text-[#4E4E4E]",
  error: "text-[#D32F2F]"
}

// Helper text styles
export const helperTextStyles = {
  base: "mt-[4px] font-sans text-[0.75rem] font-normal leading-[166%] tracking-[0.025rem] [font-feature-settings:'liga'_off,'clig'_off]",
  default: "text-[rgba(0,0,0,0.60)]",
  error: "text-[#D32F2F]"
}

export const dropdownMenuStyles = {
  content: {
    base: "z-50 min-w-[8rem] overflow-hidden rounded-md border border-[#E8E8E8] bg-gradient-to-r from-white/10 via-white/30 to-white/10 backdrop-blur-[10px] p-1 text-popover-foreground shadow-elevation-3",
    animation: "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
  },
  item: {
    base: "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors bg-transparent shadow-elevation-2",
    hover: "hover:bg-white/60 focus:bg-white/60",
    disabled: "data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
  }
} 