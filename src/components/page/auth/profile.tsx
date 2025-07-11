"use client";
import { withAuth } from "@/components/guard";
import useAuth from "@/hooks/auth";

function ProfilePage() {
  const { auth } = useAuth();
  const { user } = auth;
  return (
    <div className="container flex flex-col">
      <h1>Profile Page</h1>
      <p>{user?.email}</p>
    </div>
  );
}
export default withAuth(ProfilePage);
