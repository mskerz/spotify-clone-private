"use client";

import Image from "next/image";

import { CalendarIcon, EditIcon, UserIcon } from "lucide-react";

import { withAuth } from "@/components/guard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useAuth from "@/hooks/auth";

function ProfilePage() {
  const { auth } = useAuth();
  const { user } = auth;

  const avatarUrl = user?.detail.avatarUrl ?? "/default-avatar.png";
  const fullName = `${user?.detail.firstName ?? "User"} ${user?.detail.lastName ?? "Name"}`;
  const age = user?.detail.age ?? 18;
  const joinedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString()
    : "July 2025"; // default หรือ mock

  return (
    <div className="container py-10">
      <Card className="max-w-3xl mx-auto rounded-2xl shadow-none border-0">
        <CardHeader className="flex items-center gap-6">
          <Image
            className="rounded-full object-cover ring-4 ring-foreground"
            src={avatarUrl}
            alt={fullName}
            width={96}
            height={96}
          />

          {/* Box ฝั่งขวาของรูป */}
          <div className="flex flex-1 flex-col gap-1">
            {/* Top row: name + edit */}
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">{fullName}</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Edit Profile"
                title="Edit Profile"
              >
                <EditIcon className="w-4 h-4" />
              </Button>
            </div>

            {/* Bottom row: age */}
            <p className="text-muted-foreground flex items-center gap-1 text-sm">
              <CalendarIcon className="w-4 h-4" />
              {age} years old
            </p>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <UserIcon className="w-4 h-4" />
              <span>
                Member since: <span className="font-medium">{joinedDate}</span>
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default withAuth(ProfilePage);
