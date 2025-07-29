"use client";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { zodResolver } from "@hookform/resolvers/zod";
import { Edit } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useOpenControl } from "@/hooks/control";
import { useUpdateCategoryMutation } from "@/libs/rtk/category";
import Category from "@/types/category";
import { ChildrenProps } from "@/types/props";
import { CategoryFormType, validationFormCategory } from "@/validation/admin/category";

type Props = {
  selectedCategory: Category;
  onClose: () => void;
};
function UpdateCategoryDialog({ selectedCategory, onClose }: Props) {
  const { isOpen, close, setIsOpen } = useOpenControl();
  const [updateCategory] = useUpdateCategoryMutation();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CategoryFormType>({
    resolver: zodResolver(validationFormCategory),
    mode: "onChange",
    defaultValues: {
      name: selectedCategory.name,
    },
  });

  const onSubmit = async (data: CategoryFormType) => {
    await updateCategory({ id: selectedCategory.id, data })
      .unwrap()
      .then(() => {
        toast.success("Category updated successfully.");
        handleClose();
      })
      .catch(() => {
        toast.error("Can't update category. has something wrong.");
      });
  };

  const onError = () => {
    toast.error("Please fill in all required fields.");
  };

  const handleClose = () => {
    reset();
    close();
    onClose();
  };
  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <div className="relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm  hover:bg-neutral-200 dark:hover:bg-neutral-600 select-none">
          <Edit className="mr-2 h-4 w-4 text-muted-foreground" />
          <span>Update</span>
        </div>
      </DialogTrigger>
      <DialogContent showCloseButton={false} onEscapeKeyDown={handleClose}>
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Update Category</DialogTitle>
            <div className="flex flex-col">
              <Button
                variant={"link"}
                className="cursor-pointer hover:no-underline hover:opacity-60 transition-all"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </div>
          </div>
          <DialogDescription>Please fill in all required fields.</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium"
              >
                Category Name
              </Label>
              <Input
                id="name"
                placeholder="Enter artist name"
                {...register("name")}
              />
              {errors.name && <p className="text-red-500">{errors.name.message}</p>}
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full button-spotify font-semibold rounded-lg shadow-lg transition-all duration-500 transform hover:scale-95"
              >
                Complete
              </Button>
            </div>
          </form>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
export default UpdateCategoryDialog;
