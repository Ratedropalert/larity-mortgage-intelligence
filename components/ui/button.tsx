import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
        const variants = {
            primary: "bg-accent text-accent-foreground shadow-lg shadow-accent/20 hover:opacity-90",
            outline: "border border-border bg-background hover:bg-muted text-foreground",
            ghost: "hover:bg-muted text-muted-foreground hover:text-foreground"
        }

        const sizes = {
            sm: "px-3 py-1.5 text-xs",
            md: "px-5 py-2.5 text-sm",
            lg: "px-8 py-4 text-base"
        }

        return (
            <button
                className={cn(
                    "inline-flex items-center justify-center rounded-full font-medium transition-all active:scale-95 disabled:pointer-events-none disabled:opacity-50",
                    variants[variant],
                    sizes[size],
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
