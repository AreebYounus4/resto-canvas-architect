
export type ElementType = 'table' | 'chair' | 'wall' | 'door' | 'window';

export type ActiveTool = ElementType | null;

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface CanvasElement {
  id: string;
  type: ElementType;
  position: Position;
  size: Size;
  rotation?: number;
}
