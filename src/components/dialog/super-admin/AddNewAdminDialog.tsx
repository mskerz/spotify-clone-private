"use client";

import { FieldErrors, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { faker } from "@faker-js/faker";
import { zodResolver } from "@hookform/resolvers/zod";
import { Shuffle, UserRoundPlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/custom/password-input";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
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
import { AdminFormInput, validationFormAdmin } from "@/validation/admin";

import { DialogCancel } from "../AddSongToPlaylist";

function AddNewAdminDialog() {
  const { isOpen, setIsOpen, close, open } = useOpenControl();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm<AdminFormInput>({
    resolver: zodResolver(validationFormAdmin),
    mode: "onChange",
    defaultValues: {
      firstName: "Admin",
      lastName: "John",
      password: "123456",
    },
  });

  const { dispatch } = useRedux();

  const onSubmit = (data: AdminFormInput) => {
    dispatch(adminActions.createAdminUser(data))
      .unwrap()
      .then(() => {
        toast.success("Admin added successfully.");
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

  const randomName = () => {
    // implement random name generation with faker.js
    const lastName = faker.person.middleName();

    setValue("lastName", lastName);
    setValue(
      "email",
      "admin_" +
        faker.internet
          .email({ firstName: "", lastName: lastName })
          .toLowerCase(),
    );
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        onClick={open}
        className="ms-auto flex transform items-center gap-2 rounded-md px-2 py-2 shadow outline-2 outline-gray-200 transition-all duration-200 hover:text-green-400 hover:outline-green-400"
      >
        <UserRoundPlus className="" />
        <span>New</span>
      </DialogTrigger>

      <DialogContent showCloseButton={false}>
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle> New Admin</DialogTitle>
          <DialogCancel onClick={() => reset()} />
        </DialogHeader>
        <DialogBody>
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <div className="flex items-center">
              <div className="mb-4">
                <Label htmlFor="name">First Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter admin first name"
                  className="mt-1"
                  {...register("firstName")}
                />
              </div>
              <div className="mb-4 ml-4">
                <Label htmlFor="lastname">Last Name</Label>
                <Input
                  id="lastname"
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
                <TooltipContent>Generate random </TooltipContent>
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
            <div className="flex justify-end">
              <Button type="submit" className="button-spotify">
                Create
              </Button>
            </div>
          </form>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
export default AddNewAdminDialog;
