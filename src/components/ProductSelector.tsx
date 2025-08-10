import React from 'react';
import { ChevronDown, Filter } from 'lucide-react';
import { Product } from '../types/Product';

interface ProductSelectorProps {
  products: Product[];
  selectedProduct: Product | null;
  onProductSelect: (product: Product) => void;
  selectedPersonalization: string;
  onPersonalizationChange: (personalization: string) => void;
}

const ProductSelector: React.FC<ProductSelectorProps> = ({
  products,
  selectedProduct,
  onProductSelect,
  selectedPersonalization,
  onPersonalizationChange
}) => {
  const personalizations = ['TODOS', ...Array.from(new Set(products.map(p => p.personalizacion)))];

  const filteredProducts = products.filter(product => {
    const personalizationMatch = selectedPersonalization === 'TODOS' || product.personalizacion === selectedPersonalization;
    return personalizationMatch;
  });

  return (
    <div className="rounded-lg shadow-lg border-2 p-6 mb-6" style={{ backgroundColor: '#11142020', borderColor: '#335BC6' }}>
      <h2 className="text-xl font-semibold mb-6 flex items-center" style={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: 700 }}>
        <Filter className="mr-3 h-6 w-6" style={{ color: '#335BC6' }} />
        Selector de Productos
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium mb-3" style={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: 600 }}>
            Tipo de Personalización
          </label>
          <div className="relative">
            <select
              value={selectedPersonalization}
              onChange={(e) => onPersonalizationChange(e.target.value)}
              className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:border-transparent appearance-none shadow-sm"
              style={{ 
                backgroundColor: '#11142040',
                borderColor: '#335BC6',
                fontFamily: 'Nunito',
                fontWeight: 500,
                color: '#ffffff'
              }}
            >
              {personalizations.map(personalization => (
                <option key={personalization} value={personalization} style={{ backgroundColor: '#111420', color: '#ffffff' }}>
                  {personalization}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-3.5 h-5 w-5 pointer-events-none" style={{ color: '#335BC6' }} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-3" style={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: 600 }}>
            Producto
          </label>
          <div className="relative">
            <select
              value={selectedProduct?.id || ''}
              onChange={(e) => {
                const product = filteredProducts.find(p => p.id === e.target.value);
                if (product) onProductSelect(product);
              }}
              className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:border-transparent appearance-none shadow-sm"
              style={{ 
                backgroundColor: '#11142040',
                borderColor: '#335BC6',
                fontFamily: 'Nunito',
                fontWeight: 500,
                color: '#ffffff'
              }}
            >
              <option value="" style={{ backgroundColor: '#111420', color: '#ffffff' }}>
                Seleccionar producto...
              </option>
              {filteredProducts.map(product => (
                <option key={product.id} value={product.id} style={{ backgroundColor: '#111420', color: '#ffffff' }}>
                  {product.name} - €{product.price?.toFixed(2)}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-3.5 h-5 w-5 pointer-events-none" style={{ color: '#335BC6' }} />
          </div>
        </div>
      </div>

      {selectedProduct && (
        <div 
          className="rounded-lg p-6 border-2 shadow-inner"
          style={{ backgroundColor: '#335BC620', borderColor: '#335BC6' }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-lg" style={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: 700 }}>
                {selectedProduct.name}
              </h3>
              <p className="text-sm font-semibold" style={{ color: '#335BC6', fontFamily: 'Nunito', fontWeight: 600 }}>
                {selectedProduct.personalizacion}
              </p>
              <p className="text-sm" style={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: 500 }}>
                Áreas: {selectedProduct.areas.join(', ')} • 
                Colores máx: {selectedProduct.coloresMax}
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold" style={{ color: '#D40C63', fontFamily: 'Nunito', fontWeight: 800 }}>
                €{selectedProduct.price?.toFixed(2)}
              </p>
              <p className="text-sm font-medium" style={{ color: '#FCCE08', fontFamily: 'Nunito', fontWeight: 600 }}>
                Precio base
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSelector;