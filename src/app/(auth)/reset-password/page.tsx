"use client";

import { useState } from "react";

import { useSearchParams } from "next/navigation";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const oobCode = searchParams.get("oobCode");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle>Reset your password</CardTitle>
        <CardDescription>Enter your new password</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <span > OobCode: 
            <p className="truncate">   {"*".repeat(oobCode?.length || 0)}
</p>
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <button className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm">Cancel</button>
        <button className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm">Reset Password</button>
      </CardFooter>
    </Card>
  );
}

export default ResetPasswordPage;
