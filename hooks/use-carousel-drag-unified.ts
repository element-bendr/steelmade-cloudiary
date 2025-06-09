import { useState, useRef, RefObject } from 'react';

interface UseCarouselDragProps {
  externalRef?: RefObject<HTMLElement>;
  onScroll?: (position: number) => void;
}

interface UseCarouselDragReturn {
  dragProps: {
    onMouseDown: (e: React.MouseEvent) => void;
    onTouchStart: (e: React.TouchEvent) => void;
  };
}

/**
 * A hook that adds drag-to-scroll functionality to carousels
 */
export function useCarouselDrag({ 
  externalRef, 
  onScroll 
}: UseCarouselDragProps = {}): UseCarouselDragReturn {
  const internalRef = useRef<HTMLElement>(null);
  const ref = externalRef || internalRef;
  
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!ref.current) return;
    
    setIsDragging(true);
    setStartX(e.pageX - ref.current.offsetLeft);
    setStartScrollLeft(ref.current.scrollLeft);
    document.body.style.cursor = 'grabbing';
  };

  const onTouchStart = (e: React.TouchEvent) => {
    if (!ref.current) return;
    
    setIsDragging(true);
    setStartX(e.touches[0].pageX - ref.current.offsetLeft);
    setStartScrollLeft(ref.current.scrollLeft);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging || !ref.current) return;
    e.preventDefault();
    
    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - startX) * 2;
    const newScrollLeft = startScrollLeft - walk;
    
    ref.current.scrollLeft = newScrollLeft;
    if (onScroll) onScroll(newScrollLeft);
  };

  const onTouchMove = (e: TouchEvent) => {
    if (!isDragging || !ref.current) return;
    
    const x = e.touches[0].pageX - ref.current.offsetLeft;
    const walk = (x - startX) * 2;
    const newScrollLeft = startScrollLeft - walk;
    
    ref.current.scrollLeft = newScrollLeft;
    if (onScroll) onScroll(newScrollLeft);
  };

  const onMouseUp = () => {
    setIsDragging(false);
    document.body.style.cursor = '';
  };

  const onMouseLeave = () => {
    setIsDragging(false);
    document.body.style.cursor = '';
  };

  // Add and remove event listeners
  useState(() => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onMouseUp);
    };
  });

  return { 
    dragProps: { 
      onMouseDown, 
      onTouchStart 
    } 
  };
}