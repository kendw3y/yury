import React, { useState, useEffect } from 'react';
import { MessageSquare, Sparkles, Save, RotateCcw, FileText, Lightbulb } from 'lucide-react';
import { Product } from '../types/Product';

interface ProductDescriptionProps {
  selectedProduct: Product | null;
  onDescriptionChange: (description: string) => void;
  description: string;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({
  selectedProduct,
  onDescriptionChange,
  description
}) => {
  const [localDescription, setLocalDescription] = useState(description);
  const [wordCount, setWordCount] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    setLocalDescription(description);
    setWordCount(description.trim().split(/\s+/).filter(word => word.length > 0).length);
  }, [description]);

  useEffect(() => {
    if (selectedProduct) {
      generateSuggestions();
    }
  }, [selectedProduct]);

  const generateSuggestions = () => {
    if (!selectedProduct) return;

    const productSuggestions: { [key: string]: string[] } = {
      'usb': [
        'Logo de la empresa en el centro con colores corporativos',
        'Diseño minimalista con tipografía moderna',
        'Incluir información de contacto en letra pequeña'
      ],
      'polo': [
        'Logo bordado en el pecho izquierdo',
        'Diseño llamativo en la espalda con slogan',
        'Colores que combinen con la identidad de marca'
      ],
      'taza': [
        'Diseño que rodee toda la taza con degradado',
        'Logo principal en un lado, información en el otro',
        'Colores vibrantes que resalten con el café'
      ],
      'bolsa': [
        'Diseño grande y visible en el panel frontal',
        'Logo centrado con elementos decorativos',
        'Colores que contrasten con el material de la bolsa'
      ],
      'gorra': [
        'Logo bordado en la parte frontal',
        'Diseño en la visera para mayor visibilidad',
        'Colores que combinen con diferentes outfits'
      ],
      'libreta': [
        'Diseño elegante en la portada con acabado mate',
        'Logo en esquina inferior con información de contacto',
        'Colores profesionales que transmitan confianza'
      ]
    };

    const productType = Object.keys(productSuggestions).find(type => 
      selectedProduct.name.toLowerCase().includes(type)
    );

    if (productType) {
      setSuggestions(productSuggestions[productType]);
    } else {
      setSuggestions([
        'Diseño que refleje la identidad de tu marca',
        'Colores que generen impacto visual',
        'Elementos que comuniquen tu mensaje claramente'
      ]);
    }
  };

  const handleDescriptionChange = (value: string) => {
    setLocalDescription(value);
    setWordCount(value.trim().split(/\s+/).filter(word => word.length > 0).length);
    onDescriptionChange(value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    const newDescription = localDescription ? `${localDescription}\n\n${suggestion}` : suggestion;
    handleDescriptionChange(newDescription);
  };

  const handleClear = () => {
    handleDescriptionChange('');
  };

  const getPersonalizationTips = () => {
    if (!selectedProduct) return [];

    switch (selectedProduct.personalizacion) {
      case 'SERIGRAFIA':
        return [
          'Usa colores sólidos y contrastantes',
          'Evita degradados complejos',
          'Diseños con líneas definidas funcionan mejor',
          `Máximo ${selectedProduct.coloresMax} colores por diseño`
        ];
      case 'SUBLIMACION':
        return [
          'Puedes usar todos los colores que desees',
          'Los degradados y fotografías se ven excelentes',
          'Colores vibrantes dan mejores resultados',
          'Ideal para diseños complejos y detallados'
        ];
      case 'GRABADO LASER':
        return [
          'Solo se puede grabar en un color (monocromo)',
          'Diseños con líneas finas se ven profesionales',
          'Textos y logos simples funcionan mejor',
          'El resultado es permanente y elegante'
        ];
      default:
        return [];
    }
  };

  const tips = getPersonalizationTips();

  return (
    <div className="rounded-lg shadow-lg border-2 p-6" style={{ backgroundColor: '#11142020', borderColor: '#D40C63' }}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold flex items-center" style={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: 700 }}>
          <MessageSquare className="mr-3 h-6 w-6" style={{ color: '#D40C63' }} />
          Descripción del Diseño
        </h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium px-3 py-1 rounded-full" 
                style={{ backgroundColor: '#335BC620', color: '#335BC6', fontFamily: 'Nunito', fontWeight: 600 }}>
            {wordCount} palabras
          </span>
          {localDescription && (
            <button
              onClick={handleClear}
              className="p-2 rounded-lg transition-all hover:scale-110"
              style={{ backgroundColor: '#FCCE0820' }}
              title="Limpiar descripción"
            >
              <RotateCcw className="h-4 w-4" style={{ color: '#FCCE08' }} />
            </button>
          )}
        </div>
      </div>

      {selectedProduct ? (
        <div className="space-y-6">
          {/* Product Context */}
          <div className="p-4 rounded-lg border-2" style={{ backgroundColor: '#335BC620', borderColor: '#335BC6' }}>
            <div className="flex items-center mb-3">
              <FileText className="mr-2 h-5 w-5" style={{ color: '#335BC6' }} />
              <h4 className="font-semibold" style={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: 600 }}>
                Producto Seleccionado
              </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium" style={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: 600 }}>
                  {selectedProduct.name}
                </p>
                <p style={{ color: '#335BC6', fontFamily: 'Nunito', fontWeight: 500 }}>
                  {selectedProduct.personalizacion}
                </p>
              </div>
              <div>
                <p className="font-medium" style={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: 500 }}>
                  Áreas: {selectedProduct.areas.join(', ')}
                </p>
                <p style={{ color: '#335BC6', fontFamily: 'Nunito', fontWeight: 500 }}>
                  Colores máx: {selectedProduct.coloresMax}
                </p>
              </div>
            </div>
          </div>

          {/* Description Textarea */}
          <div className="relative">
            <label className="block text-sm font-medium mb-3" style={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: 600 }}>
              Describe cómo quieres que sea tu diseño
            </label>
            <div className="relative">
              <textarea
                value={localDescription}
                onChange={(e) => handleDescriptionChange(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Ejemplo: Quiero el logo de mi empresa centrado en color azul, con el nombre debajo en letra moderna. El fondo debe ser blanco para que contraste bien..."
                className={`w-full px-4 py-4 border-2 rounded-lg focus:ring-2 focus:border-transparent resize-none transition-all ${
                  isFocused ? 'shadow-lg' : 'shadow-sm'
                }`}
                style={{ 
                  backgroundColor: '#11142040',
                  borderColor: isFocused ? '#D40C63' : '#335BC6',
                  fontFamily: 'Nunito',
                  fontWeight: 500,
                  color: '#ffffff',
                  minHeight: '120px'
                }}
                rows={6}
              />
              {isFocused && (
                <div className="absolute -bottom-1 left-0 right-0 h-1 rounded-b-lg" 
                     style={{ background: 'linear-gradient(90deg, #D40C63, #335BC6, #FCCE08)' }} />
              )}
            </div>
            <p className="text-xs mt-2 font-medium" style={{ color: '#335BC6', fontFamily: 'Nunito', fontWeight: 500 }}>
              Sé específico sobre colores, posición, tamaño y estilo para obtener el mejor resultado
            </p>
          </div>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="p-4 rounded-lg border-2" style={{ backgroundColor: '#FCCE0820', borderColor: '#FCCE08' }}>
              <div className="flex items-center mb-4">
                <Sparkles className="mr-2 h-5 w-5" style={{ color: '#FCCE08' }} />
                <h4 className="font-semibold" style={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: 600 }}>
                  Sugerencias para tu producto
                </h4>
              </div>
              <div className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left p-3 rounded-lg transition-all hover:scale-[1.02] border-2 border-transparent hover:border-current"
                    style={{ backgroundColor: '#11142040', color: '#ffffff', fontFamily: 'Nunito', fontWeight: 500 }}
                  >
                    <div className="flex items-start">
                      <Lightbulb className="mr-3 h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: '#FCCE08' }} />
                      <span className="text-sm">{suggestion}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Personalization Tips */}
          {tips.length > 0 && (
            <div className="p-4 rounded-lg border-2" style={{ backgroundColor: '#D40C6320', borderColor: '#D40C63' }}>
              <div className="flex items-center mb-4">
                <Lightbulb className="mr-2 h-5 w-5" style={{ color: '#D40C63' }} />
                <h4 className="font-semibold" style={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: 600 }}>
                  Consejos para {selectedProduct.personalizacion}
                </h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {tips.map((tip, index) => (
                  <div key={index} className="flex items-start p-3 rounded-lg" 
                       style={{ backgroundColor: '#11142040' }}>
                    <span className="w-2 h-2 rounded-full mr-3 mt-2 flex-shrink-0" 
                          style={{ backgroundColor: '#D40C63' }} />
                    <span className="text-sm font-medium" 
                          style={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: 500 }}>
                      {tip}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Character Count and Save Info */}
          <div className="flex items-center justify-between p-4 rounded-lg" 
               style={{ backgroundColor: '#335BC620' }}>
            <div className="flex items-center space-x-4">
              <div className="text-sm font-medium" style={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: 500 }}>
                <span style={{ color: '#335BC6' }}>Caracteres:</span> {localDescription.length}/1000
              </div>
              <div className="text-sm font-medium" style={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: 500 }}>
                <span style={{ color: '#335BC6' }}>Palabras:</span> {wordCount}
              </div>
            </div>
            <div className="flex items-center text-sm font-medium" style={{ color: '#FCCE08', fontFamily: 'Nunito', fontWeight: 500 }}>
              <Save className="mr-2 h-4 w-4" />
              Se guarda automáticamente
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-64 rounded-xl" style={{ backgroundColor: '#11142040' }}>
          <div className="text-center">
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: '#D40C6320' }}
            >
              <MessageSquare className="h-10 w-10" style={{ color: '#D40C63' }} />
            </div>
            <p className="font-bold text-lg mb-2" style={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: 700 }}>
              Selecciona un producto
            </p>
            <p className="text-sm font-medium" style={{ color: '#335BC6', fontFamily: 'Nunito', fontWeight: 500 }}>
              para describir tu diseño personalizado
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDescription;