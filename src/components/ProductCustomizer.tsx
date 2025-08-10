import React, { useState, useCallback } from 'react';
import { Palette, Zap } from 'lucide-react';
import ProductSelector from './ProductSelector';
import CanvasArea from './CanvasArea';
import PreviewArea from './PreviewArea';
import ToolsPanel from './ToolsPanel';
import ProductDescription from './ProductDescription';
import { Product, CanvasElement } from '../types/Product';
import { products } from '../data/products';

const ProductCustomizer: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedPersonalization, setSelectedPersonalization] = useState('TODOS');
  const [selectedArea, setSelectedArea] = useState('');

  const [canvasElements, setCanvasElements] = useState<CanvasElement[]>([]);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [productDescription, setProductDescription] = useState('');

  const canvasWidth = 400;
  const canvasHeight = 300;

  const handleProductSelect = useCallback((product: Product) => {
    setSelectedProduct(product);
    setSelectedArea(product.areas[0]);
    setCanvasElements([]);
    setSelectedElementId(null);
    setProductDescription('');
  }, []);

  const generateElementId = () => `element_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const handleAddImage = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const newElement: CanvasElement = {
            id: generateElementId(),
            type: 'image',
            x: canvasWidth / 2 - 50,
            y: canvasHeight / 2 - 50,
            width: 100,
            height: 100,
            src: event.target?.result as string,
          };
          setCanvasElements(prev => [...prev, newElement]);
          setSelectedElementId(newElement.id);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  }, [canvasWidth, canvasHeight]);

  const handleReset = useCallback(() => {
    setCanvasElements([]);
    setSelectedElementId(null);
  }, []);

  const handleSave = useCallback(() => {
    if (!selectedProduct) {
      alert('Por favor selecciona un producto primero');
      return;
    }
    
    const designData = {
      product: selectedProduct,
      area: selectedArea,
      elements: canvasElements,
      description: productDescription,
      timestamp: new Date().toISOString(),
    };
    
    localStorage.setItem('saved_design', JSON.stringify(designData));
    alert('Diseño guardado correctamente');
  }, [selectedProduct, selectedArea, canvasElements]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#111420' }}>
      <div className="shadow-sm border-b-4" style={{ backgroundColor: '#11142015', borderColor: '#D40C63' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Palette className="h-8 w-8 mr-3" style={{ color: '#D40C63' }} />
              <h1 className="text-2xl font-bold" style={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: 800 }}>
                ProductCustomizer
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5" style={{ color: '#FCCE08' }} />
              <span className="text-sm font-medium" style={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: 600 }}>
                Personalización con Imágenes
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductSelector
          products={products}
          selectedProduct={selectedProduct}
          onProductSelect={handleProductSelect}
          selectedPersonalization={selectedPersonalization}
          onPersonalizationChange={setSelectedPersonalization}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="w-full">
            <CanvasArea
              elements={canvasElements}
              onElementsChange={setCanvasElements}
              selectedElementId={selectedElementId}
              onElementSelect={setSelectedElementId}
              canvasWidth={canvasWidth}
              canvasHeight={canvasHeight}
            />
          </div>

          <div className="w-full">
            <PreviewArea
              selectedProduct={selectedProduct}
              elements={canvasElements}
              selectedArea={selectedArea}
              onAreaChange={setSelectedArea}
            />
          </div>
        </div>

        <div className="mb-8">
          <ProductDescription
            selectedProduct={selectedProduct}
            onDescriptionChange={setProductDescription}
            description={productDescription}
          />
        </div>

        <div className="mb-8">
          <ToolsPanel
            onAddImage={handleAddImage}
            onReset={handleReset}
            onSave={handleSave}
            hasSelectedProduct={!!selectedProduct}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="rounded-lg shadow-lg border-2 p-6 text-center transform hover:scale-105 transition-transform" style={{ backgroundColor: '#11142020', borderColor: '#335BC6' }}>
            <div className="text-3xl font-bold mb-2" style={{ color: '#335BC6', fontFamily: 'Nunito', fontWeight: 800 }}>
              {products.length}
            </div>
            <div className="text-sm font-semibold" style={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: 600 }}>
              Productos Disponibles
            </div>
          </div>
          <div className="rounded-lg shadow-lg border-2 p-6 text-center transform hover:scale-105 transition-transform" style={{ backgroundColor: '#11142020', borderColor: '#D40C63' }}>
            <div className="text-3xl font-bold mb-2" style={{ color: '#D40C63', fontFamily: 'Nunito', fontWeight: 800 }}>
              {canvasElements.length}
            </div>
            <div className="text-sm font-semibold" style={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: 600 }}>
              Imágenes en Diseño
            </div>
          </div>
          <div className="rounded-lg shadow-lg border-2 p-6 text-center transform hover:scale-105 transition-transform" style={{ backgroundColor: '#11142020', borderColor: '#FCCE08' }}>
            <div className="text-3xl font-bold mb-2" style={{ color: '#FCCE08', fontFamily: 'Nunito', fontWeight: 800 }}>
              {selectedProduct ? selectedProduct.areas.length : 0}
            </div>
            <div className="text-sm font-semibold" style={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: 600 }}>
              Áreas Personalizables
            </div>
          </div>
          <div className="rounded-lg shadow-lg border-2 p-6 text-center transform hover:scale-105 transition-transform" style={{ backgroundColor: '#11142020', borderColor: '#335BC6' }}>
            <div className="text-3xl font-bold mb-2" style={{ color: '#335BC6', fontFamily: 'Nunito', fontWeight: 800 }}>
              {selectedProduct ? (selectedProduct.coloresMax === 'ilimitados' ? '∞' : selectedProduct.coloresMax) : 0}
            </div>
            <div className="text-sm font-semibold" style={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: 600 }}>
              Colores Máximos
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCustomizer;