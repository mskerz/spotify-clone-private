"use client";

import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { zodResolver } from "@hookform/resolvers/zod";
import { GoogleOriginal as Google } from "devicons-react";

import { Divider } from "@/components/common";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRedux } from "@/hooks/redux";
import { authActions } from "@/providers/redux/slice/action";
import { setRedirectAfterLogin } from "@/providers/redux/slice/redirect";
import { FormLoginType, validationFormLogin } from "@/validation/login";

import { withPublic } from "../guard";
import { PasswordInput } from "../ui/custom/password-input";

function LoginPage() {
  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormLoginType>({
    resolver: zodResolver(validationFormLogin),
    mode: "onChange",
    defaultValues: {
      email: "test2@gmail.com",
      password: "123456",
    },
  });
  const { dispatch, useSelector } = useRedux();

  const navigate = useRouter();

  const handleGoogleLogin = () => {
    dispatch(authActions.SignInWithGoogle());
  };
  const onSubmit = (data: FormLoginType) => {
    if (!data.email || !data.password) {
      toast("Please fill in all required fields.", {
        icon: "⚠️",
        style: {
          borderRadius: "15px",
          background: "#212121",
          color: "#fff",
        },
      });
      return;
    }
    const { email, password } = data;
    toast
      .promise(dispatch(authActions.SignIn({ email, password })).unwrap(), {
        loading: "Logging in...",
        success: "Login successful!",
        error: (err) => err || "Login failed. Please try again.",
      })
      .then(() => {
        dispatch(setRedirectAfterLogin(true)); // ตั้ง flag ว่าพึ่ง login สำเร็จ
        navigate.replace("/");
      })
      .finally(() => {
        // Reset form after login attempt
        reset();
      });
  };
  return (
    <Card className="my-4 flex w-full max-w-md rounded-xl p-8">
      <CardHeader className="flex flex-col items-center">
        <CardTitle className="mt-4 text-left text-2xl font-semibold">Sign in to your account</CardTitle>
        <CardDescription className="mt-2 text-sm text-gray-400">
          Enter your email below to login to your account
        </CardDescription>
        <CardAction
          className="bg-secondary hover:bg-secondary/80 mt-4 flex w-full cursor-pointer items-center justify-center rounded-md p-2"
          onClick={handleGoogleLogin}
        >
          <Google className="mr-2" />
          Sign in with Google
        </CardAction>
      </CardHeader>

      <CardContent>
        <Divider />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col items-center"
          aria-label="Login form"
        >
          <div className="my-4 w-full">
            <Label className="mb-3 block">Email address</Label>
            <Input
              type="email"
              className="w-full rounded-md p-2"
              placeholder="Enter your email"
              {...register("email")}
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          </div>
          <div className="my-4 w-full">
            <Label className="mb-3 block">Password</Label>
            <PasswordInput
              className="w-full rounded-md p-2"
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
          </div>
        <div className="w-full">
            <Link
            className="text-[14px] text-secondary-foreground text-right hover:underline"
            href="/forgot-password"
          >
            Forgot your password?
          </Link>
        </div>

          <Button
            type="submit"
            className="mt-2 w-full cursor-pointer rounded-4xl bg-[#1ed760] px-4 py-2 text-white shadow transition hover:bg-[#1fdf64]"
          >
            Login
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex items-center justify-center gap-2">
        <p className="text-sm text-gray-400"> {" Don't have an account?  "}</p>
        <Link
          href="/register"
          className="text-sm font-medium text-[#1ed760] hover:underline"
        >
          Sign Up
        </Link>
      </CardFooter>
    </Card>
  );
}

export default withPublic(LoginPage);
