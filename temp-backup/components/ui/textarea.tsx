import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Optional prop to control textarea variants
   */
  variant?: "sm" | "md" | "lg"
  /**
   * Optional prop to enable auto-resizing
   */
  autoResize?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant = "md", autoResize = false, ...props }, ref) => {
    // Memoized variant classes for better performance
    const variantClasses = React.useMemo(() => {
      switch (variant) {
        case "sm":
          return "min-h-[80px] px-3 py-2 text-sm"
        case "lg":
          return "min-h-[120px] px-4 py-3 text-lg"
        default:
          return "min-h-[100px] px-4 py-3 text-base"
      }
    }, [variant])

    // Auto-resize handler
    const handleResize = React.useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (autoResize) {
        const textarea = event.target
        // Reset height to auto to get accurate scrollHeight
        textarea.style.height = "auto"
        // Set new height based on scrollHeight
        textarea.style.height = `${textarea.scrollHeight}px`
      }
    }, [autoResize])

    // Memoized event handlers for better performance
    const eventHandlers = React.useMemo(() => 
      autoResize ? {
        onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
          handleResize(e)
          props.onChange?.(e)
        },
        onFocus: (e: React.FocusEvent<HTMLTextAreaElement>) => {
          handleResize(e as unknown as React.ChangeEvent<HTMLTextAreaElement>)
          props.onFocus?.(e)
        }
      } : props,
    [autoResize, handleResize, props])

    return (
      <textarea
        ref={ref}
        className={cn(
          // Base styles
          "flex w-full rounded-md border border-input bg-background",
          // Focus and interaction states
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          // Typography and spacing
          variantClasses,
          // Scrollbar styling
          "scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent",
          // Resize behavior
          autoResize ? "resize-none" : "resize-vertical",
          // Enable hardware acceleration for smoother transitions
          "transform-gpu transition-[height,colors] duration-200",
          // Ring color customization for better contrast
          "ring-offset-background",
          // Custom class override
          className
        )}
        {...eventHandlers}
      />
    )
  }
)

// Optimize re-renders by using displayName
Textarea.displayName = "Textarea"

// Export memoized component for better performance
export default React.memo(Textarea)
