"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";

interface CustomDatePickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  className?: string;
  title?: string;
  placeHolder?: string;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  value,
  onChange,
  className,
  title,
  placeHolder,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(value);
  const t = useTranslations();

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
    onChange?.(date as Date);
  };

  return (
    <div>
      <Label className="mb-1.5 ml-1">{title}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[240px] justify-start text-left font-normal flex items-center gap-2",
              !selectedDate && "text-muted-foreground",
              className
            )}
          >
            <CalendarIcon className="w-5 h-5" />
            {selectedDate ? (
              format(selectedDate, "PPP")
            ) : (
              <span>{placeHolder || t("global.pickADate")}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CustomDatePicker;
