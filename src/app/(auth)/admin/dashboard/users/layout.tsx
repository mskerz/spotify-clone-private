import { ChildrenProps } from "@/types/props";

export const metadata = {
  title: "Admin Users Management",
  description: "Manage users in the admin dashboard",
};

function layout({ children }: ChildrenProps) {
  return (
    <div className="container flex flex-col items-center justify-center">
      <div className="me-auto">
        <h1 className="text-3xl font-bold">Admin Management</h1>
        <p className="text-muted-foreground"> Manage your admins here.</p>
      </div>
      <div className="w-full max-w-4xl">{children}</div>
    </div>
  );
}
export default layout;
