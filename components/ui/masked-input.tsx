"use client"

import type React from "react"
import { forwardRef } from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export interface MaskedInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  mask: (value: string) => string
  onChange?: (value: string, maskedValue: string) => void
  className?: string
}

const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>(
  ({ className, mask, onChange, value = "", ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value
      const maskedValue = mask(inputValue)

      if (onChange) {
        onChange(inputValue.replace(/\D/g, ""), maskedValue)
      }
    }

    return (
      <Input {...props} ref={ref} value={mask(value as string)} onChange={handleChange} className={cn(className)} />
    )
  },
)

MaskedInput.displayName = "MaskedInput"

export { MaskedInput }
