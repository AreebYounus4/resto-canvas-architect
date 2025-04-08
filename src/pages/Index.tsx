
import { useState } from "react";
import FloorPlanCanvas from "@/components/FloorPlanCanvas";
import ToolPanel from "@/components/ToolPanel";
import { ActiveTool, CanvasElement } from "@/types/canvasTypes";

const Index = () => {
  const [activeTool, setActiveTool] = useState<ActiveTool>(null);
  const [elements, setElements] = useState<CanvasElement[]>([]);

  const handleToolSelect = (tool: ActiveTool) => {
    setActiveTool(tool);
  };

  const handleAddElement = (element: CanvasElement) => {
    setElements((prev) => [...prev, element]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="bg-primary text-primary-foreground p-4">
        <h1 className="text-2xl font-bold">Restaurant Floor Plan Designer</h1>
      </header>
      
      <div className="flex flex-1 overflow-hidden">
        <ToolPanel activeTool={activeTool} onSelectTool={handleToolSelect} />
        <FloorPlanCanvas 
          activeTool={activeTool} 
          elements={elements}
          onAddElement={handleAddElement}
        />
      </div>
    </div>
  );
};

export default Index;
