"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { withPublic } from "@/components/guard";
import { useRedux } from "@/hooks/redux";
import { authActions } from "@/providers/redux/slice/action";

// page.tsx
 function  ForgotPasswordPage() {
  const [forgotEmail, setForgotEmail] = useState("");
  const  { dispatch } = useRedux();
  const onResetPassword = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(authActions.forgotPassword(forgotEmail));

  };


 
  return (
    <Card className="w-full max-w-md ">
      <CardHeader>
      <CardTitle>Reset your password</CardTitle>
      </CardHeader>
      <CardContent>
      <form className="space-y-4" onSubmit={onResetPassword} >
        <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Enter your Spotify email address
        </label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          required
          className="mt-1"
          onChange={(e) => setForgotEmail(e.target.value)}
          value={forgotEmail}
        />
        </div>
        <Button type="submit" className="w-full rounded-2xl text-md cursor-pointer button-spotify transition">
        Send Password Reset Link
        </Button>
      </form>
      <div className="mt-4 text-center text-sm text-muted-foreground">
        Remember your password? <a href="/login" className="text-primary underline">Log in</a>
      </div>
      </CardContent>
    </Card>
  );
}


export default withPublic(ForgotPasswordPage);