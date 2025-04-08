
import { ActiveTool, ElementType } from "@/types/canvasTypes";
import { Button } from "@/components/ui/button";
import { 
  Square, 
  Circle, 
  Minimize2, 
  LogIn, 
  Columns 
} from "lucide-react";

interface ToolPanelProps {
  activeTool: ActiveTool;
  onSelectTool: (tool: ActiveTool) => void;
}

const ToolPanel = ({ activeTool, onSelectTool }: ToolPanelProps) => {
  const tools: { id: ElementType; icon: React.ReactNode; label: string }[] = [
    { id: 'table', icon: <Square size={24} />, label: 'Table' },
    { id: 'chair', icon: <Circle size={24} />, label: 'Chair' },
    { id: 'wall', icon: <Minimize2 size={24} />, label: 'Wall' },
    { id: 'door', icon: <LogIn size={24} />, label: 'Door' },
    { id: 'window', icon: <Columns size={24} />, label: 'Window' },
  ];

  return (
    <div className="w-64 bg-sidebar border-r border-border p-4 flex flex-col gap-4">
      <h2 className="font-semibold text-lg mb-2">Tools</h2>
      
      <div className="flex flex-col gap-2">
        {tools.map((tool) => (
          <Button
            key={tool.id}
            variant={activeTool === tool.id ? "default" : "outline"}
            className="justify-start gap-2"
            onClick={() => onSelectTool(tool.id)}
          >
            {tool.icon}
            {tool.label}
          </Button>
        ))}
        
        {activeTool && (
          <Button 
            variant="ghost"
            className="mt-2"
            onClick={() => onSelectTool(null)}
          >
            Cancel Selection
          </Button>
        )}
      </div>
      
      <div className="mt-auto">
        <h3 className="font-semibold mb-2">Tips</h3>
        <ul className="text-sm space-y-1 text-muted-foreground">
          <li>• Click on the canvas to place an element</li>
          <li>• Select a tool from the panel</li>
          <li>• Use clear button to reset the canvas</li>
        </ul>
      </div>
    </div>
  );
};

export default ToolPanel;
