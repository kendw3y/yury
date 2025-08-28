// components/CustomSelect.tsx
import React, { useState } from 'react';

interface Option {
  label: string;
  value: string | number;
}

interface CustomSelectProps {
  options: Option[];
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  // Estilos personalizables
  bgColor?: string; // fondo
  textColor?: string; // color del texto
  borderColor?: string; // color del borde
  borderRadius?: string; // redondeo: 'none', 'sm', 'md', 'lg', 'full'
  borderWidth?: string; // grosor: '1', '2', '4'
  size?: 'sm' | 'md' | 'lg'; // tamaño
  className?: string; // clases adicionales
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Selecciona una opción",
  bgColor = 'bg-white',
  textColor = 'text-gray-700',
  borderColor = 'border-gray-300',
  borderRadius = 'rounded-md',
  borderWidth = 'border',
  size = 'md',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: Option) => {
    onChange(option.value);
    setIsOpen(false);
  };

  const selectedLabel = options.find(opt => opt.value === value)?.label || placeholder;

  // Tamaños
  const sizeClasses = {
    sm: 'text-sm py-1 px-2',
    md: 'text-base py-2 px-3',
    lg: 'text-lg py-3 px-4',
  };

  return (
    <div className={`relative inline-block w-full ${className}`}>
      {/* Select simulado */}
      <div onClick={() => setIsOpen(!isOpen)} className={` ${bgColor} ${textColor} ${borderWidth} ${borderColor} ${borderRadius} ${sizeClasses[size]} cursor-pointer flex justify-between items-center border hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200 shadow-sm
        `}
        role="combobox"
        aria-expanded={isOpen}
        tabIndex={0}
      >
        <span>{selectedLabel}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
          />
        </svg>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <ul className={`   ${bgColor}
${textColor}
${borderWidth} ${borderColor}
${borderRadius}
absolute
z-10
mt-1
w-full
max-h-60
overflow-auto
shadow-lg
ring-1
ring-black
ring-opacity-5
          `}
          role="listbox"
        >
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option)}
              className={`
                ${sizeClasses[size]}
                px-4
                cursor-pointer
                hover:bg-blue-100
                hover:text-blue-800
                transition
                duration-150
                flex
                items-center
                border-b
                border-gray-100
                last:border-b-0
              `}
              role="option"
              aria-selected={option.value === value}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}

      {/* Overlay para cerrar al hacer clic fuera */}
      {isOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default CustomSelect;