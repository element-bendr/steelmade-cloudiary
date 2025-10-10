/**
 * Hook for adding drag-to-scroll functionality to carousels
 */
import { useState, useEffect, useRef, RefObject, useCallback } from "react"

interface UseCarouselDragProps {
  ref: RefObject<HTMLDivElement>;
  onScroll?: (position: number) => void;
  onDragLeft?: () => void;
  onDragRight?: () => void;
}

export function useCarouselDrag({ ref, onScroll, onDragLeft, onDragRight }: UseCarouselDragProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [startScrollLeft, setStartScrollLeft] = useState(0)

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return
    
    setIsDragging(true)
    setStartX(e.pageX - ref.current.offsetLeft)
    setStartScrollLeft(ref.current.scrollLeft)
    document.body.style.cursor = 'grabbing'
  }, [ref])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!ref.current) return
    
    setIsDragging(true)
    setStartX(e.touches[0].pageX - ref.current.offsetLeft)
    setStartScrollLeft(ref.current.scrollLeft)
  }, [ref])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !ref.current) return
    e.preventDefault()
    
    const x = e.pageX - ref.current.offsetLeft
    const walk = (x - startX) * 2
    const newScrollLeft = startScrollLeft - walk
    
    ref.current.scrollLeft = newScrollLeft
    if (onScroll) onScroll(newScrollLeft)
    
    // Handle drag direction events
    if (walk > 100 && onDragLeft) {
      onDragLeft()
      setIsDragging(false)
    } else if (walk < -100 && onDragRight) {
      onDragRight()
      setIsDragging(false)
    }
  }, [isDragging, startX, startScrollLeft, ref, onScroll, onDragLeft, onDragRight])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging || !ref.current) return
    
    const x = e.touches[0].pageX - ref.current.offsetLeft
    const walk = (x - startX) * 2
    const newScrollLeft = startScrollLeft - walk
    
    ref.current.scrollLeft = newScrollLeft
    if (onScroll) onScroll(newScrollLeft)
    
    // Handle drag direction events
    if (walk > 100 && onDragLeft) {
      onDragLeft()
      setIsDragging(false)
    } else if (walk < -100 && onDragRight) {
      onDragRight()
      setIsDragging(false)
    }
  }, [isDragging, startX, startScrollLeft, ref, onScroll, onDragLeft, onDragRight])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
    document.body.style.cursor = ''
  }, [])

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("touchmove", handleTouchMove, { passive: false })
    document.addEventListener("touchend", handleMouseUp)
    
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("touchmove", handleTouchMove)
      document.removeEventListener("touchend", handleMouseUp)
    }
  }, [handleMouseMove, handleTouchMove, handleMouseUp])

  return {
    isDragging,
    dragProps: {
      onMouseDown: handleMouseDown,
      onTouchStart: handleTouchStart
    }
  }
}
