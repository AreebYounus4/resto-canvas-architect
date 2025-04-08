
import { useState, useRef, useEffect } from "react";
import { ActiveTool, CanvasElement, Position } from "@/types/canvasTypes";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface FloorPlanCanvasProps {
  activeTool: ActiveTool;
  elements: CanvasElement[];
  onAddElement: (element: CanvasElement) => void;
}

const FloorPlanCanvas = ({ activeTool, elements, onAddElement }: FloorPlanCanvasProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isPlacing, setIsPlacing] = useState(false);
  const [cursorPosition, setCursorPosition] = useState<Position>({ x: 0, y: 0 });
  
  // Handle canvas click to place element
  const handleCanvasClick = (e: React.MouseEvent) => {
    if (!activeTool || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Create new element based on active tool
    const newElement: CanvasElement = {
      id: `element-${Date.now()}`,
      type: activeTool,
      position: { x, y },
      size: getDefaultSizeForElement(activeTool),
      rotation: 0,
    };
    
    onAddElement(newElement);
  };
  
  // Update cursor position for preview
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    setCursorPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };
  
  // Get default size based on element type
  const getDefaultSizeForElement = (type: ActiveTool): { width: number; height: number } => {
    switch (type) {
      case 'table':
        return { width: 100, height: 60 };
      case 'chair':
        return { width: 40, height: 40 };
      case 'wall':
        return { width: 200, height: 10 };
      case 'door':
        return { width: 60, height: 10 };
      case 'window':
        return { width: 80, height: 10 };
      default:
        return { width: 50, height: 50 };
    }
  };
  
  // Render a single element
  const renderElement = (element: CanvasElement) => {
    const { id, type, position, size, rotation = 0 } = element;
    
    let className = "absolute border border-gray-800 ";
    
    switch (type) {
      case 'table':
        className += "bg-amber-100 rounded";
        break;
      case 'chair':
        className += "bg-amber-200 rounded-full";
        break;
      case 'wall':
        className += "bg-gray-800";
        break;
      case 'door':
        className += "bg-blue-500";
        break;
      case 'window':
        className += "bg-sky-200";
        break;
    }
    
    return (
      <div
        key={id}
        className={className}
        style={{
          left: `${position.x - size.width / 2}px`,
          top: `${position.y - size.height / 2}px`,
          width: `${size.width}px`,
          height: `${size.height}px`,
          transform: `rotate(${rotation}deg)`,
        }}
      />
    );
  };
  
  // Render placement preview
  const renderPreview = () => {
    if (!activeTool) return null;
    
    const size = getDefaultSizeForElement(activeTool);
    
    let className = "absolute border border-dashed border-gray-400 pointer-events-none ";
    
    switch (activeTool) {
      case 'table':
        className += "bg-amber-100/50 rounded";
        break;
      case 'chair':
        className += "bg-amber-200/50 rounded-full";
        break;
      case 'wall':
        className += "bg-gray-800/50";
        break;
      case 'door':
        className += "bg-blue-500/50";
        break;
      case 'window':
        className += "bg-sky-200/50";
        break;
    }
    
    return (
      <div
        className={className}
        style={{
          left: `${cursorPosition.x - size.width / 2}px`,
          top: `${cursorPosition.y - size.height / 2}px`,
          width: `${size.width}px`,
          height: `${size.height}px`,
        }}
      />
    );
  };
  
  // Clear all elements
  const handleClearCanvas = () => {
    if (window.confirm("Are you sure you want to clear the canvas?")) {
      // This would typically call a function passed from the parent to clear elements
      console.log("Clear canvas requested");
    }
  };
  
  return (
    <div className="flex flex-col flex-1">
      <div className="bg-gray-100 p-2 flex justify-between items-center">
        <div>
          <span className="text-sm font-semibold">
            {activeTool ? `Placing: ${activeTool}` : "Select a tool"}
          </span>
        </div>
        <Button 
          variant="destructive" 
          size="sm" 
          onClick={handleClearCanvas}
          className="flex items-center gap-1"
        >
          <Trash2 size={16} />
          Clear
        </Button>
      </div>
      
      <div
        ref={canvasRef}
        className="flex-1 bg-white border border-gray-200 relative overflow-auto"
        onClick={handleCanvasClick}
        onMouseMove={handleMouseMove}
      >
        {/* Render all placed elements */}
        {elements.map(renderElement)}
        
        {/* Render placement preview */}
        {activeTool && renderPreview()}
        
        {/* Grid pattern (optional) */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      </div>
    </div>
  );
};

export default FloorPlanCanvas;
