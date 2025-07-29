"use client";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { zodResolver } from "@hookform/resolvers/zod";

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
import { useCreateNewCategoryMutation } from "@/libs/rtk/category";
import { ChildrenProps } from "@/types/props";
import { CategoryFormType, validationFormCategory } from "@/validation/admin/category";

function CreateCategoryDialog({ children }: ChildrenProps) {
  const { isOpen, close, setIsOpen } = useOpenControl();
  const [createNewCategory] = useCreateNewCategoryMutation();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CategoryFormType>({
    resolver: zodResolver(validationFormCategory),
    mode: "onChange",
  });

  const onSubmit = async (data: CategoryFormType) => {
    await createNewCategory(data)
      .unwrap()
      .then(() => {
        toast.success("Category added successfully.");
        handleClose();
      })
      .catch((error) => {
        toast.error("Can't add category. in this time.");
      });
  };

  const handleClose = () => {
    reset();
    close();
  };

  const onError = () => {
    toast.error("Please fill in all required fields.");
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger>{children || "Create"}</DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Insert Category</DialogTitle>
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
export default CreateCategoryDialog;
