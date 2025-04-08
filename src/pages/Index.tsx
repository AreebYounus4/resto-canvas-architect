
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import FloorPlanCanvas from "@/components/FloorPlanCanvas";
import ToolPanel from "@/components/ToolPanel";

const Index = () => {
  const [selectedTool, setSelectedTool] = useState<string>("table");

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Restaurant Floor Plan Designer</h1>
        </div>
      </header>
      
      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Tools</CardTitle>
                <CardDescription>Drag and drop items to design your floor plan</CardDescription>
              </CardHeader>
              <CardContent>
                <ToolPanel selectedTool={selectedTool} onSelectTool={setSelectedTool} />
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-3">
            <Card className="h-[600px]">
              <CardHeader>
                <CardTitle>Floor Plan Canvas</CardTitle>
                <CardDescription>Design your restaurant layout</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 h-[500px]">
                <FloorPlanCanvas selectedTool={selectedTool} />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
