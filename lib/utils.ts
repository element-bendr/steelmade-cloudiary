import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Returns the input string with the first character capitalized.
 * Optimized for short strings and avoids locale overhead.
 */
export function capitalize(input: string): string {
  if (!input) return ""
  const first = input.charAt(0)
  if (first >= "a" && first <= "z")
    return String.fromCharCode(first.charCodeAt(0) - 32) + input.slice(1)
  return input
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
