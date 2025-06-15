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

export default function LoginPage() {
  const { form, setField, isFormEmpty, resetLoginForm } = useLoginForm();
  const { dispatch, useSelector } = useRedux();
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
      resetLoginForm();
      navigate.push("/");
      })
      .catch(() => {});
  };
  return (
    <div className="container flex items-center justify-center">
      <div className="mt-15 flex w-full max-w-md flex-col items-center rounded-xl bg-[#1d1d1d] p-15 shadow-lg">
        <div className="flex flex-col items-center">
          <h2 className="mt-4 text-xl font-semibold text-white">
            Sign in to your account
          </h2>
          <Button
            onClick={handleGoogleLogin}
            className="mt-6 flex cursor-pointer items-center justify-center gap-2 bg-[#1ed760] text-white hover:bg-[#1fdf64]"
            type="button"
          >
            <Google size={24} color="white" />
            Login with Google
          </Button>
        </div>

        <Divider />

        <form
          onSubmit={handleLogin}
          className="flex w-full flex-col items-center"
          aria-label="Login form"
        >
          <div className="mb-4 w-full">
            <label className="mb-1 block text-white">Email address</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setField("email", e.target.value)}
              className="w-full rounded-md bg-gray-800 p-2 text-white"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4 w-full">
            <label className="mb-1 block text-white">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setField("password", e.target.value)}
              className="w-full rounded-md bg-gray-800 p-2 text-white"
              placeholder="Enter your password"
            />
          </div>
          <Button
            type="submit"
            className="mt-2 w-full cursor-pointer rounded-4xl bg-[#1ed760] px-4 py-2 text-white shadow transition hover:bg-[#1fdf64]"
          >
            Login
          </Button>
        </form>
        <div className="mt-4 text-sm text-gray-400">
          {" Don't have an account? "}
          <Link
            href="/register"
            className="font-medium text-[#1ed760] hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
