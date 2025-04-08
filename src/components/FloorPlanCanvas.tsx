
import { useState, useRef, useEffect } from "react";
import { CanvasElement } from "@/types/canvasTypes";

interface FloorPlanCanvasProps {
  selectedTool: string;
}

const FloorPlanCanvas = ({ selectedTool }: FloorPlanCanvasProps) => {
  const [elements, setElements] = useState<CanvasElement[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setPosition({ x, y });
    setIsDrawing(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setPosition({ x, y });
  };

  const handleMouseUp = () => {
    if (isDrawing) {
      const newElement: CanvasElement = {
        id: `${selectedTool}-${Date.now()}`,
        type: selectedTool,
        position: { ...position },
        size: getElementSize(selectedTool),
      };
      
      setElements([...elements, newElement]);
      setIsDrawing(false);
    }
  };

  const getElementSize = (type: string) => {
    switch (type) {
      case "table":
        return { width: 80, height: 80 };
      case "chair":
        return { width: 40, height: 40 };
      case "bar":
        return { width: 150, height: 60 };
      case "wall":
        return { width: 100, height: 10 };
      default:
        return { width: 50, height: 50 };
    }
  };

  const renderElement = (element: CanvasElement) => {
    const style = {
      left: `${element.position.x}px`,
      top: `${element.position.y}px`,
      width: `${element.size.width}px`,
      height: `${element.size.height}px`,
    };

    let className = "absolute border cursor-move ";
    
    switch (element.type) {
      case "table":
        className += "bg-amber-100 rounded-full";
        break;
      case "chair":
        className += "bg-amber-200 rounded-md";
        break;
      case "bar":
        className += "bg-slate-300 rounded-md";
        break;
      case "wall":
        className += "bg-gray-500";
        break;
      default:
        className += "bg-gray-200";
    }

    return (
      <div 
        key={element.id}
        className={className}
        style={style}
      />
    );
  };

  return (
    <div 
      ref={canvasRef}
      className="w-full h-full bg-white border relative"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {elements.map(renderElement)}
      {isDrawing && (
        <div 
          className={`absolute border ${selectedTool === "table" ? "bg-amber-100 rounded-full" : 
                      selectedTool === "chair" ? "bg-amber-200 rounded-md" : 
                      selectedTool === "bar" ? "bg-slate-300 rounded-md" : 
                      selectedTool === "wall" ? "bg-gray-500" : "bg-gray-200"}`}
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            width: `${getElementSize(selectedTool).width}px`,
            height: `${getElementSize(selectedTool).height}px`,
          }}
        />
      )}
    </div>
  );
};

export default FloorPlanCanvas;
