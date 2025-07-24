"use client";

import { useState } from "react";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

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
import { useOpenControl } from "@/hooks/control";
import { useRedux } from "@/hooks/redux";
import { adminActions } from "@/providers/redux/slice/action";
import { AdminUser } from "@/types/user";
import {
  AdminFormInput,
  AdminResetPassword,
  validationFormAdmin,
  validationFormAdminResetPassword,
} from "@/validation/admin";

import { DialogCancel } from "../AddSongToPlaylist";

type Props = {
  admin: AdminUser;
};

function ChangePasswordDialog({ admin }: Props) {
  const { isOpen, open, close, setIsOpen } = useOpenControl();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<AdminResetPassword>({
    resolver: zodResolver(validationFormAdminResetPassword),
    mode: "onChange",
    defaultValues: {
      id: admin.id,
    },
  });

  const { dispatch } = useRedux();

  const onSubmit = (data: AdminResetPassword) => {
  


    dispatch(adminActions.resetPasswordAdminUser(data))
      .unwrap()
      .then(() => {
        toast.success("Password reset successfully.");
        reset(); // reset form เมื่อสำเร็จ
        close();
      })
      .catch((error) => {
        toast.error(error || "Something went wrong.");
      });
  };
    const onError = () => {
    toast.error("Please fill in all required fields.");
  };

  const handleDialogClose = () => {
    reset();
    close();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="flex items-center gap-2"  >
            <Edit2Icon />
          <span>Change Password </span>
      </DialogTrigger>

      <DialogContent showCloseButton={false} onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader className="flex flex-col ">
          <DialogTitle>Reset Password Admin</DialogTitle>

          <DialogDescription>
            Reset password for this administrator.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <div className="flex items-center">
              <div className="mb-4">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  readOnly
                  placeholder="Enter admin first name"
                  className="mt-1 cursor-not-allowed bg-accent/50"
                  disabled
                  value={admin.detail.firstName}
                />
              </div>
              <div className="mb-4 ml-4">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  readOnly
                  placeholder="Enter admin last name"
                  className="mt-1 cursor-not-allowed bg-accent/50"
                  disabled
                  value={admin.detail.lastName}
                />
              </div>
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
            <div className="mb-4">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <PasswordInput
                placeholder="Enter admin password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword.message}</p>
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
              <Button type="submit" className="button-spotify cursor-pointer">
                Update
              </Button>
            </div>
          </form>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}

export default ChangePasswordDialog;

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
