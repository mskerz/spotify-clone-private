import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

import { CalendarIcon } from "lucide-react";
import { date } from "zod";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useOpenControl } from "@/hooks/control";

import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";

type DatePickerProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  placeholder?: string;
  onDateChange?: (date: Date | undefined) => void;
};

function ControlledDatePicker<TFieldValues extends FieldValues>({
  control,
  name,
  placeholder="Select a date",
  onDateChange,
}: DatePickerProps<TFieldValues>) {
  const { isOpen, close, setIsOpen } = useOpenControl();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Popover modal={false} open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger onMouseOver={(e)=>e.stopPropagation()} asChild>
            <Button
              variant="ghost"
              className="w-full text-left flex items-center border p-2"
            >
              <span className="text-muted-foreground">
                {field.value ? field.value.toLocaleDateString() : placeholder}
              </span>
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>

          <PopoverContent
            className="w-auto p-0 shadow-md rounded-xl"
            align="end"
          >
            <Calendar
              mode="single"
              selected={field.value}

              onSelect={(date) => {
                field.onChange(date);
                onDateChange?.(date);
                setIsOpen(false);
              }}
              disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
              captionLayout="dropdown"
              
            />
          </PopoverContent>
        </Popover>
      )}
    ></Controller>
  );
}
export default ControlledDatePicker;


/* 


*/