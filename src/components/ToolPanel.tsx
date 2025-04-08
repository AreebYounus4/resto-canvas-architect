
import { Button } from "@/components/ui/button";
import { 
  Square, 
  CircleIcon, 
  Coffee, 
  ArrowRight, 
  Trash2 
} from "lucide-react";

interface ToolPanelProps {
  selectedTool: string;
  onSelectTool: (tool: string) => void;
}

const ToolPanel = ({ selectedTool, onSelectTool }: ToolPanelProps) => {
  const tools = [
    { id: "table", name: "Table", icon: <CircleIcon className="h-4 w-4" /> },
    { id: "chair", name: "Chair", icon: <Square className="h-4 w-4" /> },
    { id: "bar", name: "Bar", icon: <Coffee className="h-4 w-4" /> },
    { id: "wall", name: "Wall", icon: <ArrowRight className="h-4 w-4" /> },
  ];

  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        {tools.map((tool) => (
          <Button
            key={tool.id}
            variant={selectedTool === tool.id ? "default" : "outline"}
            className="justify-start"
            onClick={() => onSelectTool(tool.id)}
          >
            {tool.icon}
            <span className="ml-2">{tool.name}</span>
          </Button>
        ))}
      </div>
      
      <div className="pt-4 border-t">
        <Button variant="destructive" className="w-full">
          <Trash2 className="h-4 w-4 mr-2" />
          Clear Canvas
        </Button>
      </div>
    </div>
  );
};

export default ToolPanel;
