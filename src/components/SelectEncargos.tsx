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

export const SelectEncargos: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Selecciona una opción",
  borderRadius = 'rounded-md',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel,setSelectedLabel] = useState(options.find(opt => opt.value === value)?.label || placeholder)

  const handleSelect = (option: Option) => {
    onChange(option.value);
    setSelectedLabel(option.label)
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block  ${className}`}>
      {/* Select simulado */}
      <div onClick={() => setIsOpen(!isOpen)} className={` w-36 pr-2 pl-1 py-2 rounded-r-lg bg-gray-800 cursor-pointer flex justify-between items-center focus:outline-2 focus:outline-gray-500 transition duration-200 
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
        <ul className={`bg-gray-800
${borderRadius}
absolute
z-10
mt-1

max-h-60
overflow-auto
shadow-lg
          `}
          role="listbox"
        >
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option)}
              className={`
                text-sm py-2 
                px-4
                cursor-pointer
                hover:bg-gray-400
                hover:text-gray-800
                transition
                duration-150
                flex
                items-center
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

