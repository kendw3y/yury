// components/ImageUploadButton.tsx
import { Camera, Pencil } from 'lucide-react';
import {type ChangeEvent, useRef } from 'react';

interface ImageUploadButtonProps {
  onImageUpload: (file: File) => void;
  imageUrl?: string | null;
  
  className?: string;
}

export const ImageUploadButton = ({
  onImageUpload,
  imageUrl,
  
  className = '',
}: ImageUploadButtonProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);


  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onImageUpload) {
      onImageUpload(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`relative inline-flex ${className} h-full w-full rounded-l-xl`}>
      {/* Imagen de perfil o placeholder */}
      <div
        className={`
          relative flex items-center justify-center   bg-gray-200
          w-full h-full ${imageUrl ? 'bg-cover bg-center' : 'cursor-pointer'}
        `}
        style={imageUrl ? { backgroundImage: `url(${imageUrl})` } : {}}
        onClick={imageUrl?()=>{}:handleClick}
      >
        {!imageUrl && (
          <Camera  className="text-gray-900"  />
        )}
        {imageUrl&&(<div
          className="
            absolute bottom-2 right-2
            bg-gray-500  rounded-full
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
          <Pencil className='w-4 h-4' />
        </div>)}
      </div>
        

      {/* Input oculto para seleccionar imagen */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="sr-only" // oculto pero accesible
      />
    </div>
  );
};