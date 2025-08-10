import React, { useState, useEffect } from 'react';
import { RotateCcw, RotateCw, Maximize2, Eye, ZoomIn, ZoomOut } from 'lucide-react';
import { Product, CanvasElement } from '../types/Product';

interface PreviewAreaProps {
  selectedProduct: Product | null;
  elements: CanvasElement[];
  selectedArea: string;
  onAreaChange: (area: string) => void;
}

const PreviewArea: React.FC<PreviewAreaProps> = ({
  selectedProduct,
  elements,
  selectedArea,
  onAreaChange
}) => {
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [previewElements, setPreviewElements] = useState<CanvasElement[]>([]);
  const [ecocardColor, setEcocardColor] = useState('blanco');
  const [tunelColor, setTunelColor] = useState('azul');
  const [imageLoadErrors, setImageLoadErrors] = useState<string[]>([]);

  // Update preview elements when canvas elements change
  useEffect(() => {
    setPreviewElements(elements);
  }, [elements]);

  // Reset ecocard color when product changes
  useEffect(() => {
    if (selectedProduct?.id === 'LIBRETA-ECOCARD') {
      setEcocardColor('blanco');
    } else if (selectedProduct?.id === 'LIBRETA-TUNEL') {
      setTunelColor('azul');
    }
  }, [selectedProduct]);

  // Test image loading on component mount
  useEffect(() => {
    const testImages = [
      '/Funda EKAIN2 copy.png',
      '/Bidón Deportivo 400ml copy.png'
    ];
    
    testImages.forEach(imagePath => {
      const img = new Image();
      img.onload = () => {
        console.log(`✅ Image loaded successfully: ${imagePath}`);
      };
      img.onerror = () => {
        console.error(`❌ Failed to load image: ${imagePath}`);
        setImageLoadErrors(prev => [...prev, imagePath]);
      };
      img.src = imagePath;
    });
  }, []);

  const handleRotate = (direction: 'left' | 'right') => {
    setRotation(prev => {
      const newRotation = direction === 'left' ? prev - 90 : prev + 90;
      return newRotation >= 360 ? 0 : newRotation < 0 ? 270 : newRotation;
    });
  };

  const handleZoom = (direction: 'in' | 'out') => {
    setZoom(prev => {
      const newZoom = direction === 'in' ? Math.min(prev + 0.2, 2) : Math.max(prev - 0.2, 0.6);
      return newZoom;
    });
  };

  const getEcocardImagePath = (color: string) => {
    switch (color) {
      case 'amarillo':
        return '/Libreta Ecocard Amarilla.png';
      case 'verde':
        return '/Libreta Ecocard Verde.png';
      case 'blanco':
      default:
        return '/Libreta Ecocard Blanca.png';
    }
  };

  const getTunelImagePath = (color: string) => {
    switch (color) {
      case 'verde':
        return '/Libreta Tunel Verde.png';
      case 'magenta':
        return '/Libreta Tunel Magenta.png';
      case 'azul':
      default:
        return '/Libreta Tunel Azul.png';
    }
  };
  const getProductGeometricShape = (product: Product) => {
    console.log('Rendering product:', product.id, product.name);
    
    const baseStyle = {
      width: '300px',
      height: '300px',
      borderRadius: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative' as const,
      overflow: 'hidden',
      boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
      transform: `rotate(${rotation}deg) scale(${zoom})`,
      transition: 'transform 0.5s ease-in-out'
    };

    const renderPreviewImages = () => {
      return previewElements.map((element, index) => {
        if (!element.src) return null;
        
        // Calculate relative positioning and sizing based on canvas dimensions
        const relativeX = (element.x / 400) * 100; // Canvas width is 400
        const relativeY = (element.y / 300) * 100; // Canvas height is 300
        const relativeWidth = ((element.width || 100) / 400) * 100;
        const relativeHeight = ((element.height || 100) / 300) * 100;
        
        return (
          <div
            key={element.id}
            className="absolute rounded-lg border-2 border-white shadow-lg"
            style={{
              left: `${Math.max(5, Math.min(85, relativeX * 0.8 + 10))}%`,
              top: `${Math.max(5, Math.min(85, relativeY * 0.8 + 10))}%`,
              width: `${Math.max(10, Math.min(70, relativeWidth * 0.8))}%`,
              height: `${Math.max(10, Math.min(70, relativeHeight * 0.8))}%`,
              backgroundImage: `url(${element.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.95,
              transform: `rotate(${element.rotation || 0}deg)`,
              zIndex: 10 + index,
              transition: 'all 0.3s ease'
            }}
          />
        );
      });
    };

    // Bolsa Non-Woven JAZZIN - Use actual product image
    if (product.id === 'BOLSA-JAZZIN') {
      return (
        <div style={{ ...baseStyle, background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)' }}>
          <div className="relative rounded-lg shadow-2xl" style={{ width: '280px', height: '280px' }}>
            <img 
              src="/Bolsa Non-Woven JAZZIN.png"
              alt="Bolsa Non-Woven JAZZIN"
              className="w-full h-full object-contain rounded-lg"
            />
            <div className="absolute inset-0">
              {renderPreviewImages()}
            </div>
          </div>
        </div>
      );
    }

    // BOLSA-MIRTAL1 - Use actual product image
    if (product.id === 'BOLSA-MIRTAL1') {
      return (
        <div style={{ ...baseStyle, background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)' }}>
          <div className="relative rounded-lg shadow-2xl" style={{ width: '280px', height: '280px' }}>
            <img 
              src="/Bolsa Mirtal1.png"
              alt="Bolsa Mirtal1"
              className="w-full h-full object-contain rounded-lg"
              onError={(e) => {
                console.log('Bolsa Mirtal1 image failed to load, falling back to geometric shape');
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <div className="absolute inset-0">
              {renderPreviewImages()}
            </div>
          </div>
        </div>
      );
    }

    // MOCHILA-DISCOVERY - Use actual product image
    if (product.id === 'MOCHILA-DISCOVERY' || product.name.toLowerCase().includes('discovery')) {
      return (
        <div style={{ ...baseStyle, background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)' }}>
          <div className="relative rounded-lg shadow-2xl" style={{ width: '280px', height: '280px' }}>
            <img 
              src="/Mochila Discovery.png"
              alt="Mochila Discovery"
              className="w-full h-full object-contain rounded-lg"
              onError={(e) => {
                console.log('Mochila Discovery image failed to load, falling back to geometric shape');
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <div className="absolute inset-0">
              {renderPreviewImages()}
            </div>
          </div>
        </div>
      );
    }

    // USB Memory Sticks - Rectangle
    if (product.name.toLowerCase().includes('usb') || product.name.toLowerCase().includes('memoria')) {
      // Use actual product images for specific USB products
      if (product.id === 'USB-YEMIL') {
        return (
          <div style={{ ...baseStyle, background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)' }}>
            <div className="relative rounded-lg shadow-2xl" style={{ width: '280px', height: '280px' }}>
              <img 
                src="/Memoria Yemil 32 GB.png"
                alt="Memoria USB Yemil 32GB"
                className="w-full h-full object-contain rounded-lg"
              />
              <div className="absolute inset-0">
                {renderPreviewImages()}
              </div>
            </div>
          </div>
        );
      }
      
      if (product.id === 'USB-REBIK') {
        return (
          <div style={{ ...baseStyle, background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)' }}>
            <div className="relative rounded-lg shadow-2xl" style={{ width: '280px', height: '280px' }}>
              <img 
                src="/Memoria Rebik 16GB.png"
                alt="Memoria USB Rebik 16GB"
                className="w-full h-full object-contain rounded-lg"
              />
              <div className="absolute inset-0">
                {renderPreviewImages()}
              </div>
            </div>
          </div>
        );
      }
      
      // Fallback to geometric shape for other USB products
      return (
        <div style={{ ...baseStyle, background: 'linear-gradient(135deg, #34495E, #2C3E50)' }}>
          <div 
            className="rounded-lg border-4 border-gray-600 shadow-2xl"
            style={{
              width: '200px',
              height: '40px',
              backgroundColor: '#2C3E50',
              position: 'relative'
            }}
          >
            {/* USB connector */}
            <div 
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-400 rounded-sm"
              style={{ width: '20px', height: '20px' }}
            />
            {/* USB cap */}
            <div 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-red-500 rounded-md"
              style={{ width: '25px', height: '30px' }}
            />
          </div>
          {renderPreviewImages()}
        </div>
      );
    }

    // Notebooks/Libretas - Rectangle
    if (product.name.toLowerCase().includes('libreta') || product.name.toLowerCase().includes('cuaderno')) {
      // Use actual product images for Ecocard notebooks
      if (product.id === 'LIBRETA-ECOCARD') {
        return (
          <div style={{ ...baseStyle, background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)' }}>
            <div className="relative rounded-lg shadow-2xl" style={{ width: '280px', height: '280px' }}>
              <img 
                src={getEcocardImagePath(ecocardColor)}
                alt={`Libreta Ecocard ${ecocardColor}`}
                className="w-full h-full object-contain rounded-lg"
                onError={(e) => {
                  console.log(`Ecocard ${ecocardColor} image failed to load, falling back to geometric shape`);
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <div className="absolute inset-0">
                {renderPreviewImages()}
              </div>
            </div>
          </div>
        );
      }
      
      if (product.id === 'LIBRETA-TUNEL') {
        return (
          <div style={{ ...baseStyle, background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)' }}>
            <div className="relative rounded-lg shadow-2xl" style={{ width: '280px', height: '280px' }}>
              <img 
                src={getTunelImagePath(tunelColor)}
                alt={`Libreta Tunel ${tunelColor}`}
                className="w-full h-full object-contain rounded-lg"
                onError={(e) => {
                  console.log(`Tunel ${tunelColor} image failed to load, falling back to geometric shape`);
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <div className="absolute inset-0">
                {renderPreviewImages()}
              </div>
            </div>
          </div>
        );
      }
      
      // Fallback to geometric shape for other notebooks
      return (
        <div style={{ ...baseStyle, background: 'linear-gradient(135deg, #8E44AD, #9B59B6)' }}>
          <div 
            className="rounded-lg border-4 border-purple-700 shadow-2xl"
            style={{
              width: '180px',
              height: '240px',
              backgroundColor: '#8E44AD',
              position: 'relative'
            }}
          >
            {/* Spiral binding */}
            <div 
              className="absolute left-0 top-0 h-full bg-gray-600 rounded-l-lg"
              style={{ width: '15px' }}
            />
            {/* Spiral rings */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute left-2 bg-gray-300 rounded-full"
                style={{
                  width: '8px',
                  height: '8px',
                  top: `${20 + i * 35}px`
                }}
              />
            ))}
          </div>
          {renderPreviewImages()}
        </div>
      );
    }

    // Pens/Boligrafos - Long Rectangle
    if (product.name.toLowerCase().includes('boligrafo') || product.name.toLowerCase().includes('pen')) {
      return (
        <div style={{ ...baseStyle, background: 'linear-gradient(135deg, #3498DB, #2980B9)' }}>
          <div 
            className="rounded-full border-4 border-blue-700 shadow-2xl"
            style={{
              width: '250px',
              height: '20px',
              backgroundColor: '#2980B9',
              position: 'relative'
            }}
          >
            {/* Pen tip */}
            <div 
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-600"
              style={{ 
                width: '0',
                height: '0',
                borderLeft: '15px solid #34495E',
                borderTop: '10px solid transparent',
                borderBottom: '10px solid transparent'
              }}
            />
            {/* Pen clip */}
            <div 
              className="absolute left-2 bg-gray-400 rounded-sm"
              style={{ width: '4px', height: '30px', top: '-5px' }}
            />
          </div>
          {renderPreviewImages()}
        </div>
      );
    }

    // Bags/Bolsas - Trapezoid shape
    if (product.name.toLowerCase().includes('bolsa') || product.name.toLowerCase().includes('mochila')) {
      // Use actual product image for Funda EKAIN2
      if (product.id === 'FUNDA-EKAIN2') {
        return (
          <div style={{ ...baseStyle, background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)' }}>
            <div className="relative rounded-lg shadow-2xl" style={{ width: '280px', height: '280px' }}>
              <img 
                src="/Funda EKAIN2 copy.png"
                alt="Funda EKAIN2"
                className="w-full h-full object-contain rounded-lg"
                onError={(e) => {
                  console.log('Funda EKAIN2 image failed to load, falling back to geometric shape');
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <div className="absolute inset-0">
                {renderPreviewImages()}
              </div>
            </div>
          </div>
        );
      }
      
      // Fallback to geometric shape for other bags
      return (
        <div style={{ ...baseStyle, background: 'linear-gradient(135deg, #335BC6, #335BC680)' }}>
          <div 
            className="rounded-lg border-4 border-blue-700 shadow-2xl"
            style={{
              width: '200px',
              height: '180px',
              backgroundColor: '#335BC6',
              position: 'relative',
              clipPath: 'polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)'
            }}
          >
            {/* Handles */}
            <div 
              className="absolute top-0 left-1/4 bg-blue-800 rounded-t-lg"
              style={{ width: '15px', height: '30px', transform: 'translateY(-15px)' }}
            />
            <div 
              className="absolute top-0 right-1/4 bg-blue-800 rounded-t-lg"
              style={{ width: '15px', height: '30px', transform: 'translateY(-15px)' }}
            />
          </div>
          {renderPreviewImages()}
        </div>
      );
    }
    
    // T-shirts/Polos - T-shape
    if (product.name.toLowerCase().includes('polo') || product.name.toLowerCase().includes('pullover')) {
      return (
        <div style={{ ...baseStyle, background: 'linear-gradient(135deg, #D40C63, #D40C6380)' }}>
          <div style={{ position: 'relative' }}>
            {/* Main body */}
            <div 
              className="rounded-lg border-4 border-pink-700 shadow-2xl"
              style={{
                width: '120px',
                height: '160px',
                backgroundColor: '#D40C63',
                position: 'relative'
              }}
            />
            {/* Sleeves */}
            <div 
              className="absolute top-0 left-0 bg-pink-600 rounded-lg border-2 border-pink-700"
              style={{ 
                width: '40px', 
                height: '60px', 
                transform: 'translateX(-35px)' 
              }}
            />
            <div 
              className="absolute top-0 right-0 bg-pink-600 rounded-lg border-2 border-pink-700"
              style={{ 
                width: '40px', 
                height: '60px', 
                transform: 'translateX(35px)' 
              }}
            />
            {/* Collar */}
            <div 
              className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-pink-700 rounded-b-lg"
              style={{ width: '60px', height: '30px' }}
            />
          </div>
          {renderPreviewImages()}
        </div>
      );
    }
    
    // Mugs/Tazas - Cylinder
    if (product.name.toLowerCase().includes('taza') || product.name.toLowerCase().includes('tazo')) {
      return (
        <div style={{ ...baseStyle, background: 'linear-gradient(135deg, #335BC6, #335BC680)' }}>
          <div style={{ position: 'relative' }}>
            {/* Main mug body */}
            <div 
              className="rounded-lg border-4 border-blue-700 shadow-2xl"
              style={{
                width: '120px',
                height: '140px',
                backgroundColor: '#335BC6',
                position: 'relative'
              }}
            />
            {/* Handle */}
            <div 
              className="absolute right-0 top-1/2 transform -translate-y-1/2 border-4 border-blue-700 rounded-full"
              style={{ 
                width: '40px', 
                height: '60px',
                backgroundColor: 'transparent',
                transform: 'translateX(20px) translateY(-50%)'
              }}
            />
            {/* Rim */}
            <div 
              className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-blue-800 rounded-full"
              style={{ width: '130px', height: '20px', transform: 'translateX(-50%) translateY(-10px)' }}
            />
          </div>
          {renderPreviewImages()}
        </div>
      );
    }
    
    // Caps/Gorras - Semi-circle with visor
    if (product.name.toLowerCase().includes('gorra')) {
      return (
        <div style={{ ...baseStyle, background: 'linear-gradient(135deg, #D40C63, #D40C6380)' }}>
          <div style={{ position: 'relative' }}>
            {/* Cap crown */}
            <div 
              className="rounded-t-full border-4 border-pink-700 shadow-2xl"
              style={{
                width: '160px',
                height: '80px',
                backgroundColor: '#D40C63',
                position: 'relative'
              }}
            />
            {/* Visor */}
            <div 
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-pink-600 rounded-full border-2 border-pink-700"
              style={{ 
                width: '200px', 
                height: '40px',
                transform: 'translateX(-50%) translateY(20px)'
              }}
            />
            {/* Top button */}
            <div 
              className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-pink-800 rounded-full"
              style={{ width: '15px', height: '15px', transform: 'translateX(-50%) translateY(-7px)' }}
            />
          </div>
          {renderPreviewImages()}
        </div>
      );
    }

    // Sports Bottles/Bidones - Cylinder
    if (product.name.toLowerCase().includes('bidon') || product.name.toLowerCase().includes('botella')) {
      // Use actual product images for specific bottles
      if (product.id === 'BIDON-400ML') {
        return (
          <div style={{ ...baseStyle, background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)' }}>
            <div className="relative rounded-lg shadow-2xl" style={{ width: '280px', height: '280px' }}>
              <img 
                src="/Bidón Deportivo 400ml copy.png"
                alt="Bidón Deportivo 400ml"
                className="w-full h-full object-contain rounded-lg"
                onError={(e) => {
                  console.log('Bidón Deportivo 400ml image failed to load, falling back to geometric shape');
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <div className="absolute inset-0">
                {renderPreviewImages()}
              </div>
            </div>
          </div>
        );
      }
      
      if (product.id === 'BIDONES-DEPORTIVOS') {
        return (
          <div style={{ ...baseStyle, background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)' }}>
            <div className="relative rounded-lg shadow-2xl" style={{ width: '280px', height: '280px' }}>
              <img 
                src="/Bidon Para Sublimar.png"
                alt="Bidones Deportivos"
                className="w-full h-full object-contain rounded-lg"
              />
              <div className="absolute inset-0">
                {renderPreviewImages()}
              </div>
            </div>
          </div>
        );
      }
      
      // Fallback to geometric shape for other bottles
      return (
        <div style={{ ...baseStyle, background: 'linear-gradient(135deg, #16A085, #1ABC9C)' }}>
          <div style={{ position: 'relative' }}>
            {/* Bottle body */}
            <div 
              className="rounded-lg border-4 border-teal-700 shadow-2xl"
              style={{
                width: '80px',
                height: '200px',
                backgroundColor: '#16A085',
                position: 'relative'
              }}
            />
            {/* Cap */}
            <div 
              className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-red-500 rounded-lg border-2 border-red-700"
              style={{ 
                width: '60px', 
                height: '30px',
                transform: 'translateX(-50%) translateY(-15px)'
              }}
            />
            {/* Sport nozzle */}
            <div 
              className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-gray-600 rounded-sm"
              style={{ 
                width: '15px', 
                height: '20px',
                transform: 'translateX(-50%) translateY(-35px)'
              }}
            />
          </div>
          {renderPreviewImages()}
        </div>
      );
    }

    // Umbrellas/Paraguas - Semi-circle
    if (product.name.toLowerCase().includes('paraguas')) {
      return (
        <div style={{ ...baseStyle, background: 'linear-gradient(135deg, #8E44AD, #9B59B6)' }}>
          <div style={{ position: 'relative' }}>
            {/* Umbrella canopy */}
            <div 
              className="rounded-t-full border-4 border-purple-700 shadow-2xl"
              style={{
                width: '220px',
                height: '110px',
                backgroundColor: '#8E44AD',
                position: 'relative'
              }}
            />
            {/* Handle */}
            <div 
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-gray-600 rounded-lg"
              style={{ 
                width: '8px', 
                height: '120px',
                transform: 'translateX(-50%) translateY(55px)'
              }}
            />
            {/* Handle grip */}
            <div 
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-gray-800 rounded-full"
              style={{ 
                width: '25px', 
                height: '25px',
                transform: 'translateX(-50%) translateY(165px)'
              }}
            />
          </div>
          {renderPreviewImages()}
        </div>
      );
    }

    // Mouse Pads - Rectangle
    if (product.name.toLowerCase().includes('mouse') && product.name.toLowerCase().includes('pod')) {
      return (
        <div style={{ ...baseStyle, background: 'linear-gradient(135deg, #2C3E50, #34495E)' }}>
          <div 
            className="rounded-lg border-4 border-gray-700 shadow-2xl"
            style={{
              width: '220px',
              height: '160px',
              backgroundColor: '#2C3E50',
              position: 'relative'
            }}
          />
          {renderPreviewImages()}
        </div>
      );
    }

    // Lanyards - Long rectangle
    if (product.name.toLowerCase().includes('lanyard')) {
      return (
        <div style={{ ...baseStyle, background: 'linear-gradient(135deg, #E67E22, #F39C12)' }}>
          <div style={{ position: 'relative' }}>
            {/* Lanyard strap */}
            <div 
              className="rounded-lg border-4 border-orange-700 shadow-2xl"
              style={{
                width: '40px',
                height: '200px',
                backgroundColor: '#E67E22',
                position: 'relative'
              }}
            />
            {/* Clip */}
            <div 
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-gray-400 rounded-sm border-2 border-gray-600"
              style={{ 
                width: '30px', 
                height: '20px',
                transform: 'translateX(-50%) translateY(10px)'
              }}
            />
            {/* ID card holder */}
            <div 
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-white rounded-sm border-2 border-gray-300"
              style={{ 
                width: '60px', 
                height: '40px',
                transform: 'translateX(-50%) translateY(35px)'
              }}
            />
          </div>
          {renderPreviewImages()}
        </div>
      );
    }

    // Hard Drives/Discos Duros - Rectangle
    if (product.name.toLowerCase().includes('disco') && product.name.toLowerCase().includes('duro')) {
      return (
        <div style={{ ...baseStyle, background: 'linear-gradient(135deg, #2C3E50, #34495E)' }}>
          <div 
            className="rounded-lg border-4 border-gray-700 shadow-2xl"
            style={{
              width: '180px',
              height: '120px',
              backgroundColor: '#2C3E50',
              position: 'relative'
            }}
          >
            {/* USB connector */}
            <div 
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-400 rounded-sm"
              style={{ 
                width: '20px', 
                height: '50px',
                transform: 'translateX(10px) translateY(-50%)'
              }}
            />
            {/* LED indicator */}
            <div 
              className="absolute top-2 left-2 bg-red-500 rounded-full"
              style={{ width: '8px', height: '8px' }}
            />
          </div>
          {renderPreviewImages()}
        </div>
      );
    }

    // Cooler/Lunchera - Rectangle with lid
    if (product.name.toLowerCase().includes('lunchera') || product.name.toLowerCase().includes('coolcan')) {
      return (
        <div style={{ ...baseStyle, background: 'linear-gradient(135deg, #27AE60, #2ECC71)' }}>
          <div style={{ position: 'relative' }}>
            {/* Cooler body */}
            <div 
              className="rounded-lg border-4 border-green-700 shadow-2xl"
              style={{
                width: '180px',
                height: '120px',
                backgroundColor: '#27AE60',
                position: 'relative'
              }}
            />
            {/* Lid */}
            <div 
              className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-green-600 rounded-lg border-2 border-green-700"
              style={{ 
                width: '170px', 
                height: '30px',
                transform: 'translateX(-50%) translateY(-15px)'
              }}
            />
            {/* Handle */}
            <div 
              className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-gray-600 rounded-lg"
              style={{ 
                width: '50px', 
                height: '15px',
                transform: 'translateX(-50%) translateY(-30px)'
              }}
            />
          </div>
          {renderPreviewImages()}
        </div>
      );
    }

    // Phone Stand/Soporte - Triangle with base
    if (product.name.toLowerCase().includes('soporte') || product.name.toLowerCase().includes('protok')) {
      return (
        <div style={{ ...baseStyle, background: 'linear-gradient(135deg, #8E44AD, #9B59B6)' }}>
          <div style={{ position: 'relative' }}>
            {/* Base */}
            <div 
              className="rounded-full border-4 border-purple-700 shadow-2xl"
              style={{
                width: '160px',
                height: '40px',
                backgroundColor: '#8E44AD',
                position: 'absolute',
                bottom: '0'
              }}
            />
            {/* Back support */}
            <div 
              className="rounded-lg border-4 border-purple-700 shadow-2xl"
              style={{
                width: '60px',
                height: '120px',
                backgroundColor: '#9B59B6',
                position: 'absolute',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)'
              }}
            />
          </div>
          {renderPreviewImages()}
        </div>
      );
    }
    
    // Default product shape for unrecognized products - Square
    return (
      <div style={{ ...baseStyle, background: 'linear-gradient(135deg, #FCCE08, #FCCE0880)' }}>
        <div 
          className="rounded-lg border-4 border-yellow-600 shadow-2xl"
          style={{
            width: '200px',
            height: '200px',
            backgroundColor: '#FCCE08',
            position: 'relative'
          }}
        />
        {renderPreviewImages()}
      </div>
    );
  };

  const getPersonalizationInfo = () => {
    if (!selectedProduct) return null;
    
    switch (selectedProduct.personalizacion) {
      case 'SERIGRAFIA':
        return {
          title: 'Serigrafía',
          description: 'Impresión de alta calidad con tintas especiales',
          specs: [
            `Máximo ${selectedProduct.coloresMax} colores`,
            'Resolución: 300 DPI',
            'Tintas: Plastisol/Base agua',
            'Durabilidad: Excelente'
          ],
          color: '#335BC6',
          bgColor: '#335BC620'
        };
      case 'SUBLIMACION':
        return {
          title: 'Sublimación',
          description: 'Transferencia de tinta a alta temperatura',
          specs: [
            'Colores ilimitados',
            'Resolución: 300 DPI',
            'Acabado: Mate satinado',
            'Tacto: Suave al tacto'
          ],
          color: '#D40C63',
          bgColor: '#D40C6320'
        };
      case 'GRABADO LASER':
        return {
          title: 'Grabado Láser',
          description: 'Grabado preciso con láser de alta potencia',
          specs: [
            'Monocromo (1 color)',
            'Precisión: 0.1mm',
            'Profundidad: 0.1-0.5mm',
            'Acabado: Mate natural'
          ],
          color: '#FCCE08',
          bgColor: '#FCCE0820'
        };
      default:
        return null;
    }
  };

  const personalizationInfo = getPersonalizationInfo();

  return (
    <div className="rounded-lg shadow-lg border-2 p-8" style={{ backgroundColor: '#11142020', borderColor: '#FCCE08' }}>
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-semibold flex items-center" style={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: 600 }}>
          <Eye className="mr-3 h-6 w-6" style={{ color: '#FCCE08' }} />
          Vista Previa 3D
        </h3>
        <div className="flex space-x-3">
          <button
            onClick={() => handleZoom('out')}
            className="p-3 rounded-lg transition-all hover:scale-110 shadow-md"
            style={{ backgroundColor: '#335BC620' }}
            title="Alejar"
          >
            <ZoomOut className="h-5 w-5" style={{ color: '#335BC6' }} />
          </button>
          <button
            onClick={() => handleZoom('in')}
            className="p-3 rounded-lg transition-all hover:scale-110 shadow-md"
            style={{ backgroundColor: '#335BC620' }}
            title="Acercar"
          >
            <ZoomIn className="h-5 w-5" style={{ color: '#335BC6' }} />
          </button>
          <button
            onClick={() => handleRotate('left')}
            className="p-3 rounded-lg transition-all hover:scale-110 shadow-md"
            style={{ backgroundColor: '#335BC620' }}
            title="Rotar izquierda"
          >
            <RotateCcw className="h-5 w-5" style={{ color: '#335BC6' }} />
          </button>
          <button
            onClick={() => handleRotate('right')}
            className="p-3 rounded-lg transition-all hover:scale-110 shadow-md"
            style={{ backgroundColor: '#335BC620' }}
            title="Rotar derecha"
          >
            <RotateCw className="h-5 w-5" style={{ color: '#335BC6' }} />
          </button>
          <button
            className="p-3 rounded-lg transition-all hover:scale-110 shadow-md"
            style={{ backgroundColor: '#335BC620' }}
            title="Pantalla completa"
          >
            <Maximize2 className="h-5 w-5" style={{ color: '#335BC6' }} />
          </button>
        </div>
      </div>

      {selectedProduct ? (
        <div className="space-y-8">
          <div className="relative rounded-xl p-12 min-h-[400px] flex items-center justify-center" 
               style={{ background: 'linear-gradient(135deg, #11142020, #335BC620, #D40C6320)' }}>
            {getProductGeometricShape(selectedProduct)}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-4" style={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: 600 }}>
                Área de personalización
              </label>
              <select
                value={selectedArea}
                onChange={(e) => onAreaChange(e.target.value)}
                className="w-full px-4 py-4 border-2 rounded-lg focus:ring-2 focus:border-transparent shadow-sm text-lg"
                style={{ 
                  backgroundColor: '#11142040',
                  borderColor: '#FCCE08', 
                  fontFamily: 'Nunito', 
                  fontWeight: 500,
                  color: '#ffffff'
                }}
              >
                {selectedProduct.areas.map(area => (
                  <option key={area} value={area} style={{ backgroundColor: '#111420', color: '#ffffff' }}>
                    {area.charAt(0).toUpperCase() + area.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Color selector for Ecocard notebooks */}
            {selectedProduct.id === 'LIBRETA-ECOCARD' && (
              <div>
                <label className="block text-sm font-medium mb-4" style={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: 600 }}>
                  Color de la libreta
                </label>
                <select
                  value={ecocardColor}
                  onChange={(e) => setEcocardColor(e.target.value)}
                  className="w-full px-4 py-4 border-2 rounded-lg focus:ring-2 focus:border-transparent shadow-sm text-lg"
                  style={{ 
                    backgroundColor: '#11142040',
                    borderColor: '#8E44AD', 
                    fontFamily: 'Nunito', 
                    fontWeight: 500,
                    color: '#ffffff'
                  }}
                >
                  <option value="blanco" style={{ backgroundColor: '#111420', color: '#ffffff' }}>
                    Blanco
                  </option>
                  <option value="amarillo" style={{ backgroundColor: '#111420', color: '#ffffff' }}>
                    Amarillo
                  </option>
                  <option value="verde" style={{ backgroundColor: '#111420', color: '#ffffff' }}>
                    Verde
                  </option>
                </select>
              </div>
            )}

            {/* Color selector for Tunel notebooks */}
            {selectedProduct.id === 'LIBRETA-TUNEL' && (
              <div>
                <label className="block text-sm font-medium mb-4" style={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: 600 }}>
                  Color de la libreta
                </label>
                <select
                  value={tunelColor}
                  onChange={(e) => setTunelColor(e.target.value)}
                  className="w-full px-4 py-4 border-2 rounded-lg focus:ring-2 focus:border-transparent shadow-sm text-lg"
                  style={{ 
                    backgroundColor: '#11142040',
                    borderColor: '#8E44AD', 
                    fontFamily: 'Nunito', 
                    fontWeight: 500,
                    color: '#ffffff'
                  }}
                >
                  <option value="azul" style={{ backgroundColor: '#111420', color: '#ffffff' }}>
                    Azul
                  </option>
                  <option value="verde" style={{ backgroundColor: '#111420', color: '#ffffff' }}>
                    Verde
                  </option>
                  <option value="magenta" style={{ backgroundColor: '#111420', color: '#ffffff' }}>
                    Magenta
                  </option>
                </select>
              </div>
            )}
            {/* Rotation and Zoom controls - only show if not Ecocard or if Ecocard show in single column */}
            {selectedProduct.id !== 'LIBRETA-ECOCARD' && selectedProduct.id !== 'LIBRETA-TUNEL' && (
              <div className="text-center p-6 rounded-lg" style={{ backgroundColor: '#11142040' }}>
                <div className="space-y-3">
                  <div className="inline-flex items-center space-x-4 text-sm font-semibold" style={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: 600 }}>
                    <span>Rotación:</span>
                    <span 
                      className="font-mono px-4 py-2 rounded-lg text-lg"
                      style={{ backgroundColor: '#335BC620', color: '#335BC6', fontFamily: 'Nunito', fontWeight: 700 }}
                    >
                      {rotation}°
                    </span>
                  </div>
                  <div className="inline-flex items-center space-x-4 text-sm font-semibold" style={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: 600 }}>
                    <span>Zoom:</span>
                    <span 
                      className="font-mono px-4 py-2 rounded-lg text-lg"
                      style={{ backgroundColor: '#D40C6320', color: '#D40C63', fontFamily: 'Nunito', fontWeight: 700 }}
                    >
                      {Math.round(zoom * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Show rotation and zoom for Ecocard in full width */}
          {(selectedProduct.id === 'LIBRETA-ECOCARD' || selectedProduct.id === 'LIBRETA-TUNEL') && (
            <div className="text-center p-6 rounded-lg" style={{ backgroundColor: '#11142040' }}>
              <div className="space-y-3">
                <div className="inline-flex items-center space-x-4 text-sm font-semibold" style={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: 600 }}>
                  <span>Rotación:</span>
                  <span 
                    className="font-mono px-4 py-2 rounded-lg text-lg"
                    style={{ backgroundColor: '#335BC620', color: '#335BC6', fontFamily: 'Nunito', fontWeight: 700 }}
                  >
                    {rotation}°
                  </span>
                </div>
                <div className="inline-flex items-center space-x-4 text-sm font-semibold" style={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: 600 }}>
                  <span>Zoom:</span>
                  <span 
                    className="font-mono px-4 py-2 rounded-lg text-lg"
                    style={{ backgroundColor: '#D40C6320', color: '#D40C63', fontFamily: 'Nunito', fontWeight: 700 }}
                  >
                    {Math.round(zoom * 100)}%
                  </span>
                </div>
              </div>
            </div>
          )}

          {personalizationInfo && (
            <div 
              className="rounded-xl p-8 border-2 shadow-inner"
              style={{ 
                backgroundColor: personalizationInfo.bgColor,
                borderColor: personalizationInfo.color
              }}
            >
              <h4 className="font-bold text-xl mb-4" style={{ fontFamily: 'Nunito', fontWeight: 700, color: personalizationInfo.color }}>
                {personalizationInfo.title}
              </h4>
              <p className="text-base mb-6 font-medium" style={{ fontFamily: 'Nunito', fontWeight: 500, color: '#ffffff' }}>
                {personalizationInfo.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {personalizationInfo.specs.map((spec, index) => (
                  <div key={index} className="text-sm flex items-center font-medium p-3 rounded-lg" 
                       style={{ fontFamily: 'Nunito', fontWeight: 500, color: '#ffffff', backgroundColor: 'rgba(255,255,255,0.05)' }}>
                    <span 
                      className="w-4 h-4 rounded-full mr-4 flex-shrink-0"
                      style={{ backgroundColor: personalizationInfo.color }}
                    ></span>
                    {spec}
                  </div>
                ))}
              </div>
            </div>
          )}

          {previewElements.length > 0 && (
            <div className="rounded-xl p-6 border-2" style={{ backgroundColor: '#11142040', borderColor: '#FCCE08' }}>
              <h4 className="font-bold text-lg mb-4" style={{ fontFamily: 'Nunito', fontWeight: 700, color: '#FCCE08' }}>
                Elementos en el Diseño
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {previewElements.map((element, index) => (
                  <div key={element.id} className="flex items-center p-4 rounded-lg" style={{ backgroundColor: '#335BC620' }}>
                    <div className="w-12 h-12 rounded-lg mr-4 border-2 border-white overflow-hidden">
                      {element.src && (
                        <img src={element.src} alt={`Elemento ${index + 1}`} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-sm" style={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: 600 }}>
                        Imagen {index + 1}
                      </p>
                      <p className="text-xs" style={{ color: '#335BC6', fontFamily: 'Nunito', fontWeight: 500 }}>
                        {Math.round(element.width || 100)} × {Math.round(element.height || 100)} px
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center h-96 rounded-xl" style={{ backgroundColor: '#11142040' }}>
          <div className="text-center">
            <div 
              className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: '#FCCE0820' }}
            >
              <Eye className="h-12 w-12" style={{ color: '#FCCE08' }} />
            </div>
            <p className="font-bold text-xl mb-3" style={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: 700 }}>
              Selecciona un producto
            </p>
            <p className="text-base font-medium" style={{ color: '#335BC6', fontFamily: 'Nunito', fontWeight: 500 }}>
              para ver la vista previa 3D
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewArea;