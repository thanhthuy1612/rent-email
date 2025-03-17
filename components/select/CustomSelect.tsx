import React from "react";
import { ChevronDown } from "lucide-react"; // Sử dụng icon từ Lucide

interface SelectProps {
  options: { value: any; label: string }[];
  value: any;
  title?: string;
  onChange: (value: any) => void;
  className?: string;
}

const CustomSelect: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  className,
  title,
}) => {
  return (
    <div>
      <label>{title}</label>

      <div className={`relative w-full ${className}`}>
        <select
        
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full p-2 pr-10 border border-gray-300 rounded-md shadow-sm appearance-none focus:ring-blue-500 focus:border-blue-500"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default CustomSelect;
