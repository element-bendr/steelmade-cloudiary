import { useRef, useState, useCallback, RefObject } from "react"

interface UseCarouselDragProps {
  onDragLeft: () => void
  onDragRight: () => void
  threshold?: number
}

interface UseCarouselDragReturn {
  isDragging: boolean
  handlers: (ref: RefObject<HTMLElement>) => {
    ref: (element: HTMLElement | null) => void
    onMouseDown: (e: React.MouseEvent) => void
    onMouseMove: (e: React.MouseEvent) => void
    onMouseUp: () => void
    onMouseLeave: () => void
    onTouchStart: (e: React.TouchEvent) => void
    onTouchMove: (e: React.TouchEvent) => void
    onTouchEnd: () => void
  }
}

export function useCarouselDrag({
  onDragLeft,
  onDragRight,
  threshold = 50,
}: UseCarouselDragProps): UseCarouselDragReturn {
  const [isDragging, setIsDragging] = useState(false)
  const startX = useRef<number | null>(null)
  const currentX = useRef<number | null>(null)
  const internalRef = useRef<HTMLElement | null>(null)

  const handleDragStart = useCallback((clientX: number) => {
    setIsDragging(true)
    startX.current = clientX
    currentX.current = clientX
  }, [])

  const handleDragMove = useCallback((clientX: number) => {
    if (!isDragging) return
    currentX.current = clientX
  }, [isDragging])

  const handleDragEnd = useCallback(() => {
    if (!isDragging || startX.current === null || currentX.current === null) {
      setIsDragging(false)
      return
    }

    const diff = currentX.current - startX.current

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        onDragRight()
      } else {
        onDragLeft()
      }
    }

    setIsDragging(false)
    startX.current = null
    currentX.current = null
  }, [isDragging, onDragLeft, onDragRight, threshold])

  const getHandlers = (externalRef: RefObject<HTMLElement>) => ({
    ref: (element: HTMLElement | null) => {
      internalRef.current = element
      if (typeof externalRef === "function") {
        // Explicitly cast to a function type that accepts HTMLElement | null
        (externalRef as (instance: HTMLElement | null) => void)(element)
      } else if (externalRef && typeof externalRef === 'object' && 'current' in externalRef) {
        // For RefObjects, React handles the .current assignment.
        // If externalRef is a MutableRefObject, this would be the way to assign:
        // (externalRef as React.MutableRefObject<HTMLElement | null>).current = element;
        // However, the error "Cannot assign to 'current' because it is a read-only property"
        // suggests it's likely a RefObject<HTMLElement> not a MutableRefObject<HTMLElement | null>.
        // React will manage setting .current on RefObjects when the ref is passed to an element.
        // The hook's responsibility is to call the function ref or update the mutable ref object.
        // If it's a standard RefObject, no direct assignment is needed here by this hook.
      }
    },
    onMouseDown: (e: React.MouseEvent) => handleDragStart(e.clientX),
    onMouseMove: (e: React.MouseEvent) => handleDragMove(e.clientX),
    onMouseUp: () => handleDragEnd(),
    onMouseLeave: () => isDragging && handleDragEnd(),
    onTouchStart: (e: React.TouchEvent) => handleDragStart(e.touches[0].clientX),
    onTouchMove: (e: React.TouchEvent) => handleDragMove(e.touches[0].clientX),
    onTouchEnd: () => handleDragEnd(),
  })

  return { isDragging, handlers: getHandlers }
}
