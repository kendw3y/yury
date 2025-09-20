// components/ImageUploadButton.tsx
import { Camera, Pencil } from 'lucide-react';
import { type ChangeEvent, useRef, useState, useEffect } from 'react';

interface ImageUploadButtonProps {
  onImageUpload: (file: File) => void;
  imageUrl?: string | null;
  className?: string;
}

export const ImageUploadButton = ({
  onImageUpload,
  imageUrl: externalImageUrl, // Renombramos para distinguir de la local
  className = '',
}: ImageUploadButtonProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Limpiar URL temporal cuando el componente se desmonte o cuando cambie la imagen externa
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Si cambia la imageUrl externa, limpiamos la preview local
  useEffect(() => {
    if (externalImageUrl && previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  }, [externalImageUrl]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onImageUpload) {
      // Generar vista previa
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      // Notificar al padre
      onImageUpload(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  // Decidimos qué imagen mostrar: primero la preview local, luego la externa
  const displayImageUrl = previewUrl || externalImageUrl;

  return (
    <div className={`relative inline-flex ${className} h-full w-full rounded-l-xl`}>
      {/* Imagen de perfil o placeholder */}
      <div
        className={`
          relative flex items-center justify-center bg-gray-200
          w-full h-full ${displayImageUrl ? 'bg-cover bg-center' : 'cursor-pointer'}
        `}
        style={displayImageUrl ? { backgroundImage: `url(${displayImageUrl})` } : {}}
        onClick={displayImageUrl ? undefined : handleClick} // Solo clickable si no hay imagen
      >
        {!displayImageUrl && (
          <Camera className="text-gray-900" />
        )}
        {displayImageUrl && (
          <div
            className="
              absolute bottom-2 right-2
              bg-gray-500 rounded-full
              p-2 shadow-lg hover:bg-gray-600
              transition-colors ease-in-out
              flex items-center justify-center
              cursor-pointer
            "
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
            aria-label="Editar imagen"
          >
            <Pencil className="w-4 h-4" />
          </div>
        )}
      </div>

      {/* Input oculto para seleccionar imagen */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="sr-only"
      />
    </div>
  );
};