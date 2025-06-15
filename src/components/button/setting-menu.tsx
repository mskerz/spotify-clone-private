"use client";

import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // ถ้ามี helper classnames

type SettingItemProps = {
  icon: React.ReactNode;
  title: string;
  isDisabled?: boolean;
  onClick?: () => void;
};

export function SettingItem({
  icon,
  title,
  onClick,
  isDisabled = false,
}: SettingItemProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-between rounded-xl px-4 py-6 text-left",
        isDisabled
          ? "cursor-not-allowed opacity-60 hover:bg-transparent"
          : "hover:bg-muted cursor-pointer",
      )}
      aria-disabled={isDisabled}
      onClick={() => {
        if (isDisabled) return;
        onClick?.();
      }}
    >
      <div className="flex items-center gap-4">
        <div className="text-primary">{icon}</div>
        <span className="text-sm font-medium">{title}</span>
      </div>
      <ChevronRight className="text-muted-foreground h-4 w-4" />
    </Button>
  );
}
