
import React from 'react';
import { useFloorplan } from '@/context/FloorplanContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ElementLibraryItem } from '@/types';

export const ElementLibrary: React.FC = () => {
  const { elementLibrary } = useFloorplan();
  
  const reservableItems = elementLibrary.filter(item => item.type === 'reservable');
  const decorativeItems = elementLibrary.filter(item => item.type === 'decorative');
  
  return (
    <div className="space-y-6">
      <LibrarySection title="Tables & Seating" items={reservableItems} />
      <LibrarySection title="Decorations & Fixtures" items={decorativeItems} />
    </div>
  );
};

interface LibrarySectionProps {
  title: string;
  items: ElementLibraryItem[];
}

const LibrarySection: React.FC<LibrarySectionProps> = ({ title, items }) => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="px-4 py-3">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-4 py-2">
        <div className="grid grid-cols-2 gap-2">
          {items.map(item => (
            <LibraryItem key={item.id} item={item} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

interface LibraryItemProps {
  item: ElementLibraryItem;
}

const LibraryItem: React.FC<LibraryItemProps> = ({ item }) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('application/json', JSON.stringify(item));
    e.dataTransfer.effectAllowed = 'copy';
  };
  
  return (
    <div 
      className="flex flex-col items-center justify-center p-2 border rounded-md bg-background cursor-grab hover:bg-secondary transition-colors"
      draggable
      onDragStart={handleDragStart}
    >
      <div className="text-2xl mb-1">{item.icon}</div>
      <div className="text-xs text-center">{item.name}</div>
    </div>
  );
};
