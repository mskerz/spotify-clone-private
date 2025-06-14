"use client";

import { useLoginForm } from "@/hook/forms";
import { useRedux } from "@/hook/redux";
import { authActions } from "@/providers/redux/slice/action";
import { GoogleOriginal as Google } from "devicons-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Divider } from "@/components/common";

export default function LoginPage() {
  const { form, setField, isFormEmpty, resetLoginForm } = useLoginForm();
  const { dispatch, useSelector } = useRedux();
  const { user } = useSelector((state) => state.auth); // ✅ ได้ type rootState ทันที

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
      .promise(
        dispatch(authActions.SignIn({ email, password })).unwrap(),
        {
          loading: "Logging in...",
          success: "Login successful!",
          error: (err) => err || "Login failed. Please try again.",
        },
        
      )
      .then(() => {
        // success

        resetLoginForm();
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
          <button className="mt-6 flex items-center justify-center gap-2 rounded-md bg-[#1ed760] px-4 py-2 text-white shadow transition hover:bg-[#1fdf64]">
            <Google size={24} color="white" />
            Login with Google
          </button>
        </div>
    
        <Divider />

        <form
          onSubmit={handleLogin}
          className="flex w-full flex-col items-center"
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
          <button
            type="submit"
            className="mt-2 w-full rounded-4xl bg-[#1ed760] px-4 py-2 text-white shadow transition hover:bg-[#1fdf64]"
          >
            Login
          </button>
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

        { user && (
          <div className="mt-4 text-sm text-gray-400">
            {" Logged in as: "}
            <span className="font-medium text-[#1ed760] hover:underline">
              {user.email}
            </span>
          </div>
        )

        }
      </div>
    </div>
  );
}
