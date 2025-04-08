import React, { useState, useEffect, useRef } from 'react';
import { useFloorplan } from '@/context/FloorplanContext';
import { CanvasElement as CanvasElementType } from '@/types';

interface CanvasElementProps {
  element: CanvasElementType;
  scale: number;
  panOffset: { x: number; y: number };
}

export const CanvasElement: React.FC<CanvasElementProps> = ({ 
  element, 
  scale,
  panOffset
}) => {
  const { 
    selectedElementId, 
    setSelectedElementId, 
    updateElement,
    elementLibrary
  } = useFloorplan();
  
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState<string | null>(null);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [startDims, setStartDims] = useState({ width: 0, height: 0 });
  
  const elementRef = useRef<HTMLDivElement>(null);
  const libraryItem = elementLibrary.find(item => item.id === element.libraryItemId);
  
  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedElementId(element.id);
    
    // If clicking a resize handle, start resizing
    const target = e.target as HTMLElement;
    if (target.classList.contains('resize-handle')) {
      setIsResizing(true);
      setResizeHandle(target.dataset.handle || null);
      setStartPos({ x: e.clientX, y: e.clientY });
      setStartDims({ width: element.width, height: element.height });
    } else {
      // Otherwise start dragging
      setIsDragging(true);
      setStartPos({ x: e.clientX, y: e.clientY });
    }
  };
  
  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging && !isResizing) return;
    
    if (isDragging) {
      const dx = (e.clientX - startPos.x) / scale;
      const dy = (e.clientY - startPos.y) / scale;
      
      updateElement(element.id, {
        x: element.x + dx,
        y: element.y + dy,
      });
      
      setStartPos({ x: e.clientX, y: e.clientY });
    } else if (isResizing && resizeHandle) {
      const dx = (e.clientX - startPos.x) / scale;
      const dy = (e.clientY - startPos.y) / scale;
      
      let newWidth = startDims.width;
      let newHeight = startDims.height;
      let newX = element.x;
      let newY = element.y;
      
      switch (resizeHandle) {
        case 'top-left':
          newWidth = startDims.width - dx;
          newHeight = startDims.height - dy;
          newX = element.x + dx;
          newY = element.y + dy;
          break;
        case 'top-right':
          newWidth = startDims.width + dx;
          newHeight = startDims.height - dy;
          newY = element.y + dy;
          break;
        case 'bottom-left':
          newWidth = startDims.width - dx;
          newHeight = startDims.height + dy;
          newX = element.x + dx;
          break;
        case 'bottom-right':
          newWidth = startDims.width + dx;
          newHeight = startDims.height + dy;
          break;
      }
      
      // Enforce minimum size
      newWidth = Math.max(20, newWidth);
      newHeight = Math.max(20, newHeight);
      
      updateElement(element.id, {
        x: newX,
        y: newY,
        width: newWidth,
        height: newHeight,
      });
    }
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeHandle(null);
  };
  
  useEffect(() => {
    if (isDragging || isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, startPos, startDims, resizeHandle, scale]);
  
  const isSelected = selectedElementId === element.id;
  
  return (
    <div
      ref={elementRef}
      className={`canvas-element ${element.type} ${isSelected ? 'selected' : ''}`}
      style={{
        left: `${(element.x + panOffset.x) * scale}px`,
        top: `${(element.y + panOffset.y) * scale}px`,
        width: `${element.width * scale}px`,
        height: `${element.height * scale}px`,
        transform: element.rotation ? `rotate(${element.rotation}deg)` : undefined,
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="flex items-center justify-center h-full w-full">
        {libraryItem?.icon && (
          <div 
            className="text-center"
            style={{ fontSize: `${Math.min(element.width, element.height) * 0.5 * scale}px` }}
          >
            {libraryItem.icon}
          </div>
        )}
      </div>
      
      {isSelected && (
        <>
          <div 
            className="resize-handle top-left" 
            data-handle="top-left"
            onMouseDown={(e) => e.stopPropagation()}
          />
          <div 
            className="resize-handle top-right" 
            data-handle="top-right"
            onMouseDown={(e) => e.stopPropagation()}
          />
          <div 
            className="resize-handle bottom-left" 
            data-handle="bottom-left"
            onMouseDown={(e) => e.stopPropagation()}
          />
          <div 
            className="resize-handle bottom-right" 
            data-handle="bottom-right"
            onMouseDown={(e) => e.stopPropagation()}
          />
        </>
      )}
    </div>
  );
};
