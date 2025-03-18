import React from "react";
import { ChevronDown } from "lucide-react"; // Sử dụng icon từ Lucide
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
      <Label className="mb-1.5 ml-1">{title}</Label>
      <div className={`relative w-full ${className}`}>
        <Select onValueChange={onChange} value={value}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={title} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default CustomSelect;
