
import React from 'react';
import { 
  ResizableHandle, 
  ResizablePanel, 
  ResizablePanelGroup 
} from '@/components/ui/resizable';
import { ElementLibrary } from './ElementLibrary';
import { Canvas } from './Canvas';
import { FloorplanTabs } from './FloorplanTabs';
import { ElementProperties } from './ElementProperties';
import { useFloorplan } from '@/context/FloorplanContext';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';

export const Layout: React.FC = () => {
  const { publishFloorplans } = useFloorplan();
  
  return (
    <div className="h-screen w-full flex flex-col">
      <header className="border-b bg-card p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Restaurant Canvas Architect</h1>
          {/* <Button onClick={publishFloorplans}>
            <Save className="mr-2 h-4 w-4" />
            Publish Floorplans
          </Button> */}
        </div>
      </header>
      
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
            <div className="h-full flex flex-col p-4 gap-4 overflow-auto">
              <ElementLibrary />
              <div className="mt-auto">
                <ElementProperties />
              </div>
            </div>
          </ResizablePanel>
          
          <ResizableHandle withHandle />
          
          <ResizablePanel defaultSize={80}>
            <div className="h-full flex flex-col p-4 gap-4">
              <FloorplanTabs />
              <div className="flex-1">
                <Canvas />
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};
