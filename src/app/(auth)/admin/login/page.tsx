"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRedux } from "@/hooks/redux";
import { authActions } from "@/providers/redux/slice/action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ADMIN_EMAIL, ADMIN_USER_PASSWORD } from "@/constant";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { validationFormLogin, FormLoginType } from "@/validation/login";
import { PasswordInput } from "@/components/ui/custom/password-input";

function AdminLoginPage() {
  const router = useRouter();
  const { dispatch } = useRedux();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormLoginType>({
    resolver: zodResolver(validationFormLogin),
    mode:"onChange",
    defaultValues: {
      email: ADMIN_EMAIL,
      password: ADMIN_USER_PASSWORD,
    },
  });

  const onSubmit =  (data: FormLoginType) => {
    if (!data.email || !data.password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
       dispatch(authActions.SignIn(data)).unwrap();
      toast.success("Login successful!");
      router.replace("/admin/dashboard");
    } catch (error) {
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardHeader className="pb-4 text-center">
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>Please login with your admin account</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm  text-red-500 dark:text-red-400">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <PasswordInput
                placeholder="••••••••"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-red-500 dark:text-red-400">{errors.password.message}</p>
              )}
            </div>
          </CardContent>

          <CardFooter className="mt-4">
            <Button type="submit" className="button-spotify w-full rounded-xl">
              Login
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default AdminLoginPage;
