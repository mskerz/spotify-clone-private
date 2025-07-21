"use client";

import { id } from "date-fns/locale";

import { useOpenControl } from "@/hooks/control";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

type ConfirmDialogProps = {
  id?: number | string;
  children?: React.ReactNode;
  title?: string;
  description?: string;
  // onAction แบบไม่รับ parameter
  onClick?: () => void;

  // onAction แบบรับ id (และ id ต้องไม่ undefined)
  onClickWithParam?: (id: number | string) => void;
};

function ConfirmDialog({
  children,
  title,
  description,
  onClickWithParam,
  onClick,
  id,
}: ConfirmDialogProps) {
  const { isOpen, open, close, setIsOpen } = useOpenControl();

  const handleAction = () => {
    if (onClickWithParam && id !== undefined) {
      onClickWithParam(id);
    } else if (onClick) {
      onClick();
    }
    setIsOpen(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>{children}</DialogTrigger>

      <DialogContent
        showCloseButton={false}
        onPointerDownOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>{title || "Are you sure?"}</DialogTitle>
          <DialogDescription>
            {description || "Are you sure you want to do this?"}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-row items-center justify-evenly">
          <Button
            className="mr-2 bg-neutral-800 hover:bg-neutral-700 dark:bg-white dark:text-black dark:hover:bg-neutral-300 cursor-pointer"
            onClick={close}
          >
            Cancel
          </Button>

          <DialogClose className="cursor-pointer" onClick={handleAction}>
            Confirm
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default ConfirmDialog;
