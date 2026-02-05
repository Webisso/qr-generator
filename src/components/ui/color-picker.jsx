import * as React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { Input } from "./input";
import { cn } from "../../lib/utils";

const presetColors = [
  "#000000", "#ffffff", "#ef4444", "#f97316", "#f59e0b", "#eab308",
  "#84cc16", "#22c55e", "#10b981", "#14b8a6", "#06b6d4", "#0ea5e9",
  "#3b82f6", "#6366f1", "#8b5cf6", "#a855f7", "#d946ef", "#ec4899",
  "#f43f5e", "#78716c", "#71717a", "#737373",
];

const ColorPicker = React.forwardRef(({ value = "#000000", onChange, className }, ref) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(value);

  React.useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    if (/^#[0-9A-Fa-f]{6}$/.test(newValue)) {
      onChange?.(newValue);
    }
  };

  const handleColorSelect = (color) => {
    setInputValue(color);
    onChange?.(color);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={ref}
          variant="outline"
          className={cn("w-full justify-start gap-2 px-3", className)}
        >
          <div
            className="h-5 w-5 rounded border border-border"
            style={{ backgroundColor: value }}
          />
          <span className="flex-1 text-left font-mono text-sm">{value}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="space-y-3">
          <Input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="#000000"
            className="font-mono"
          />
          <input
            type="color"
            value={value}
            onChange={(e) => handleColorSelect(e.target.value)}
            className="h-10 w-full cursor-pointer rounded border border-input"
          />
          <div className="grid grid-cols-6 gap-2">
            {presetColors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => handleColorSelect(color)}
                className={cn(
                  "h-6 w-6 rounded border border-border transition-transform hover:scale-110",
                  value === color && "ring-2 ring-primary ring-offset-2"
                )}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
});
ColorPicker.displayName = "ColorPicker";

export { ColorPicker };
