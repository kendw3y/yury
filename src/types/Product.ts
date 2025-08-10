export interface Product {
  id: string;
  name: string;
  family: string;
  personalizacion: 'SERIGRAFIA' | 'SUBLIMACION' | 'GRABADO LASER';
  areas: string[];
  coloresMax: number | 'ilimitados';
  image?: string;
  price?: number;
}

export interface CustomizationZone {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  isActive: boolean;
}

export interface CanvasElement {
  id: string;
  type: 'image';
  x: number;
  y: number;
  width?: number;
  height?: number;
  rotation?: number;
  src?: string;
  zoneId?: string; // Which customization zone this element belongs to
}

export interface CustomizationSpecs {
  maxColors: number | 'ilimitados';
  minSize: number;
  maxSize: number;
  resolution: number;
  fileFormats: string[];
  restrictions: string[];
}