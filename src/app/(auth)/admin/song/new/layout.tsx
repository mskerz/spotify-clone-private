import { ChildrenProps } from "@/types/props";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Song",
  description: "Add a new song to the database",
};

function layout({ children }: ChildrenProps) {
  return (
    <div className="flex min-h-screen ">
     {children}
    </div>
  );
}
export default layout;
