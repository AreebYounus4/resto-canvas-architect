
import React, { useRef } from 'react';
import { useFloorplan } from '@/context/FloorplanContext';
import { CanvasElement as CanvasElementType } from '@/types';
import { ResizeHandles } from './ResizeHandles';
import { useElementDrag } from '@/hooks/useElementDrag';
import { useElementResize } from '@/hooks/useElementResize';

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
  
  const elementRef = useRef<HTMLDivElement>(null);
  const libraryItem = elementLibrary.find(item => item.id === element.libraryItemId);
  
  const { isDragging, startDrag } = useElementDrag({ 
    element, 
    scale, 
    updateElement 
  });
  
  const { isResizing, startResize } = useElementResize({
    element,
    scale,
    updateElement
  });
  
  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedElementId(element.id);
    
    // Only start dragging if not clicking on a resize handle
    const target = e.target as HTMLElement;
    if (!target.classList.contains('resize-handle')) {
      startDrag(e);
    }
  };
  
  const handleResizeStart = (handle: string, e: React.MouseEvent) => {
    startResize(handle, e);
  };
  
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
        cursor: isDragging ? 'grabbing' : 'move',
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
      
      <ResizeHandles 
        isSelected={isSelected}
        onMouseDown={handleResizeStart}
      />
    </div>
  );
};
