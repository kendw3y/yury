import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  // Estilos personalizables
  bgColor?: string; // fondo
  textColor?: string; // color del texto
  borderColor?: string; // color del borde
  borderRadius?: string; // redondeo: 'none', 'sm', 'md', 'lg', 'full'
  borderWidth?: string; // grosor: '1', '2', '4'
  size?: "sm" | "md" | "lg"; // tamaño
  className?: string; // clases adicionales
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Selecciona una opción",
  bgColor = "bg-white",
  textColor = "text-gray-700",
  borderColor = "border-gray-300",
  borderRadius = "rounded-md",
  borderWidth = "border",
  size = "md",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: Option) => {
    onChange(option.value);
    setIsOpen(false);
  };

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || placeholder;

  // Tamaños
  const sizeClasses = {
    sm: "text-sm py-1 px-2",
    md: "text-base py-2 px-3",
    lg: "text-lg py-3 px-4",
  };

  return (
    <div className={`relative inline-block ${className} `}>
      {/* Select simulado */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={` ${bgColor} ${textColor} ${borderWidth} ${borderColor} ${borderRadius} ${sizeClasses[size]} cursor-pointer flex justify-between items-center border hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200 shadow-sm
        `}
        role="combobox"
        aria-expanded={isOpen}
        tabIndex={0}
      >
        <span>{selectedLabel}</span>
        <ChevronDown className="w-5 h-5" />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <ul
          className={`   ${bgColor}
${textColor}
rounded-md
absolute
z-10
mt-1
w-full
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
                ${sizeClasses[size]}
                px-4
                cursor-pointer
                hover:bg-blue-100
                hover:text-blue-800
                transition
                duration-150
                flex
                items-center
                
                border-gray-100
                
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
        <div className="fixed inset-0 z-0" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export default CustomSelect;
