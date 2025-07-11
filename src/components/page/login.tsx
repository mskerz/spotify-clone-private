"use client";

import { useLoginForm } from "@/hooks/forms";
import { useRedux } from "@/hooks/redux";
import { authActions } from "@/providers/redux/slice/action";
import { GoogleOriginal as Google } from "devicons-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Divider } from "@/components/common";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
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
import { withPublic } from "../guard";
import { setRedirectAfterLogin } from "@/providers/redux/slice/redirect";
import { useState } from "react";
import { PasswordInput } from "../ui/custom/password-input";
function LoginPage() {
  const { form, setField, isFormEmpty, resetLoginForm } = useLoginForm();
  const { dispatch, useSelector } = useRedux();
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useRouter();

  const handleGoogleLogin = () => {
    dispatch(authActions.SignInWithGoogle());
  };
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isFormEmpty) {
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
    const { email, password } = form;
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
        resetLoginForm();
      });
  };
  return (
    <Card className="my-4 flex w-full max-w-md rounded-xl p-8">
      <CardHeader className="flex flex-col items-center">
        <CardTitle className="mt-4 text-left text-2xl font-semibold">
          Sign in to your account
        </CardTitle>
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
          onSubmit={handleLogin}
          className="flex w-full flex-col items-center"
          aria-label="Login form"
        >
          <div className="my-4 w-full">
            <Label className="mb-3 block">Email address</Label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setField("email", e.target.value)}
              className="w-full rounded-md p-2"
              placeholder="Enter your email"
            />
          </div>
          <div className="my-4 w-full">
            <Label className="mb-3 block">Password</Label>
            <PasswordInput
              value={form.password}
              onChange={(e) => setField("password", e.target.value)}
              className="w-full rounded-md p-2"
            />
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
