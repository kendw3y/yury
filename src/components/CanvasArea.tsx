import React, { useRef, useEffect } from 'react';
import { Stage, Layer, Transformer, Image as KonvaImage } from 'react-konva';
import { CanvasElement } from '../types/Product';

interface CanvasAreaProps {
  elements: CanvasElement[];
  onElementsChange: (elements: CanvasElement[]) => void;
  selectedElementId: string | null;
  onElementSelect: (id: string | null) => void;
  canvasWidth: number;
  canvasHeight: number;
}

const CanvasArea: React.FC<CanvasAreaProps> = ({
  elements,
  onElementsChange,
  selectedElementId,
  onElementSelect,
  canvasWidth,
  canvasHeight
}) => {
  const stageRef = useRef<any>(null);
  const transformerRef = useRef<any>(null);
  const imageRefs = useRef<{ [key: string]: any }>({});

  useEffect(() => {
    if (selectedElementId && transformerRef.current) {
      const stage = stageRef.current;
      const selectedNode = stage.findOne(`#${selectedElementId}`);
      if (selectedNode) {
        transformerRef.current.nodes([selectedNode]);
        transformerRef.current.getLayer().batchDraw();
      }
    }
  }, [selectedElementId]);

  const handleElementDragEnd = (e: any, elementId: string) => {
    const node = e.target;
    const elementWidth = node.width() * node.scaleX();
    const elementHeight = node.height() * node.scaleY();
    
    // Constrain to canvas boundaries
    const constrainedX = Math.max(0, Math.min(node.x(), canvasWidth - elementWidth));
    const constrainedY = Math.max(0, Math.min(node.y(), canvasHeight - elementHeight));
    
    // Update node position
    node.x(constrainedX);
    node.y(constrainedY);
    
    const updatedElements = elements.map(element => 
      element.id === elementId 
        ? { ...element, x: constrainedX, y: constrainedY }
        : element
    );
    onElementsChange(updatedElements);
  };

  const handleElementTransform = (e: any, elementId: string) => {
    const node = e.target;
    const newWidth = node.width() * node.scaleX();
    const newHeight = node.height() * node.scaleY();
    
    // Constrain to canvas boundaries
    const constrainedX = Math.max(0, Math.min(node.x(), canvasWidth - newWidth));
    const constrainedY = Math.max(0, Math.min(node.y(), canvasHeight - newHeight));
    
    // Reset scale and update dimensions
    node.scaleX(1);
    node.scaleY(1);
    node.width(newWidth);
    node.height(newHeight);
    node.x(constrainedX);
    node.y(constrainedY);
    
    const updatedElements = elements.map(element => 
      element.id === elementId 
        ? { 
            ...element, 
            x: constrainedX,
            y: constrainedY,
            width: newWidth,
            height: newHeight,
            rotation: node.rotation()
          }
        : element
    );
    onElementsChange(updatedElements);
  };

  const renderElement = (element: CanvasElement) => {
    const commonProps = {
      id: element.id,
      x: element.x,
      y: element.y,
      draggable: true,
      rotation: element.rotation || 0,
      onDragEnd: (e: any) => handleElementDragEnd(e, element.id),
      onTransformEnd: (e: any) => handleElementTransform(e, element.id),
      onClick: () => onElementSelect(element.id),
      onTap: () => onElementSelect(element.id),
      dragBoundFunc: (pos: any) => {
        const elementWidth = element.width || 100;
        const elementHeight = element.height || 100;
        
        return {
          x: Math.max(0, Math.min(pos.x, canvasWidth - elementWidth)),
          y: Math.max(0, Math.min(pos.y, canvasHeight - elementHeight))
        };
      }
    };

    if (element.type === 'image' && element.src) {
      const img = new window.Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        if (imageRefs.current[element.id]) {
          imageRefs.current[element.id].getLayer().batchDraw();
        }
      };
      img.src = element.src;
      
      return (
        <KonvaImage
          key={element.id}
          {...commonProps}
          ref={(node) => {
            if (node) {
              imageRefs.current[element.id] = node;
            }
          }}
          image={img}
          width={element.width || 100}
          height={element.height || 100}
        />
      );
    }

    return null;
  };

  return (
    <div className="rounded-lg shadow-lg border-2 p-6" style={{ backgroundColor: '#11142020', borderColor: '#D40C63' }}>
      <h3 className="text-lg font-semibold mb-4 flex items-center" style={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: 600 }}>
        <svg className="mr-2 h-5 w-5" style={{ color: '#D40C63' }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        Área de Diseño
      </h3>
      
      <div 
        className="rounded-lg overflow-hidden shadow-inner"
        style={{ 
          backgroundColor: '#ffffff',
          width: canvasWidth,
          height: canvasHeight
        }}
      >
        <Stage
          ref={stageRef}
          width={canvasWidth}
          height={canvasHeight}
          onMouseDown={(e) => {
            const clickedOnEmpty = e.target === e.target.getStage();
            if (clickedOnEmpty) {
              onElementSelect(null);
            }
          }}
        >
          <Layer>
            {elements.map(renderElement)}
            
            <Transformer
              ref={transformerRef}
              rotationSnaps={[0, 90, 180, 270]}
              borderStroke="#D40C63"
              borderStrokeWidth={2}
              anchorStroke="#335BC6"
              anchorFill="#FCCE08"
              anchorSize={8}
              boundBoxFunc={(oldBox, newBox) => {
                if (newBox.width < 5 || newBox.height < 5) {
                  return oldBox;
                }
                
                // Prevent resizing beyond canvas boundaries
                const maxWidth = canvasWidth - newBox.x;
                const maxHeight = canvasHeight - newBox.y;
                
                return {
                  ...newBox,
                  width: Math.min(newBox.width, maxWidth),
                  height: Math.min(newBox.height, maxHeight)
                };
              }}
            />
          </Layer>
        </Stage>
      </div>
      
      <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: '#335BC620' }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm" style={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: 500 }}>
          <p className="flex items-center">
            <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: '#D40C63' }}></span>
            Haz clic para seleccionar
          </p>
          <p className="flex items-center">
            <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: '#335BC6' }}></span>
            Arrastra para mover
          </p>
          <p className="flex items-center">
            <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: '#FCCE08' }}></span>
            Controles para redimensionar
          </p>
        </div>
      </div>
    </div>
  );
};

export default CanvasArea;