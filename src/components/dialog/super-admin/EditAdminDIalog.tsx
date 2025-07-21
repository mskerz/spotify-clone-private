"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";

import { faker } from "@faker-js/faker";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit2Icon, Shuffle, UserRoundPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/custom/password-input";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRedux } from "@/hooks/redux";
import { adminActions } from "@/providers/redux/slice/action";
import { AdminUser } from "@/types/user";
import { AdminFormInput, validationFormAdmin } from "@/validation/admin";

import { DialogCancel } from "../AddSongToPlaylist";
import { useOpenControl } from "@/hooks/control";

type Props = {
  editAdmin: AdminUser;
};

function EditAdminDialog({ editAdmin }: Props) {
const { isOpen, open, close,setIsOpen } = useOpenControl();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<AdminFormInput>({
    resolver: zodResolver(validationFormAdmin),
    mode: "onChange",
    defaultValues: {
      firstName: editAdmin.id || "",
      lastName: editAdmin.detail.lastName || "",
      password: "123456",
    },
  });

  const { dispatch } = useRedux();

  const onSubmit = async (data: AdminFormInput) => {
    // Handle form submission logic here
    if (!data) return;

    try {
      // ทำงานที่ต้องการ เช่น API call
      console.log("Updating admin:", data);

      // หลังจากสำเร็จแล้วค่อยปิด dialog และ reset form
      reset();
      close();
    } catch (error) {
      console.error("Error updating admin:", error);
      // อาจจะแสดง error message
    }
  };

  const randomName = () => {
    // implement random name generation with faker.js
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    setValue("firstName", firstName);
    setValue("lastName", lastName);
    setValue(
      "email",
      "admin_" +
        faker.internet
          .email({ firstName: firstName, lastName: lastName })
          .toLowerCase(),
    );
  };

  const handleDialogClose = () => {
    close();
    reset();
    
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="flex items-center gap-2">
        <Edit2Icon />
        <span>Edit</span>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        onPointerDownOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader className="flex flex-col ">
          <DialogTitle>Edit Admin</DialogTitle>

          <DialogDescription>
            Update information for this administrator.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center">
              <div className="mb-4">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Enter admin first name"
                  className="mt-1"
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <p className="text-red-500">{errors.firstName.message}</p>
                )}
              </div>
              <div className="mb-4 ml-4">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Enter admin last name"
                  className="mt-1"
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <p className="text-red-500">{errors.lastName.message}</p>
                )}
              </div>

              <Tooltip>
                <TooltipTrigger
                  className="ml-4 cursor-pointer"
                  type="button"
                  onClick={randomName}
                >
                  <Shuffle className="h-5 w-5 text-gray-500 hover:text-green-500" />
                </TooltipTrigger>
                <TooltipContent>Generate random names</TooltipContent>
              </Tooltip>
            </div>
            <div className="mb-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter admin email"
                className="mt-1"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="mb-4">
              <Label htmlFor="password">Password</Label>
              <PasswordInput
                placeholder="Enter admin password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleDialogClose}
              >
                Cancel
              </Button>
              <Button type="submit" className="button-spotify">
                Update
              </Button>
            </div>
          </form>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}

export default EditAdminDialog;


/**
 * ✅ Today Task - 20/07/2025
 * 
 * 🛠 Features:
 * - Add action menu (Update/Delete) to Admin UI in DataTable
 * - Add Confirm Dialog for global actions (support both with and without parameters)
 * - Dispatch action to delete admin from Redux with admin ID
 * 
 * 🔁 Refactors:
 * - Separate admin hook into general admin and super admin
 * 
 * 🐞 Bug Fixes:
 * - Fix event propagation issue in Dialog
 * - Fix admin deletion bug: wrong field (`firebaseUid` instead of `id`) used in `where` clause
 * 
 * 🧱 Database:
 * - Add foreign key constraint (ON DELETE CASCADE) to `user` table
 */
