import { CustomizationZone, Product } from '../types/Product';

export const getCustomizationZones = (product: Product | null, selectedArea: string, canvasWidth: number, canvasHeight: number): CustomizationZone[] => {
  if (!product) return [];

  const zones: CustomizationZone[] = [];

  // USB Memory Sticks
  if (product.name.toLowerCase().includes('usb') || product.name.toLowerCase().includes('memoria')) {
    zones.push({
      id: 'usb-logo-area',
      name: 'Área de Logo',
      x: canvasWidth * 0.25,
      y: canvasHeight * 0.4,
      width: canvasWidth * 0.5,
      height: canvasHeight * 0.2,
      color: '#D40C63',
      isActive: selectedArea === 'carcasa'
    });
  }

  // Notebooks/Libretas
  else if (product.name.toLowerCase().includes('libreta') || product.name.toLowerCase().includes('cuaderno')) {
    if (selectedArea === 'portada') {
      zones.push({
        id: 'notebook-cover',
        name: 'Portada',
        x: canvasWidth * 0.2,
        y: canvasHeight * 0.15,
        width: canvasWidth * 0.6,
        height: canvasHeight * 0.7,
        color: '#8E44AD',
        isActive: true
      });
    } else if (selectedArea === 'contraportada') {
      zones.push({
        id: 'notebook-back',
        name: 'Contraportada',
        x: canvasWidth * 0.2,
        y: canvasHeight * 0.15,
        width: canvasWidth * 0.6,
        height: canvasHeight * 0.7,
        color: '#9B59B6',
        isActive: true
      });
    }
  }

  // Pens/Boligrafos
  else if (product.name.toLowerCase().includes('boligrafo') || product.name.toLowerCase().includes('pen')) {
    zones.push({
      id: 'pen-body',
      name: 'Cuerpo del Bolígrafo',
      x: canvasWidth * 0.15,
      y: canvasHeight * 0.45,
      width: canvasWidth * 0.7,
      height: canvasHeight * 0.1,
      color: '#3498DB',
      isActive: selectedArea === 'cuerpo'
    });
  }

  // Bags/Bolsas/Mochilas
  else if (product.name.toLowerCase().includes('bolsa') || product.name.toLowerCase().includes('mochila')) {
    if (selectedArea === 'frente' || selectedArea === 'panel principal') {
      zones.push({
        id: 'bag-front',
        name: 'Panel Principal',
        x: canvasWidth * 0.15,
        y: canvasHeight * 0.2,
        width: canvasWidth * 0.7,
        height: canvasHeight * 0.6,
        color: '#335BC6',
        isActive: true
      });
    } else if (selectedArea === 'reverso') {
      zones.push({
        id: 'bag-back',
        name: 'Parte Trasera',
        x: canvasWidth * 0.15,
        y: canvasHeight * 0.2,
        width: canvasWidth * 0.7,
        height: canvasHeight * 0.6,
        color: '#335BC680',
        isActive: true
      });
    } else if (selectedArea === 'bolsillo' || selectedArea === 'bolsillos') {
      zones.push({
        id: 'bag-pocket',
        name: 'Bolsillo',
        x: canvasWidth * 0.3,
        y: canvasHeight * 0.1,
        width: canvasWidth * 0.4,
        height: canvasHeight * 0.25,
        color: '#335BC6A0',
        isActive: true
      });
    }
  }

  // T-shirts/Polos/Pullovers
  else if (product.name.toLowerCase().includes('polo') || product.name.toLowerCase().includes('pullover')) {
    if (selectedArea === 'pecho') {
      zones.push({
        id: 'shirt-chest',
        name: 'Pecho',
        x: canvasWidth * 0.35,
        y: canvasHeight * 0.25,
        width: canvasWidth * 0.3,
        height: canvasHeight * 0.25,
        color: '#D40C63',
        isActive: true
      });
    } else if (selectedArea === 'espalda') {
      zones.push({
        id: 'shirt-back',
        name: 'Espalda',
        x: canvasWidth * 0.2,
        y: canvasHeight * 0.2,
        width: canvasWidth * 0.6,
        height: canvasHeight * 0.6,
        color: '#D40C6380',
        isActive: true
      });
    } else if (selectedArea === 'manga') {
      zones.push({
        id: 'shirt-sleeve',
        name: 'Manga',
        x: canvasWidth * 0.05,
        y: canvasHeight * 0.3,
        width: canvasWidth * 0.2,
        height: canvasHeight * 0.3,
        color: '#D40C6360',
        isActive: true
      });
    }
  }

  // Mugs/Tazas
  else if (product.name.toLowerCase().includes('taza') || product.name.toLowerCase().includes('tazo')) {
    if (selectedArea === 'cuerpo') {
      zones.push({
        id: 'mug-body',
        name: 'Cuerpo de la Taza',
        x: canvasWidth * 0.2,
        y: canvasHeight * 0.3,
        width: canvasWidth * 0.5,
        height: canvasHeight * 0.4,
        color: '#335BC6',
        isActive: true
      });
    } else if (selectedArea === 'asa') {
      zones.push({
        id: 'mug-handle',
        name: 'Asa',
        x: canvasWidth * 0.75,
        y: canvasHeight * 0.4,
        width: canvasWidth * 0.15,
        height: canvasHeight * 0.2,
        color: '#335BC680',
        isActive: true
      });
    }
  }

  // Caps/Gorras
  else if (product.name.toLowerCase().includes('gorra')) {
    if (selectedArea === 'corona') {
      zones.push({
        id: 'cap-crown',
        name: 'Corona',
        x: canvasWidth * 0.25,
        y: canvasHeight * 0.2,
        width: canvasWidth * 0.5,
        height: canvasHeight * 0.35,
        color: '#D40C63',
        isActive: true
      });
    } else if (selectedArea === 'visera') {
      zones.push({
        id: 'cap-visor',
        name: 'Visera',
        x: canvasWidth * 0.1,
        y: canvasHeight * 0.6,
        width: canvasWidth * 0.8,
        height: canvasHeight * 0.2,
        color: '#D40C6380',
        isActive: true
      });
    }
  }

  // Sports Bottles/Bidones
  else if (product.name.toLowerCase().includes('bidon') || product.name.toLowerCase().includes('botella')) {
    if (selectedArea === 'cuerpo') {
      zones.push({
        id: 'bottle-body',
        name: 'Cuerpo',
        x: canvasWidth * 0.3,
        y: canvasHeight * 0.25,
        width: canvasWidth * 0.4,
        height: canvasHeight * 0.5,
        color: '#16A085',
        isActive: true
      });
    } else if (selectedArea === 'tapa') {
      zones.push({
        id: 'bottle-cap',
        name: 'Tapa',
        x: canvasWidth * 0.35,
        y: canvasHeight * 0.1,
        width: canvasWidth * 0.3,
        height: canvasHeight * 0.15,
        color: '#1ABC9C',
        isActive: true
      });
    }
  }

  // Umbrellas/Paraguas
  else if (product.name.toLowerCase().includes('paraguas')) {
    zones.push({
      id: 'umbrella-surface',
      name: 'Superficie',
      x: canvasWidth * 0.1,
      y: canvasHeight * 0.2,
      width: canvasWidth * 0.8,
      height: canvasHeight * 0.4,
      color: '#8E44AD',
      isActive: selectedArea === 'superficie'
    });
  }

  // Mouse Pads
  else if (product.name.toLowerCase().includes('mouse') && product.name.toLowerCase().includes('pod')) {
    zones.push({
      id: 'mousepad-surface',
      name: 'Superficie',
      x: canvasWidth * 0.1,
      y: canvasHeight * 0.15,
      width: canvasWidth * 0.8,
      height: canvasHeight * 0.7,
      color: '#2C3E50',
      isActive: selectedArea === 'superficie'
    });
  }

  // Lanyards
  else if (product.name.toLowerCase().includes('lanyard')) {
    zones.push({
      id: 'lanyard-strap',
      name: 'Cinta',
      x: canvasWidth * 0.4,
      y: canvasHeight * 0.15,
      width: canvasWidth * 0.2,
      height: canvasHeight * 0.7,
      color: '#E67E22',
      isActive: selectedArea === 'cinta'
    });
  }

  // Hard Drives/Discos Duros
  else if (product.name.toLowerCase().includes('disco') && product.name.toLowerCase().includes('duro')) {
    zones.push({
      id: 'hdd-surface',
      name: 'Carcasa',
      x: canvasWidth * 0.2,
      y: canvasHeight * 0.35,
      width: canvasWidth * 0.6,
      height: canvasHeight * 0.3,
      color: '#2C3E50',
      isActive: selectedArea === 'carcasa'
    });
  }

  // Cooler/Lunchera
  else if (product.name.toLowerCase().includes('lunchera') || product.name.toLowerCase().includes('coolcan')) {
    if (selectedArea === 'tapa') {
      zones.push({
        id: 'cooler-lid',
        name: 'Tapa',
        x: canvasWidth * 0.2,
        y: canvasHeight * 0.2,
        width: canvasWidth * 0.6,
        height: canvasHeight * 0.2,
        color: '#27AE60',
        isActive: true
      });
    } else if (selectedArea === 'lateral') {
      zones.push({
        id: 'cooler-side',
        name: 'Lateral',
        x: canvasWidth * 0.2,
        y: canvasHeight * 0.45,
        width: canvasWidth * 0.6,
        height: canvasHeight * 0.35,
        color: '#2ECC71',
        isActive: true
      });
    }
  }

  // Phone Stand/Soporte
  else if (product.name.toLowerCase().includes('soporte') || product.name.toLowerCase().includes('protok')) {
    zones.push({
      id: 'stand-surface',
      name: 'Superficie',
      x: canvasWidth * 0.35,
      y: canvasHeight * 0.6,
      width: canvasWidth * 0.3,
      height: canvasHeight * 0.15,
      color: '#8E44AD',
      isActive: selectedArea === 'superficie'
    });
  }

  // Default zone for unrecognized products
  else {
    zones.push({
      id: 'default-area',
      name: 'Área de Personalización',
      x: canvasWidth * 0.15,
      y: canvasHeight * 0.15,
      width: canvasWidth * 0.7,
      height: canvasHeight * 0.7,
      color: '#FCCE08',
      isActive: true
    });
  }

  return zones;
};

export const isElementInZone = (element: any, zone: CustomizationZone): boolean => {
  const elementRight = element.x + (element.width || 100);
  const elementBottom = element.y + (element.height || 100);
  const zoneRight = zone.x + zone.width;
  const zoneBottom = zone.y + zone.height;

  return (
    element.x >= zone.x &&
    element.y >= zone.y &&
    elementRight <= zoneRight &&
    elementBottom <= zoneBottom
  );
};

export const constrainElementToZone = (element: any, zone: CustomizationZone, newX: number, newY: number, newWidth?: number, newHeight?: number) => {
  const elementWidth = newWidth || element.width || 100;
  const elementHeight = newHeight || element.height || 100;
  
  const constrainedX = Math.max(zone.x, Math.min(newX, zone.x + zone.width - elementWidth));
  const constrainedY = Math.max(zone.y, Math.min(newY, zone.y + zone.height - elementHeight));
  
  return { x: constrainedX, y: constrainedY };
};