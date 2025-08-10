import React from 'react';
import { Image, RotateCcw, Save, Upload, Palette, Settings } from 'lucide-react';

interface ToolsPanelProps {
  onAddImage: () => void;
  onReset: () => void;
  onSave: () => void;
  hasSelectedProduct: boolean;
}

const ToolsPanel: React.FC<ToolsPanelProps> = ({
  onAddImage,
  onReset,
  onSave,
  hasSelectedProduct
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Main Tools Section */}
      <div className="rounded-lg shadow-lg border-2 p-6" style={{ backgroundColor: '#11142020', borderColor: '#D40C63' }}>
        <h3 className="text-lg font-semibold mb-6 flex items-center" style={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: 600 }}>
          <Upload className="mr-2 h-5 w-5" style={{ color: '#D40C63' }} />
          Subir Contenido
        </h3>
        
        <button
          onClick={onAddImage}
          disabled={!hasSelectedProduct}
          className={`w-full flex items-center px-6 py-4 rounded-lg transition-all transform hover:scale-105 border-2 shadow-md mb-4 ${
            !hasSelectedProduct ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          style={{ 
            backgroundColor: hasSelectedProduct ? '#D40C6320' : '#11142040',
            borderColor: hasSelectedProduct ? '#D40C63' : '#666666',
            color: '#ffffff',
            fontFamily: 'Nunito',
            fontWeight: 700
          }}
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-lg mr-4" style={{ backgroundColor: hasSelectedProduct ? '#D40C63' : '#666666' }}>
            <Image className="h-6 w-6" style={{ color: 'white' }} />
          </div>
          <div className="text-left">
            <div className="font-bold">
              {hasSelectedProduct ? 'Agregar Imagen' : 'Selecciona un producto'}
            </div>
            <div className="text-sm font-medium opacity-80">
              {hasSelectedProduct ? 'Personaliza tu diseño' : 'Primero elige un producto'}
            </div>
          </div>
        </button>

        <div className="p-4 rounded-lg border-2" style={{ backgroundColor: '#335BC620', borderColor: '#335BC6' }}>
          <h4 className="font-semibold mb-3 flex items-center" style={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: 600 }}>
            <Settings className="mr-2 h-4 w-4" style={{ color: '#335BC6' }} />
            Formatos Soportados
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs font-medium" style={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: 500 }}>
            <div className="flex items-center">
              <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: '#D40C63' }}></span>
              JPG/JPEG
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: '#335BC6' }}></span>
              PNG
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: '#FCCE08' }}></span>
              GIF
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: '#ffffff' }}></span>
              SVG
            </div>
          </div>
        </div>
      </div>

      {/* Design Actions */}
      <div className="rounded-lg shadow-lg border-2 p-6" style={{ backgroundColor: '#11142020', borderColor: '#335BC6' }}>
        <h3 className="text-lg font-semibold mb-6 flex items-center" style={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: 600 }}>
          <Palette className="mr-2 h-5 w-5" style={{ color: '#335BC6' }} />
          Acciones de Diseño
        </h3>
        
        <div className="space-y-4">
          <button
            onClick={onSave}
            className="w-full flex items-center justify-center px-6 py-4 rounded-lg transition-all transform hover:scale-105 shadow-md"
            style={{ backgroundColor: '#335BC6', color: '#ffffff', fontFamily: 'Nunito', fontWeight: 700 }}
          >
            <Save className="mr-3 h-5 w-5" />
            Guardar Diseño
          </button>

          <button
            onClick={onReset}
            className="w-full flex items-center justify-center px-6 py-4 rounded-lg transition-all transform hover:scale-105 shadow-md"
            style={{ backgroundColor: '#FCCE08', color: '#111420', fontFamily: 'Nunito', fontWeight: 700 }}
          >
            <RotateCcw className="mr-3 h-5 w-5" />
            Resetear Todo
          </button>
        </div>
      </div>

      {/* Tips and Guidelines */}
      <div className="rounded-lg shadow-lg border-2 p-6" style={{ backgroundColor: '#11142020', borderColor: '#FCCE08' }}>
        <h3 className="text-lg font-semibold mb-6 flex items-center" style={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: 600 }}>
          💡 Consejos
        </h3>
        
        <div className="space-y-3">
          <div className="p-3 rounded-lg" style={{ backgroundColor: '#335BC620' }}>
            <h4 className="font-semibold text-sm mb-2" style={{ color: '#335BC6', fontFamily: 'Nunito', fontWeight: 600 }}>
              Calidad de Imagen
            </h4>
            <ul className="space-y-1 text-xs" style={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: 500 }}>
              <li>• Resolución mínima: 300 DPI</li>
              <li>• Formato PNG para transparencias</li>
              <li>• Tamaño máximo: 10MB</li>
            </ul>
          </div>

          <div className="p-3 rounded-lg" style={{ backgroundColor: '#D40C6320' }}>
            <h4 className="font-semibold text-sm mb-2" style={{ color: '#D40C63', fontFamily: 'Nunito', fontWeight: 600 }}>
              Diseño Efectivo
            </h4>
            <ul className="space-y-1 text-xs" style={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: 500 }}>
              <li>• Considera el área de impresión</li>
              <li>• Usa colores de alto contraste</li>
              <li>• Revisa la vista previa 3D</li>
            </ul>
          </div>

          <div className="p-3 rounded-lg" style={{ backgroundColor: '#FCCE0820' }}>
            <h4 className="font-semibold text-sm mb-2" style={{ color: '#FCCE08', fontFamily: 'Nunito', fontWeight: 600 }}>
              Personalización
            </h4>
            <ul className="space-y-1 text-xs" style={{ color: '#ffffff', fontFamily: 'Nunito', fontWeight: 500 }}>
              <li>• Ajusta tamaño y posición</li>
              <li>• Rota para mejor composición</li>
              <li>• Guarda copias de seguridad</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsPanel;